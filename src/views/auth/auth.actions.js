

//import I18n from 'react-native-i18n'
import I18n from 'react-native-i18n'
import * as globalActions from 'src/boot/reducers/global.actions'
import * as Connector from 'src/boot/reducers/connector'
import * as Storage from 'src/boot/reducers/storage.actions'

export const resetProfileAction = (profileInfo) => ({ type: 'RESET_PROFILE' })

export function login( email, password, callback ){
  return function( dispatch, getState ){
    //if(username && password){
    globalActions.doLogin({email, password}, callback)( dispatch, getState )
  //  globalActions.loadConfig(dispatch)

    //}

  }
}


export function sendAccessCode(phone, callback ){
  return function( dispatch, getState ){
    Connector.doPOST('user/accessCode', dispatch, getState, {phone}, callback)
}
}


export function register(data, callback){
  return function( dispatch, getState ){
   //Call register API
   var resultCode = 1  //Everything OK
   var resultMessage = 'SUCCESS'

   data.completion = 100.0

   Connector.doPOST('/user/save', dispatch, getState, data, function( response ){
     if(response){
       var id = 1;

       data.id = id;
       data.userId = id;
          dispatch( globalActions.setGlobalProfileInfoAction( data ) )
          dispatch( globalActions.setGlobalProfileExperienceAction( data ) )

             // Storage.storeToken( 'register_token' ) //TODO get token from register response
           callback(true, resultMessage)
     }else{
       alert('No response received')
     }
   }) 

  }
}

//--- MOCK DATA ------------
