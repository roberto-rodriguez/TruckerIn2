
import I18n from 'react-native-i18n'
import { Toast } from 'native-base';
export const showHeaderErrorAction = (headerError) => ({ type: 'SHOW_HEADER_ERROR', headerError })

export const doPOST = (url, dispatch, getState, data, callback, errorCallback) => {
   data.lang = I18n.locale
   doFetch(url, dispatch, getState, callback, data, errorCallback)
}

export const doGET = (url, dispatch, getState, callback) => {
   doFetch(url, dispatch, getState, callback)
}

const doFetch = (url, dispatch, getState, callback, data, errorCallback) => {
  var config = {
    method: data ? 'POST': 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }

  if(data){
    config['body'] = JSON.stringify(data)
  }

  var wasServerTimeout = false;

  var timeout = setTimeout(() => {
    wasServerTimeout = true;

    onError(dispatch, I18n.t('general.error.timeout') )

  } , 5000)


//  var HOST = 'https://mobile.girocheck.net:8999'
  var HOST = 'http://69.42.101.181:8095/tin/'

  var time = (new Date()).getTime();

  fetch(HOST + url, config)
  .then((response) => {
    console.log('Answer time: ' + ((new Date()).getTime() - time))
    timeout && clearTimeout(timeout);

    if(!wasServerTimeout){
        return response.json()
    }
  })
  .then((response) => {
      timeout && clearTimeout(timeout);

      if(response && response.status){
        if(!wasServerTimeout){
          if(errorCallback){
            errorCallback(response.statusMessage)
          }else{
              onError(dispatch, response.statusMessage )
          }
        }
      }else{
          callback && callback( response.data || response );
      }
     }).catch((err) => {
       timeout && clearTimeout(timeout);

       if(!wasServerTimeout){
         onError(dispatch, I18n.t('general.error.contactUs') )
       }

     });
}

const onError = (dispatch, text) => {
  Toast.show({
      text,
      position: 'top', duration: 4000, type: 'danger'
    })

    dispatch( showHeaderErrorAction( text ) )
    setTimeout( () => dispatch( showHeaderErrorAction(null) ), 1000)
}
