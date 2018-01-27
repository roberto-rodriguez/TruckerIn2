import I18n from 'react-native-i18n'
import moment from 'moment';
import momentEs from 'moment/locale/es';

export default function formatDate(date, format){
  if(!date) return ''

  var mom = moment(date).locale( I18n.locale )

  if(format){
    return mom.format(format);
  }else{
    return mom.fromNow();
  }
}
