

//import I18n from 'react-native-i18n'
import I18n from 'react-native-i18n'
import * as globalActions from 'src/boot/reducers/global.actions'
import * as Connector from 'src/boot/reducers/connector'
import * as Storage from 'src/boot/reducers/storage.actions'

export const resetProfileAction = (profileInfo) => ({ type: 'RESET_PROFILE' })

export function login( username, password, callback ){
  return function( dispatch, getState ){

    //if(username && password){
    globalActions.doLogin({username, password}, callback)( dispatch, getState )
  //  globalActions.loadConfig(dispatch)

    //}


  //  setTimeout(() => callback(true), 1000)
  }
}

// export function loadConfig(){
//   return function( dispatch, getState ){
//     globalActions.loadConfig(dispatch)
//   }
// }

export function sendAccessCode(phone, callback ){
  return function( dispatch, getState ){
    //TODO, validate if htat phone belongs to an existent user, if not create one and send the id back, to be stored in the globalReducer, that will help in case of contactUs in page 4
   }
}

export function validateAccessCode(accessCode, callback){
  return function( dispatch, getState ){
    callback(accessCode === '1111', 'validatePhone')
  }
}

export function validateUsername(username, callback){
  return function( dispatch, getState ){
    var result = username !== 'a'
    callback(result, 'usernameTaken', result ? null : 'username')
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
