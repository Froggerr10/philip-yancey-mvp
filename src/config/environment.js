// Configurações de ambiente para o MVP Philip Yancey

const ENV_CONFIG = {
  development: {
    API_BASE_URL: 'https://api.openai.com/v1',
    DEFAULT_MODEL: 'gpt-4',
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.8,
    DEBUG_MODE: true,
    CONVERSATION_MEMORY_LIMIT: 20
  },
  
  production: {
    API_BASE_URL: 'https://api.openai.com/v1',
    DEFAULT_MODEL: 'gpt-4',
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.8,
    DEBUG_MODE: false,
    CONVERSATION_MEMORY_LIMIT: 20
  }
};

const getCurrentEnvironment = () => {
  return process.env.NODE_ENV || 'development';
};

const getConfig = () => {
  const env = getCurrentEnvironment();
  return ENV_CONFIG[env] || ENV_CONFIG.development;
};

// Configurações de UI
export const UI_CONFIG = {
  THEME: {
    PRIMARY_COLOR: '#8B4513',
    SECONDARY_COLOR: '#654321',
    BACKGROUND_GRADIENT: 'linear-gradient(135deg, #2c1810 0%, #4a2c2a 100%)',
    TEXT_COLOR: '#f5f5dc',
    ACCENT_COLOR: '#d4af8c'
  },
  
  ANIMATIONS: {
    TYPING_SPEED: 50,
    FADE_DURATION: 300,
    SCROLL_BEHAVIOR: 'smooth'
  },
  
  RESPONSIVE_BREAKPOINTS: {
    MOBILE: '768px',
    TABLET: '1024px',
    DESKTOP: '1200px'
  }
};

// Configurações de IA específicas
export const AI_CONFIG = {
  EMOTIONAL_DETECTION: {
    TRAUMA_THRESHOLD: 0.7,
    DOUBT_THRESHOLD: 0.6,
    ANGER_THRESHOLD: 0.8
  },
  
  RESPONSE_LENGTHS: {
    SHORT: 50,
    MEDIUM: 150,
    LONG: 300,
    EXTENDED: 500
  },
  
  FALLBACK_RESPONSES: {
    ERROR: "Sinto muito, mas estou tendo dificuldades técnicas no momento. Isso me lembra que, às vezes, até as coisas mais bem planejadas falham - e tudo bem. Que tal tentarmos novamente em alguns momentos?",
    API_LIMIT: "Parece que atingimos um limite de uso no momento. Como Philip Yancey diria, até mesmo as melhores conversas precisam de pausas para reflexão.",
    NETWORK_ERROR: "Estou tendo problemas de conexão. Isso me faz pensar em como, às vezes, nos sentimos desconectados de Deus também - mas a conexão sempre pode ser restaurada."
  }
};

export default getConfig();