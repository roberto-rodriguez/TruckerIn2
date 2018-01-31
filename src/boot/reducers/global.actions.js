
//import I18n from 'react-native-i18n'
import I18n from 'react-native-i18n'
import * as Connector from './connector'
import * as Storage from './storage.actions'
import { NavigationActions } from "react-navigation";

export const setLoadingAction = (isLoading) => ({ type: 'IS_LOADING', isLoading })
export const loadConfigAction = (config) => ({ type: 'LOAD_CONFIG', config })
export const setGlobalProfileInfoAction = (profileInfo) => ({ type: 'SET_GLOBAL_PROFILE_INFO', profileInfo })
export const setGlobalProfileExperienceAction = (profileExperience) => ({ type: 'SET_GLOBAL_PROFILE_EXPERIENCE', profileExperience })
export const showHeaderNotificationAction = (headerNotification) => ({ type: 'SHOW_HEADER_NOTIFICATION', headerNotification })
export const updateNotifications = (notification, value ) => ({ type: 'UPDATE_NOTIFICATIONS', notification, value })
export const setLangAction = (lang) => ({ type: 'SET_LANG', lang })
export const resetAction = NavigationActions.reset({index: 0, actions: [NavigationActions.navigate({ routeName: "Login" })]});

//Check if there is Token in the local storage, if so, it tries to login with it
export function setup(callback){
  return function( dispatch, getState ){

    Storage.retrieveToken().then(data => {

      if(data && data.token && data.token !== '0'){
        doLogin(data, callback)( dispatch, getState )
      }else{
        callback(false)
      }

     })
  }
}

export function doLogin(obj, callback){
  return function( dispatch, getState ){
    //In the getConfig CallBack
    var profileInfo = apiGetProfileInfo(1)

    var loginSuccess = profileInfo && profileInfo.id

    callback(loginSuccess)

    if(loginSuccess){
        profileInfo.token && Storage.storeToken( profileInfo.token )

        dispatch( setGlobalProfileInfoAction(profileInfo) )

        //In the get profileInfo CallBack
    //    loadConfig(dispatch)

        var profileExperience = apiGetProfileExperience(1)
        dispatch( setGlobalProfileExperienceAction(profileExperience) )
    }

  }
}

export function logOut(){
  return function( dispatch, getState ){
     Storage.storeToken( '0' )
  }
}


//TODO Deprecated, is now 'doLogin'
export function getSession(){
  return function( dispatch, getState ){
    //In the getConfig CallBack
    var profileInfo = apiGetProfileInfo(1)
    dispatch( setGlobalProfileInfoAction(profileInfo) )

    //In the get profileInfo CallBack
  //  loadConfig(dispatch)

    var profileExperience = apiGetProfileExperience(1)
    dispatch( setGlobalProfileExperienceAction(profileExperience) )
  }
}

export function setupLang(){
  return function( dispatch, getState ){
    Storage.retrieveLocalStorageInfo().then(data => {
         var lang = getState().globalReducer.config.lang

         if(data.lang && data.lang != lang){
            I18n.locale = data.lang
            dispatch( setLangAction(data.lang) )
         }

         Connector.doGET('config/get/' + I18n.locale, dispatch, getState, (config) => dispatch( loadConfigAction(config) ))
     })
  }
}



export function setLang(lang){
  return function( dispatch, getState ){
     I18n.locale = lang
     dispatch( setLangAction(lang) )
     Storage.storeLang( lang )
  }
}

export function setLoading(isLoading){
  return function( dispatch, getState ){
          dispatch( setLoadingAction(isLoading) )
  }
}

// export function loadConfig(dispatch){
// //  var config = apiLoadConfig()
//   Connector.doGET = ('config/get/', dispatch, getState, callback)
//
//   dispatch( loadConfigAction(config) )
// }



export function showHeaderNotification(msg, startDelay){
  return function( dispatch, getState ){
      setTimeout( () => {
        dispatch( showHeaderNotificationAction(msg) )
        setTimeout( () => dispatch( showHeaderNotificationAction(null) ), 3000)
      }, startDelay || 1)
  }
}


//--- MOCK DATA ------------
export function apiGetProfileInfo(userId){
  return {
    id:1,  //TODO  change id for userId
    userId:1,
    token: 'xyz',
    completion: 100,
    phone: '786-454-0209',
    email: 'titorobe@yahoo.com',
    roleId: 1,
    role: 'Driver',
    location: {
      stateId: 'FL',
      cityId: 3,
      stateName: 'Florida',
      cityName: 'Orlando',
      locationName: 'Orlando, FL'
    },
    firstName:'Julio',
    lastName:'Cesar',
    jobStatusId: 1,
    jobStatus: 'Actively Searching',
    about: 'Join millions of people in millions of communities across millions of #tags. See something you love? Reblog it to your Tumblr and start a conversation. Or just lurk, if you’re feeling shy. No big deal.',
  //  profileImg:'http://res.cloudinary.com/truckerin/image/upload/v1511722092/yo_o1q3tq.png',
    showPersonalInfo: 1,
    savedJobs: 5,
    appliedJobs: 3,
    postedJobs: 5,
    connections: 0,
    pendingRequest: 0,
    notifications:34
  }
}

export function apiGetProfileExperience(userId){
  return {
    completion: 83,
    equipmentId: 4,
    equipment: 'Tanker',
    experienceId: 4,
    experience: '1 - 2 year',
    ownerOperator:1,
    cdl: 2,
    overRoadExp: 0,
    willTakeOverRoad: 1
  }
}


function apiLoadConfig(){
  return {
    equipmentOptions: [  {id:1, name:'Dump Truck'}, {id:4, name:'Tanker'}, {id:5, name:'Tractor'} , {id:5, name:'Flat Bed'} ],
    experienceOptions: [ {id:2, name:'6 Months'}, {id:3, name:'1 year'}, {id:4, name:'2 year'}, {id:5, name:'3 year'}, {id:6, name:'5 year'} ],
    jobStatusOptions: [ {id: 1, name: 'Actively searching'}, {id: 2, name: 'Not searching, but open to opportunities'}, {id:3, name:'Not interested'}],
    roleOptions: [ {id: 1, name: 'Driver'}, {id: 2, name: 'Broker'}, {id:3, name:'Company'}],
    hiringStatusOptions: [ {id: 1, name: 'Hiring Now'}, {id: 2, name: 'Possibly Hiring'}, {id:3, name:'Not Hiring'}]
  }
}


// function apiGetSessionInfo(){
//   return {
//     id: 1,
//     roleId: 1,
//     name: 'Roberto Rodriguez',
//     profileImg:'http://res.cloudinary.com/truckerin/image/upload/v1511722092/yo_o1q3tq.png',
//     // profileInfoCompletion:100,
//     // profileExperienceCompletion:75
//   }
// }
