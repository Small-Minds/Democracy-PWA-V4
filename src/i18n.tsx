import i18n from 'i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from 'react-i18next';

import languageEN from './locale/en/translation.json';
import languageCN from './locale/cn/translation.json';
import languageFR from './locale/fr/translation.json';

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources: {
        en: languageEN,
        cn: languageCN,
        fr: languageFR
    },
    /*default language*/
    lng: 'en',
    /*fallback language*/
    debug: true,
    ns:["translations"],
    defaultNS:"translation",
    keySeparator: ".",
    interpolation:{
        escapeValue: false,
        formatSeparator: ","
    },
    react:{
        bindI18n: "languageChanged loaded",
        bindI18nStore: "added removed",
        nsMode: "default"
    }
});

export default i18n;