import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import PhilipYanceyAI from './services/PhilipYanceyAI';
import styled from 'styled-components';
import { AlertCircle, Key } from 'lucide-react';

const AppContainer = styled.div`
  min-height: 100vh;
  font-family: 'Georgia', serif;
`;

const SetupContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2c1810 0%, #4a2c2a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const SetupCard = styled.div`
  background: rgba(245, 245, 220, 0.95);
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 2px solid #8B4513;
  
  h2 {
    color: #2c1810;
    margin: 0 0 16px 0;
    font-size: 1.8rem;
    text-align: center;
  }
  
  .subtitle {
    color: #654321;
    text-align: center;
    margin-bottom: 24px;
    font-style: italic;
  }
  
  .warning {
    background: rgba(139, 69, 19, 0.1);
    border: 1px solid #8B4513;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    
    .icon {
      color: #8B4513;
      margin-top: 2px;
    }
    
    .content {
      flex: 1;
      
      h4 {
        margin: 0 0 8px 0;
        color: #654321;
      }
      
      p {
        margin: 0;
        color: #2c1810;
        font-size: 0.9rem;
        line-height: 1.4;
      }
    }
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #654321;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #8B4513;
    border-radius: 8px;
    font-family: 'Georgia', serif;
    font-size: 1rem;
    background: white;
    color: #2c1810;
    
    &::placeholder {
      color: #8B4513;
      opacity: 0.7;
    }
    
    &:focus {
      outline: none;
      border-color: #654321;
      box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.2);
    }
  }
  
  .helper {
    margin-top: 6px;
    font-size: 0.85rem;
    color: #8B4513;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #8B4513;
  color: #f5f5dc;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-family: 'Georgia', serif;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: #654321;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid #dc3545;
  color: #721c24;
  border-radius: 8px;
  padding: 12px;
  margin-top: 16px;
  font-size: 0.9rem;
`;

function App() {
  const [philipYanceyAI, setPhilipYanceyAI] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verifica se já existe uma API key salva localmente
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      initializeAI(savedApiKey);
    }
  }, []);

  const initializeAI = (key) => {
    try {
      const ai = new PhilipYanceyAI(key);
      setPhilipYanceyAI(ai);
      setIsSetup(true);
      setError('');
    } catch (err) {
      setError('Erro ao inicializar a IA. Verifique sua chave API.');
    }
  };

  const handleSetup = async () => {
    if (!apiKey.trim()) {
      setError('Por favor, insira sua chave API da OpenAI.');
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      setError('Chave API inválida. Deve começar com "sk-".');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Testa a chave API fazendo uma requisição simples
      const testAI = new PhilipYanceyAI(apiKey);
      const testResponse = await testAI.sendMessage('teste');
      
      if (testResponse.error) {
        throw new Error('Chave API inválida ou sem créditos.');
      }

      // Salva localmente se o teste passou
      localStorage.setItem('openai_api_key', apiKey);
      initializeAI(apiKey);
    } catch (err) {
      setError('Chave API inválida ou erro de conexão. Verifique sua chave e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSetup();
    }
  };

  if (!isSetup) {
    return (
      <AppContainer>
        <SetupContainer>
          <SetupCard>
            <h2>Conversa com Philip Yancey</h2>
            <div className="subtitle">Configure sua chave API para começar</div>
            
            <div className="warning">
              <AlertCircle className="icon" size={20} />
              <div className="content">
                <h4>Sua privacidade é importante</h4>
                <p>Sua chave API é armazenada apenas localmente no seu navegador e é usada exclusivamente para se comunicar diretamente com a OpenAI. Nenhum dado é enviado para servidores externos.</p>
              </div>
            </div>

            <InputGroup>
              <label htmlFor="apiKey">
                <Key size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Chave API da OpenAI
              </label>
              <input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="sk-..."
                disabled={isLoading}
              />
              <div className="helper">
                Obtenha sua chave em: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{color: '#8B4513'}}>platform.openai.com/api-keys</a>
              </div>
            </InputGroup>

            <Button onClick={handleSetup} disabled={isLoading || !apiKey.trim()}>
              {isLoading ? 'Verificando...' : 'Iniciar Conversa'}
            </Button>

            {error && <ErrorMessage>{error}</ErrorMessage>}
          </SetupCard>
        </SetupContainer>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <ChatInterface philipYanceyAI={philipYanceyAI} />
    </AppContainer>
  );
}

export default App;