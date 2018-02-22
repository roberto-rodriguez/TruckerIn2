
import { Toast } from 'native-base';

export const showHeaderErrorAction = (headerError) => ({ type: 'SHOW_HEADER_ERROR', headerError })

export const doPOST = (url, dispatch, getState, data, callback) => {
  if(data){
    data.lang = getState().globalReducer.config.lang === 'es'
  }

   doFetch(url, dispatch, getState, callback, data)
}

export const doGET = (url, dispatch, getState, callback) => {
   doFetch(url, dispatch, getState, callback)
}

const doFetch = (url, dispatch, getState, callback, data) => {
  // var state = getState(),
  // token = state.clientInfo && state.clientInfo.token,
  // lang = state.lang;
  var config = {
    method: data ? 'POST': 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      // 'LANG': lang,
      // 'TOKEN': token
    })
  }

  if(data){
    config['body'] = JSON.stringify(data)
  }


//  var HOST = 'https://mobile.girocheck.net:8999'
  var HOST = 'http://69.42.101.181:8095/tin/'

  fetch(HOST + url, config)
  .then((response) => (response.json()))
  .then((response) => {
      // dispatch( setLoading(false) )

      if(response.status){
          onError(dispatch, response.statusMessage )
      }else{
          callback && callback( response.data || response );
      }
     }).catch((err) => {
       debugger;
        onError(dispatch,err)
      // alert(err)
       // dispatch( setLoading(false) )
       // ToastAndroid.showWithGravity(I18n.t( 'general.error' ), ToastAndroid.LONG, ToastAndroid.CENTER);
     });
}

const onError = (dispatch, text, delay) => {
  Toast.show({
      text,
      position: 'top', duration: (delay || 4000), type: 'danger'
    })

    dispatch( showHeaderErrorAction( text) )
    setTimeout( () => dispatch( showHeaderErrorAction(null) ), 1000)
}
