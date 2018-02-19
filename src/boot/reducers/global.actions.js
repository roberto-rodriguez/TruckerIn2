
//import I18n from 'react-native-i18n'
import I18n from 'react-native-i18n'
import * as Connector from './connector'
import * as Storage from './storage.actions'
import { NavigationActions } from "react-navigation";
import { Toast } from 'native-base';

export const resetGlobalAction = () => ({ type: 'RESET_GLOBAL' })
export const resetProfileAction = () => ({ type: 'RESET_PROFILE' })

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
        doLogin(data, (data) => {
          callback(data)
          loadConfig(dispatch, getState )

        })( dispatch, getState )
      }else{
        callback(false)
        loadConfig(dispatch, getState )
      }
     })
  }
}

loadConfig = (dispatch, getState) => setTimeout(() => Connector.doGET('config/get/' + I18n.locale, dispatch, getState, (config) => dispatch( loadConfigAction(config) )), 2000 )

export function doLogin(obj, callback){

  return function( dispatch, getState ){

      Connector.doPOST('user/login', dispatch, getState, obj, (profileInfo) => {

        var userId = profileInfo && profileInfo.id

        callback(userId)

        if(userId){
            profileInfo.token && Storage.storeToken( profileInfo.token )

          //  Connector.completeProfileInfo( profileInfo, getState )

            dispatch( setGlobalProfileInfoAction(profileInfo) )

            setTimeout( () => Connector.doGET('experience/load/' + userId + '/' + userId, dispatch, getState,  (profileExperience) => {

              //  Connector.completeProfileExperience(profileInfo.roleId, profileExperience, getState)

                dispatch( setGlobalProfileExperienceAction(profileExperience) )
              }), 3000);
        }
      })
  }
}


export function logOut(){
  return function( dispatch, getState ){
     Storage.storeToken( '0' )
     dispatch( resetGlobalAction() )
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

export function showHeaderNotification(text, startDelay){
  return function( dispatch, getState ){
    setTimeout( () => Toast.show({ text, position: 'top', duration: 4000, type: 'success' }) , startDelay || 1)
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
