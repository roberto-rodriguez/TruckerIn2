

//import I18n from 'react-native-i18n'

import * as globalActions from 'src/reducers/globalActions'

export function searchContacts(page = 0, params, callback, reset){
  return function( dispatch, getState ){

    var userId = getState().globalReducer.profileInfo.id

    var connections = apiGetProfileConnections( userId, page, params)

    var paramUserId = params && params.userId

    if(paramUserId && paramUserId === userId && getState().globalReducer.profileInfo.connections){
      connections = connections.map(c => {
        c.connectionStatus = 1
        return c
      })
    }

     callback && callback(connections, reset)
  }
}

export function loadPendingRequest(page = 0, callback){
  return function( dispatch, getState ){

    var userId = getState().globalReducer.profileInfo.userId

    var connections = apiGetProfileConnections( userId, page)

    if(callback){
      callback(connections)   //This is from the feed
    }else{
       dispatch( saveProfileConnections(connections))
    }
  }
}

export function answerContactRequest(contactId, userName, accept, callback){
  return function( dispatch, getState ){


    var userId = getState().globalReducer.profileInfo.userId;
    callback && callback()

    var pendingRequest = getState().globalReducer.profileInfo.pendingRequest;
    var connections = getState().globalReducer.profileInfo.connections;

    if(contactId == 0){
      connections = pendingRequest
      pendingRequest = 0
       globalActions.showHeaderNotification('All connection request have been accepted')( dispatch, getState )
    }else{
      pendingRequest = pendingRequest - 1

      if(accept){
        connections = connections + 1
        globalActions.showHeaderNotification('You and ' + userName + ' are now connected')( dispatch, getState )
      }
    }

    dispatch( globalActions.setGlobalProfileInfoAction({pendingRequest, connections}) )
  }
}

export function doConnect(contactId, name, callback){
  return function( dispatch, getState ){
    var a = contactId;
    var userId = getState().profileReducer.profileInfo.userId;
    globalActions.showHeaderNotification('Connection request has been sent to ' + name)( dispatch, getState )
    callback && callback()
  }
}




//--- MOCK DATA ------------ 

const filters = [ 'experienceId','name', 'locationId', 'equipmentId', 'roleId', 'jobStatusId' ]

function apiGetProfileConnections(userId, page = 0, searchParams){
  console.log('Retrieving connections. page: ' + page)
  var list = [
    {id: page * 10 + 1, userName: 'Roberto Rodriguez', role: 'Broker', roleId: 2,  profileImg: 'http://res.cloudinary.com/truckerin/image/upload/v1511722092/yo_o1q3tq.png' },
    {id: page * 10 + 2, userName: 'Julio Cesar', role: 'Driver', roleId: 1 , connectionStatus:2},
    {id: page * 10 + 3, userName: 'Pedro Rodriguez', role: 'Driver', roleId: 1 },
    {id: page * 10 + 4, userName: 'Jorge Luis', role: 'Driver', roleId: 1 },
    {id: page * 10 + 5, userName: 'Dori Lori',  role: 'Broker', roleId: 2 },

    {id: page * 10 + 6, userName: 'Atul Ranjan', role: 'Driver', roleId: 1 },
    {id: page * 10 + 7, userName: 'Roberto Borroto', role: 'Driver', roleId: 1,  profileImg: 'http://res.cloudinary.com/truckerin/image/upload/v1511722092/yo_o1q3tq.png', connectionStatus:2},
    {id: page * 10 + 8, userName: 'Freddy Mercuri', role: 'Driver', roleId: 1 },
    {id: page * 10 + 9, userName: 'Marco Silva', role: 'Driver', roleId: 1 },
    {id: page * 10 + 10, userName: 'Roman Perez', role: 'Driver', roleId: 1 }
  ]

  list = list.map(c => {
    c.equipmentId =  c.id % 5 + 1
    c.experienceId =  c.id % 6 + 1

    var loc = locations[ c.id % 5]
    c.locationId = loc && loc.id
    c.location = loc && loc.name

    var jobStatus = roleOptions[ c.id % 3]
    c.jobStatusId = jobStatus && jobStatus.id
    c.jobStatus = jobStatus && jobStatus.name
    return c
  })

  if(searchParams){
    filters.forEach((filter) => {
      list = applyFilter(filter, searchParams, list)
    })
  }

   return list
}

function applyFilter(filter, searchParams, list){
  var val = searchParams[filter]
  if(val){
    switch (filter) {
      case 'experienceId':
        return list.filter((item) => (item[filter] >= val))
      case 'name':
      debugger;
        return list.filter((item) => (item[filter].indexOf(val) >= 0))
      default:
        return list.filter((item) => (item[filter] === val))
    }
  }
  return list;
}

const locations = [
  {id:1, name: 'Atlanta, GA'},
  {id:2, name: 'Miami, FL'},
  {id:3, name: 'New York, NY'},
  {id:4, name: 'Fourt Loudardale, FL'},
  {id:5, name: 'West Palm Beach, FL'}
]

const jobStatusOptions= [ {id: 1, name: 'Actively searching'}, {id: 2, name: 'Not searching, but open to opportunities'}, {id:3, name:'Not interested'}]
const roleOptions= [ {id: 1, name: 'Driver'}, {id: 2, name: 'Broker'}, {id:3, name:'Company'}]
