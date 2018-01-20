

//import I18n from 'react-native-i18n'

import * as globalActions from 'src/reducers/globalActions'

export const resetProfileAction = (profileInfo) => ({ type: 'RESET_PROFILE' })
export const saveProfileInfoAction = (profileInfo) => ({ type: 'SAVE_PROFILE_INFO', profileInfo })
export const saveProfileExperienceAction = (profileExperience) => ({ type: 'SAVE_PROFILE_EXPERIENCE', profileExperience })
export const saveProfileCareerAction = (profileCareer) => ({ type: 'SAVE_PROFILE_CAREER', profileCareer })
export const saveProfileCareerItemAction = (profileCareerItem) => ({ type: 'SAVE_PROFILE_CAREER_ITEM', profileCareerItem })
export const deleteProfileCareerItemAction = (id) => ({ type: 'DELETE_PROFILE_CAREER_ITEM', id })
export const saveProfileConnections = (list) => ({ type: 'SAVE_PROFILE_CONNECTIONS', list})

export function resetProfileInfo( ){
  return function( dispatch, getState ){
      dispatch( resetProfileAction() )
  }
}


export function saveProfileInfo(profileInfo){
  return ( dispatch, getState ) => dispatch( globalActions.setGlobalProfileInfoAction(profileInfo) )
}


export function saveProfileExperience(profileExperience){
  return function( dispatch, getState ){
        //  dispatch( saveProfileExperienceAction(profileExperience) )

      //    dispatch( globalActions.setSessionAction({profileExperienceCompletion: profileExperience.completion}))
          dispatch( globalActions.setGlobalProfileExperienceAction(profileExperience) )
  }
}


export function saveProfileCareerItem(profileCareerItem){
  return function( dispatch, getState ){
    if(!profileCareerItem.id){
      profileCareerItem.id = Object.keys(getState().profileReducer.profileCareer.careerHistory).length + 1;
    }

     dispatch( saveProfileCareerItemAction(profileCareerItem) )
  }
}

export function loadProfileConnections(userId, page = 0, nameFilter, callback, reset){
  return function( dispatch, getState ){

    userId = userId || getState().profileReducer.profileInfo.userId

    var connections = apiGetProfileConnections( userId, page, nameFilter)

    if(callback){
      callback(connections, reset)   //This is from the feed
    }else{
       dispatch( saveProfileConnections(connections))
    }

  }
}

export function loadProfileCareer(isMe, page = 0, callback ){
  return function( dispatch, getState ){

    var userId = isMe ? getState().globalReducer.profileInfo.id : getState().profileReducer.profileInfo.userId

    var profileCareer = apiGetCareer(userId, page)

 //This will be called just from ProfileCareerList
      callback(profileCareer && profileCareer.careerHistory)
  }
}


export function deleteProfileCareerItem(id){
  return function( dispatch, getState ){
     dispatch( deleteProfileCareerItemAction(id) )
  }
}


export function loadProfile(userId){
  return function( dispatch, getState ){

    dispatch( resetProfileAction() )

    if(userId != getState().globalReducer.profileInfo.id){
      var profileInfo = apiGetProfileInfo(userId);
      dispatch( saveProfileInfoAction(profileInfo));

      var profileExperience = globalActions.apiGetProfileExperience(userId);
      dispatch( saveProfileExperienceAction(profileExperience) )
    }


    var profileCareer = apiGetCareer(userId)

    if(profileCareer.careerHistory){
      profileCareer.careerHistory = profileCareer.careerHistory.reduce((acc, careerItem) => {
                                       acc[careerItem.id] = careerItem;
                                       return acc;
                                     }, {});
    }else{
      profileCareer.careerHistory = {}
    }

    dispatch( saveProfileCareerAction(profileCareer) )


    loadProfileConnections(userId)(dispatch, getState)
  }
}


//--- MOCK DATA ------------
export function apiGetProfileInfo(userId){
  return {
    id:1,  //TODO  change id for userId
    userId:1,
    completion: 100,
    phone: '786-454-0209',
    email: 'titorobe@yahoo.com',
    roleId:1,
    role:'Driver',
    locationId:1,
    location: 'Atlanta, GA',
    firstName:'Roberto',
    lastName:'Rodriguez',
    jobStatusId: 1,
    jobStatus: 'Actively Searching',
//    profileImg,   //:'http://res.cloudinary.com/truckerin/image/upload/v1511722092/yo_o1q3tq.png',
    showPersonalInfo: 1,

    savedJobs: 2,
    appliedJobs: 3,
    postedJobs: 6,
    connections: 12,
    pendingRequest: 10
  }
}


