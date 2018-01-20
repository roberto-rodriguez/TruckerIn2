
import I18n from 'react-native-i18n'
import es from './es'
import en from './en'
//var deviceLocale = require('react-native').NativeModules.RNI18n.locale
const CustomI18N  = {
    start: function(  ){

    I18n.fallbacks = true

    I18n.translations = { es, en }

    var loc = I18n.currentLocale() &&  I18n.currentLocale().split('-')[0]
    I18n.locale = (loc === 'es' || loc === 'ES') ? 'es' : 'en'

  }
}

  export default CustomI18N
