

//import I18n from 'react-native-i18n'

import * as globalActions from 'src/reducers/globalActions'

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

//--- MOCK DATA ------------
