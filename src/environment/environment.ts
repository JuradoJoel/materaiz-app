const environments = {
  dev: {
    backEnd: 'http://localhost:3000/api/',
    baseURL: 'https://materaiz-back.onrender.com/',
    production: false,
  },
  prod: {
    backEnd: 'https://materaiz-back.onrender.com/api/',
    baseURL: 'https://materaiz-back.onrender.com/',
    production: true,
  },
};

const urlToEnvMap = {
  'example.dev.com': environments.dev,
  'example.production.com': environments.prod,
};

const { hostname } = window.location;

const defaultEnv = environments.dev;

export const environment = urlToEnvMap[hostname as keyof typeof urlToEnvMap] || defaultEnv;
