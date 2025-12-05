import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//
import { defaultLang } from './config';
//
// Solo cargar el idioma por defecto inicialmente (español)
import esLocales from './langs/es/es';

// ----------------------------------------------------------------------

let lng = defaultLang.value;

if (typeof window !== 'undefined') {
  lng = localStorage.getItem('i18nextLng') || 'es'; // Cambiar default a español
}

// Función para cargar idiomas bajo demanda (solo inglés y español)
const loadLanguage = async (lang: string) => {
  switch (lang) {
    case 'en':
      const enLocales = await import('./langs/en/en');
      i18n.addResourceBundle('en', 'translations', enLocales.default, true, true);
      break;
    case 'es':
    default:
      // Español ya está cargado
      break;
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translations: esLocales },
    },
    lng,
    fallbackLng: 'es',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

// Cargar el idioma inicial si no es español
if (lng !== 'es') {
  loadLanguage(lng);
}

// Exportar función para cargar idiomas bajo demanda
export { loadLanguage };

export default i18n;
