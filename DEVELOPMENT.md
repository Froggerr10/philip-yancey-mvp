# Scripts de Deploy e Desenvolvimento

## 🚀 Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento (localhost:3000)
npm start

# Executar especificamente na porta 3001
npm start -- --port 3001

# Build para produção
npm run build

# Testar build de produção localmente
npx serve -s build -l 3001
```

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente (Opcional)
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Porta personalizada (opcional)
PORT=3001

# Configurações de desenvolvimento
REACT_APP_DEBUG_MODE=true
REACT_APP_ENVIRONMENT=development
```

### Chave API OpenAI
- A chave é configurada na primeira execução através da interface
- Armazenada localmente no navegador (localStorage)
- Para limpar: `localStorage.removeItem('openai_api_key')`

## 📱 PWA (Progressive Web App)

O MVP já está configurado como PWA:
- Funciona offline básico
- Instalável no dispositivo
- Ícone e tema personalizados
- Otimizado para mobile

## 🔍 Debug e Monitoramento

### Console do Desenvolvedor
```javascript
// Limpar histórico de conversa
window.clearPhilipYanceyHistory = () => {
  localStorage.removeItem('conversation_history');
  console.log('Histórico limpo!');
};

// Ver estatísticas da conversa
window.getConversationStats = () => {
  const history = JSON.parse(localStorage.getItem('conversation_history') || '[]');
  console.log(`Total de mensagens: ${history.length}`);
  return history;
};
```

### Logs de Desenvolvimento
- Contexto emocional detectado aparece no console
- Tempo de resposta da API
- Errors de rede ou API

## 🌐 Deploy

### Netlify (Recomendado)
```bash
# Build
npm run build

# Deploy manual
drag & drop da pasta 'build' no Netlify

# Deploy automático via GitHub
1. Conectar repositório no Netlify
2. Build command: npm run build
3. Publish directory: build
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### GitHub Pages
```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar ao package.json
"homepage": "https://froggerr10.github.io/philip-yancey-mvp",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

## 🐛 Troubleshooting

### Problemas Comuns

**1. Erro de CORS com OpenAI API**
```javascript
// Já resolvido no código com proxy correto
// Se ainda acontecer, verificar chave API
```

**2. Resposta vazia da IA**
```javascript
// Verificar:
// - Chave API válida
// - Créditos na conta OpenAI
// - Conexão com internet
```

**3. Interface não carrega**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
npm start
```

**4. Styled Components não funcionam**
```bash
# Verificar versão
npm list styled-components

# Reinstalar se necessário
npm uninstall styled-components
npm install styled-components@latest
```

## 📊 Monitoramento de Performance

### Métricas Importantes
- Tempo de resposta da IA: < 5 segundos
- Detecção emocional: 95% de precisão
- Taxa de erro: < 2%
- Satisfação do usuário: 4.5+ estrelas

### Analytics (Futuro)
```javascript
// Estrutura para implementar analytics
const trackConversation = (emotionalContext, responseTime) => {
  // Google Analytics
  // Mixpanel
  // Custom analytics
};
```

## 🔐 Segurança

### Checklist de Segurança
- [x] Chave API armazenada localmente (não no servidor)
- [x] Comunicação HTTPS com OpenAI
- [x] Sem dados persistidos em servidor
- [x] Validação de entrada do usuário
- [x] Rate limiting implícito via OpenAI
- [x] Sanitização de conteúdo

### Boas Práticas
```javascript
// Input sanitization já implementada
// Validation da API key
// Error handling robusto
// Fallbacks empáticos
```

## 📈 Otimizações Futuras

### Performance
- Lazy loading de componentes
- Memoização de respostas comuns
- Compression de assets
- CDN para recursos estáticos

### UX
- Typing indicators mais realistas
- Animações de transição
- Temas alternativos
- Acessibilidade completa (WCAG 2.1)

### Funcionalidades
- Histórico de conversas persistente
- Export de conversas em PDF
- Sistema de favoritos
- Notificações push

---

**MVP está pronto para rodar em localhost:3001 com autenticidade máxima baseada na análise real do Philip Yancey!** 🎉