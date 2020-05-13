import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import esLang from './entries/es-ES';
import enRtlLang from './entries/en-US-rtl';
import BrLang from './entries/pt-BR';

const AppLocale = {
  en: enLang,
  es: esLang,
  br: BrLang,
  enrtl: enRtlLang,
};
addLocaleData(AppLocale.br.data);
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.es.data);
addLocaleData(AppLocale.enrtl.data);

export default AppLocale;
