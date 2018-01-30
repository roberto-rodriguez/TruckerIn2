import * as globalActions from 'src/boot/reducers/global.actions'

export function listNotifications(page = 0, callback){
  return function( dispatch, getState ){

    var userId = getState().globalReducer.profileInfo.userId

    var msgList = listNotificationsAPI(page, userId)

     callback && callback(msgList)

     dispatch( globalActions.setGlobalProfileInfoAction({notifications:0}) )
  }
}



//=------------------ APIs ----------------------

listNotificationsAPI = (convId, page, userId, userToId) => (
[
  {
    id: Math.round(Math.random() * 1000000),
    text: "Pedro Rodriguez sent you a message",
    createdAt: 1516229372464,
    userName: 'Pedro Rodriguez',
    seen: false,
    isNew:true,  //TODO this will not be needed, we will just keep the number of unseen notifications in the user
    entityId: 3,
    route: 'Chat',
    params:'{ "convId": 3, "name": "Pedro Rodriguez" }'
  },
  {
    id: Math.round(Math.random() * 1000000),
    text: "Jorge Luis sent you contact request",
    createdAt: 1516229372464,
    userName: 'Jorge Luis',
    seen: false,
    isNew:true,
    entityId: 5,
    route: 'PendingRequestList'
  },
  {
    id: Math.round(Math.random() * 1000000),
    text: "There was a change in the Terms of Service",
    createdAt: 1516229372464,
    userName: 'TruckerIn',
    seen: true,
    entityId: 3,
    route: 'TOS'
  },
  {
    id: Math.round(Math.random() * 1000000),
    text: "Freddy Mercury accepted your Contact Request. Click here to see his profile.",
    createdAt: 1516229372464,
    userName: 'Freddy Mercury',
    userImg: 'http://www.truckercpa.com/newimages/truckerWindow.png',
    seen: true,
    entityId: 2,
    route: 'Profile',
    params:'{"userInfo":{"id":2, "userName": "Freddy Mercury", "location":"Atlanta, GA", "role":"Driver"}}'
  },
  {
    id: Math.round(Math.random() * 1000000),
    text: "Marco Naranjo posted a new Job, click here to see it",
    createdAt: 1516229372464,
    userName: 'Marco Naranjo',
    userImg: 'http://media.oregonlive.com/gresham_impact/photo/trucker-attackedjpg-e7df2a006fe25cb5.jpg',
    seen: true,
    entityId: 3,
    route: 'JobDetails',
    params:'{ "data" : { "id": 3 }}'
  },
  {
    id: Math.round(Math.random() * 1000000),
    text: "Julio Cesar sent you a notification",
    createdAt: 1516229372464,
    userName: 'Julio Cesar',
    seen: true,
    entityId: 3,
    route: 'Chat',
    params:'{ "convId": 3, "name": "Julio Cesar" }'
  },{
    id: Math.round(Math.random() * 1000000),
    text: "Julio Cesar sent you a notification",
    createdAt: 1516229372464,
    userName: 'Julio Cesar',
    seen: true,
    entityId: 3,
    route: 'Chat',
    params:'{ "convId": 3, "name": "Julio Cesar" }'
  },
  {
    id: Math.round(Math.random() * 1000000),
    text: "Julio Cesar sent you a notification",
    createdAt: 1516229372464,
    userName: 'Julio Cesar',
    seen: true,
    entityId: 3,
    route: 'Chat',
    params:'{ "convId": 3, "name": "Julio Cesar" }'
  },
  {
    id: Math.round(Math.random() * 1000000),
    text: "Julio Cesar sent you a notification",
    createdAt: 1516229372464,
    userName: 'Julio Cesar',
    seen: true,
    entityId: 3,
    route: 'Chat',
    params:'{ "convId": 3, "name": "Julio Cesar" }'
  },
  {
    id: Math.round(Math.random() * 1000000),
    text: "Julio Cesar sent you a notification",
    createdAt: 1516229372464,
    userName: 'Julio Cesar',
    seen: true,
    entityId: 3,
    route: 'Chat',
    params:'{ "convId": 3, "name": "Julio Cesar" }'
  }
])
