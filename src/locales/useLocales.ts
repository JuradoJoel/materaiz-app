import { useTranslation } from 'react-i18next';
// components
import { useSettingsContext } from '../components/settings';
//
import { allLangs, defaultLang } from './config';
import { setLocale } from 'yup';
import { loadLanguage } from './i18n';

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  const { onChangeDirectionByLang } = useSettingsContext();

  const langStorage = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : '';

  const currentLang = allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

  const handleChangeLanguage = async (newlang: string) => {
    const newLangObj = allLangs.find((_lang) => _lang.value === newlang) || defaultLang;
    // Cargar el idioma bajo demanda si no está cargado
    await loadLanguage(newlang);
    i18n.changeLanguage(newlang);
    onChangeDirectionByLang(newlang);
    setLocale(newLangObj.yupLocale);
  };

  // Set the locale initially
  setLocale(currentLang.yupLocale);

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text: any, options?: any) => translate(text, options),
    currentLang,
    allLangs,
  };
}
