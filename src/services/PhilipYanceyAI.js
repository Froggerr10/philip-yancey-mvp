import axios from 'axios';
import PHILIP_YANCEY_AUTHENTIC_SYSTEM from '../config/philipYanceySystem.js';

class PhilipYanceyAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.conversationHistory = [];
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
  }

  // Detecta contexto emocional da mensagem
  detectEmotionalContext(message) {
    const traumaWords = ['machucado', 'abusado', 'rejeitado', 'traído', 'igreja tóxica', 'ferido', 'abandonado'];
    const doubtWords = ['dúvida', 'questionar', 'não acredito', 'perdendo fé', 'duvidar', 'incerto'];
    const angerWords = ['raiva', 'ódio', 'injustiça', 'revoltado', 'indignado', 'furioso'];
    const graceWords = ['perdão', 'graça', 'perdoar', 'misericórdia', 'compaixão'];

    const lowerMessage = message.toLowerCase();

    if (traumaWords.some(word => lowerMessage.includes(word))) {
      return { type: 'trauma_religioso', intensity: 'alta' };
    }
    if (doubtWords.some(word => lowerMessage.includes(word))) {
      return { type: 'duvidas_fe', intensity: 'media' };
    }
    if (angerWords.some(word => lowerMessage.includes(word))) {
      return { type: 'raiva_deus', intensity: 'alta' };
    }
    if (graceWords.some(word => lowerMessage.includes(word))) {
      return { type: 'perdao_graca', intensity: 'media' };
    }

    return { type: 'geral', intensity: 'baixa' };
  }

  // Constrói contexto personalizado baseado na emoção
  buildContextualPrompt(message, emotionalContext) {
    let contextualInstructions = '';

    switch (emotionalContext.type) {
      case 'trauma_religioso':
        contextualInstructions = `
A pessoa está compartilhando trauma religioso. Responda com:
- Máxima vulnerabilidade e empatia
- Sua própria experiência com igreja legalista
- Validação da dor sem minimizar
- 4-6 parágrafos (resposta longa)
- Tom: vulnerável, empático, honesto
        `;
        break;

      case 'duvidas_fe':
        contextualInstructions = `
A pessoa está lidando com dúvidas na fé. Responda com:
- Normalização das dúvidas
- Sua experiência pessoal questionando diariamente
- Diferenças de personalidade de fé
- 2-3 parágrafos (resposta média)
- Tom: normalizador, honesto, encorajador
        `;
        break;

      case 'raiva_deus':
        contextualInstructions = `
A pessoa está com raiva de Deus/igreja. Responda com:
- Validação da raiva como legítima
- Sua própria rebelião ativa
- Distinção entre Deus e religião distorcida
- 3-4 parágrafos
- Tom: validador, honesto, diferenciador
        `;
        break;

      case 'perdao_graca':
        contextualInstructions = `
A pessoa está explorando perdão/graça. Responda com:
- História específica sobre graça escandalosa
- Definição prática de perdão
- Experiência ou exemplo real
- 3-5 parágrafos (com narrativa)
- Tom: reflexivo, narrativo, esperançoso
        `;
        break;

      default:
        contextualInstructions = `
Pergunta geral. Responda com:
- 1-2 parágrafos (direto ao ponto)
- Linguagem natural e acessível
- Tom: conversacional, amigável
        `;
    }

    return `${PHILIP_YANCEY_AUTHENTIC_SYSTEM}

CONTEXTO DA CONVERSA ATUAL:
${contextualInstructions}

MENSAGEM DO USUÁRIO: "${message}"

Responda como Philip Yancey, usando seus maneirismos autênticos e adaptando o tamanho e tom baseado no contexto emocional detectado.`;
  }

  // Envia mensagem para a IA
  async sendMessage(message) {
    try {
      const emotionalContext = this.detectEmotionalContext(message);
      const contextualPrompt = this.buildContextualPrompt(message, emotionalContext);

      const response = await axios.post(
        this.baseURL,
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: contextualPrompt
            },
            ...this.conversationHistory,
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.8,
          max_tokens: 1000,
          presence_penalty: 0.3,
          frequency_penalty: 0.3
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;

      // Adiciona ao histórico para contexto futuro
      this.conversationHistory.push(
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      );

      // Mantém apenas últimas 10 mensagens para não exceder limite
      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20);
      }

      return {
        response: aiResponse,
        emotionalContext: emotionalContext,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Erro ao comunicar com IA:', error);
      
      // Fallback empático em caso de erro
      return {
        response: "Sinto muito, mas estou tendo dificuldades técnicas no momento. Isso me lembra que, às vezes, até as coisas mais bem planejadas falham - e tudo bem. Que tal tentarmos novamente em alguns momentos?",
        error: true,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Limpa histórico de conversa
  clearHistory() {
    this.conversationHistory = [];
  }

  // Obtém estatísticas da conversa
  getConversationStats() {
    return {
      totalMessages: this.conversationHistory.length / 2,
      lastInteraction: this.conversationHistory.length > 0 ? 
        new Date().toISOString() : null
    };
  }
}

export default PhilipYanceyAI;