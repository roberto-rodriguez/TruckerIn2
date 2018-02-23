

//import I18n from 'react-native-i18n'
import * as Connector from 'src/boot/reducers/connector'
import * as globalActions from 'src/boot/reducers/global.actions'
import * as jobsActions from 'src/views/jobs/jobs.actions'
import * as roles from 'src/components/c/Role'
import * as auxFunctions from './profile.actionsAuxFunctions'


export const saveProfileInfoAction = (userId, profileInfo) => ({ type: 'SAVE_PROFILE_INFO', userId, profileInfo })
export const saveProfileExperienceAction = (userId, profileExperience) => ({ type: 'SAVE_PROFILE_EXPERIENCE', userId, profileExperience })
export const saveProfileCareerItemAction = (userId, profileCareerItem) => ({ type: 'SAVE_PROFILE_CAREER_ITEM',userId, profileCareerItem })
export const deleteProfileCareerItemAction = (userId, id) => ({ type: 'DELETE_PROFILE_CAREER_ITEM', userId, id })
// export const saveProfileConnections = (list) => ({ type: 'SAVE_PROFILE_CONNECTIONS', list})
//export const saveProfilePostedJobs = (list) => ({ type: 'SAVE_PROFILE_POSTED_JOBS', list})



export function loadProfile(userId){
  return function( dispatch, getState ){

    var myProfile = getState().globalReducer.profileInfo
    var myUserId = myProfile.id

    if(userId != myUserId){

      if(getState().profileReducer[userId]){
            return;  //This means this user is already in the profileReducer (Not need to lookup in the server)
          }

        Connector.doGET('user/load/' + myUserId + '/' + userId, dispatch, getState, (profileInfo) => {

            auxFunctions.completeProfileInfo( profileInfo, getState )

            dispatch( saveProfileInfoAction(userId, profileInfo));

              Connector.doGET('experience/load/' + myUserId + '/' + userId, dispatch, getState, (profileExperience) => {

                auxFunctions.completeProfileExperience( profileExperience, getState )
                dispatch( saveProfileExperienceAction(userId, profileExperience) )
                auxFunctions.completeLoadProfile(userId, profileInfo.roleId, dispatch, getState)
              })
        })
    }else{
      var profileExperience = getState().globalReducer.profileExperience

      auxFunctions.completeProfileExperience( profileExperience, getState)
      dispatch( globalActions.setGlobalProfileExperienceAction(profileExperience) )

      auxFunctions.completeLoadProfile(userId, getState().globalReducer.profileInfo.roleId, dispatch, getState)
    }


  }
}

export function saveProfileCareerItem(profileCareerItem, callback){
  return function( dispatch, getState ){

    var userId = getState().globalReducer.profileInfo.id
    profileCareerItem.userId = userId

    Connector.doPOST('/career/save', dispatch, getState, profileCareerItem, function( careerId ){
      if(careerId){
        if(!profileCareerItem.id){
          profileCareerItem.id = careerId;
        }

         dispatch( saveProfileCareerItemAction(userId, profileCareerItem) )

         callback()
      }
    })
  }
}


export function loadProfileCareer(userId, page = 0, callback ){
  return function( dispatch, getState ){

    Connector.doPOST('career/list', dispatch, getState, {page, limit: 10, params:{'usuario.id': userId}},  callback)
  }
}


export function deleteProfileCareerItem(userId, id){
  return function( dispatch, getState ){
    //TODO Server side
    Connector.doGET('career/delete/' + id, dispatch, getState, () => dispatch( deleteProfileCareerItemAction(userId, id) ))


  }
}





export function loadProfileConnections(params, callback, reset){
  return function( dispatch, getState ){
    Connector.doPOST('userRelation/list', dispatch, getState, params,  (connections) => callback(connections, reset))
  }
}


export function loadProfilePostedJobs(userId, page = 0, callback ){
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



export function changeProfilePricture(id){
  return function( dispatch, getState ){
      globalActions.showHeaderNotification('Change Profile Picture will be ready in the next version.')( dispatch, getState )
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
    roleId:2,
    role:'Broker',
    location: {
      stateId: 'FL',
      cityId: 5,
      stateName: 'FL',
      cityName: 'Jacksonville',
      locationName: 'Jacksonville, FL'
    },
    firstName:'Roberto',
    lastName:'Rodriguez',
    jobStatusId: 1,
    jobStatus: 'Actively Searching',
//    profileImg,   //:'http://res.cloudinary.com/truckerin/image/upload/v1511722092/yo_o1q3tq.png',
    showPersonalInfo: 1,
    about: 'We are a brockerage company that believes in having a good time while doing what we love, and we do love what we do .  We are a brockerage company that believes in having a good time while doing what we love, and we do love what we do.',

    savedJobs: 2,
    appliedJobs: 3,
    postedJobs: 3,
    connections: 12,
    pendingRequest: 10
  }
}


function apiGetProfileConnections(userId, page = 0, nameFilter){
  console.log('Retrieving connections. page: ' + page)
  var list = [
    {id: page * 10 + 1, userName: 'Roberto Rodriguez', role: 'Broker', roleId: 2},
    {id: page * 10 + 2, userName: 'Julio Cesar', role: 'Driver', roleId: 1, connectionStatus:2},
    {id: page * 10 + 3, userName: 'Pedro Rodriguez', role: 'Driver', roleId: 1},
    {id: page * 10 + 4, userName: 'Jorge Luis', role: 'Driver', roleId: 1},
    {id: page * 10 + 5, userName: 'Dori Lori',  role: 'Broker', roleId: 2},

    {id: page * 10 + 6, userName: 'Atul Ranjan', role: 'Driver', roleId: 1},
    {id: page * 10 + 7, userName: 'Roberto Borroto', role: 'Driver', roleId: 1, connectionStatus:2},
    {id: page * 10 + 8, userName: 'Freddy Mercuri', role: 'Driver', roleId: 1},
    {id: page * 10 + 9, userName: 'Marco Silva', role: 'Driver', roleId: 1},
    {id: page * 10 + 10, userName: 'Roman Perez', role: 'Driver', roleId: 1}
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