const pratikImg = require("../../../../assets/contacts/pratik.png");
const atulImg = require("../../../../assets/contacts/atul.png");
const meghaImg = require("../../../../assets/contacts/megha.png");
const sauravImg = require("../../../../assets/contacts/saurav.png");
const sanketImg = require("../../../../assets/contacts/sanket.png");
const varunImg = require("../../../../assets/contacts/varun.png");
const yoImg = require("../../../../assets/contacts/yo.png");
const freddyImg = require("../../../../assets/contacts/Freddy.jpg");
const marcoImg = require("../../../../assets/contacts/Marco.jpg");
const romanImg = require("../../../../assets/contacts/Roman.jpg");


function apiGetProfileConnections(userId, page = 0, nameFilter){
  console.log('Retrieving connections. page: ' + page)
  var list = [
    {id: page * 10 + 1, userName: 'Roberto Rodriguez', role: 'Broker', roleId: 2,  profileImg: yoImg},
    {id: page * 10 + 2, userName: 'Julio Cesar', role: 'Driver', roleId: 1,profileImg: sanketImg, connectionStatus:2},
    {id: page * 10 + 3, userName: 'Pedro Rodriguez', role: 'Driver', roleId: 1, profileImg: varunImg},
    {id: page * 10 + 4, userName: 'Jorge Luis', role: 'Driver', roleId: 1, profileImg: sauravImg},
    {id: page * 10 + 5, userName: 'Dori Lori',  role: 'Broker', roleId: 2, profileImg: meghaImg},

    {id: page * 10 + 6, userName: 'Atul Ranjan', role: 'Driver', roleId: 1, profileImg: atulImg},
    {id: page * 10 + 7, userName: 'Roberto Borroto', role: 'Driver', roleId: 1, profileImg: pratikImg, connectionStatus:2},
    {id: page * 10 + 8, userName: 'Freddy Mercuri', role: 'Driver', roleId: 1, profileImg: freddyImg},
    {id: page * 10 + 9, userName: 'Marco Silva', role: 'Driver', roleId: 1, profileImg: marcoImg},
    {id: page * 10 + 10, userName: 'Roman Perez', role: 'Driver', roleId: 1, profileImg: romanImg}
  ]

  if(nameFilter){
    return list.filter((it) => (it.userName.indexOf(nameFilter) >= 0))
  }else{
    return list
  }
}


function apiGetCareer(userId, page = 0){
  return {
    careerHistory: [
      {
        id: page * 10 + 1,
        company: 'Union Carrier Service',
        date: 'From Nov 12 to Dic 15',
        desc: 'Property specifies how to capitalize an elements text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. Property specifies how to capitalize an elements text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized.'
       },
      {
        id: page * 10 + 2,
        company: 'Lazaro Delivery',
        date: 'From 2015 to 2018',
        desc: 'Internet Explorer 9 was the closest to the CSS 2 definition, but with some weird cases). By precisely defining the correct behavior'
      },
      {
        id: page * 10 + 3,
        company: 'Robe Solutions',
        date: 'From Nov 12 to Dic 15',
        desc: "I've put hundreds of hours into the project to give back to the open source community. If you'd like, here are a couple of ways you can tell me thanks for all my hard work."
       },
      {
        id: page * 10 + 4,
        company: 'Delivery Express',
        date: 'From 2015 to 2018',
        desc: 'You can now use any of the hundreds of community-curated themes on GitHub.com to change the look and feel of your GitHub Pages site.'
      },
      {
        id: page * 10 + 5,
        company: 'International Carrier',
        date: 'From Nov 12 to Dic 15',
        desc: "When you follow people, you'll see their public activity in the activity view of your news feed. If someone you follow stars a public repository, GitHub may recommend the repository to you in the discovery view of your news feed. To follow someone, visit their profile page and click Follow under their profile image."
      },
      {
        id: page * 10 + 6,
        company: 'Union Carrier Service',
        date: 'From Nov 12 to Dic 15',
        desc: 'Property specifies how to capitalize an elements text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized.'
       },
      {
        id: page * 10 + 7,
        company: 'Lazaro Delivery',
        date: 'From 2015 to 2018',
        desc: 'Internet Explorer 9 was the closest to the CSS 2 definition, but with some weird cases). By precisely defining the correct behavior'
      },
      {
        id: page * 10 + 8,
        company: 'Robe Solutions',
        date: 'From Nov 12 to Dic 15',
        desc: "I've put hundreds of hours into the project to give back to the open source community. If you'd like, here are a couple of ways you can tell me thanks for all my hard work."
       },
      {
        id: page * 10 + 9,
        company: 'Delivery Express',
        date: 'From 2015 to 2018',
        desc: 'You can now use any of the hundreds of community-curated themes on GitHub.com to change the look and feel of your GitHub Pages site.'
      },
      {
        id: page * 10 + 10,
        company: 'International Carrier',
        date: 'From Nov 12 to Dic 15',
        desc: "When you follow people, you'll see their public activity in the activity view of your news feed. If someone you follow stars a public repository, GitHub may recommend the repository to you in the discovery view of your news feed. To follow someone, visit their profile page and click Follow under their profile image."
       }
    ]
  }
}
