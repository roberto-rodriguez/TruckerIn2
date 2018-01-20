import I18n from 'react-native-i18n'
import moment from 'moment';
import momentEs from 'moment/locale/es';

export default function formatDate(date){
   return moment(date).locale( I18n.locale ).fromNow();
}
