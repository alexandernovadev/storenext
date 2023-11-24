// i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './locales/en.json'
import translationES from './locales/es.json'

// Los recursos de traducción
const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng:'en', // Idioma inicial
  fallbackLng: 'en', // Idioma de respaldo
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
