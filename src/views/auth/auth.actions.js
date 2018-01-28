

//import I18n from 'react-native-i18n'
import I18n from 'react-native-i18n'
import * as globalActions from 'src/boot/reducers/global.actions'

export const resetProfileAction = (profileInfo) => ({ type: 'RESET_PROFILE' })

export function login( username, password, callback ){
  return function( dispatch, getState ){

    //if(username && password){
    globalActions.loadConfig(dispatch)
    globalActions.getSession()( dispatch, getState )
    //}


    setTimeout(() => callback(true), 1000)
  }
}

export function loadConfig(){
  return function( dispatch, getState ){
    globalActions.loadConfig(dispatch)
  }
}

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
   var id = 1;

   data.id = id;
   data.userId = id;
   data.completion = 100;

   dispatch( globalActions.setGlobalProfileInfoAction( data ) )
   dispatch( globalActions.setGlobalProfileExperienceAction( data ) )

   callback(resultCode === 1, resultMessage)
  }
}

//--- MOCK DATA ------------
