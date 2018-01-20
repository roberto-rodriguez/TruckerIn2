import * as globalActions from 'src/reducers/globalActions'

export function listConversations(page = 0, callback){
  return function( dispatch, getState ){

    var userId = getState().globalReducer.profileInfo.userId

    var msgList = listConversationsAPI(page, userId)

     callback && callback(msgList)
  }
}

export function listMsg(page = 0, convId, userToId, callback){
  return function( dispatch, getState ){

    var userId = getState().globalReducer.profileInfo.userId

    var msgList = listMsgAPI(convId, page, userId, userToId)

    if(page === 2)msgList = msgList.slice(0,9)

     callback && callback(msgList)

  //  globalActions.showHeaderNotification('convId = ' + convId + ', userToId = ' + userToId)( dispatch, getState )
  }
}


export function sendMsg(convId, userToId, msg){
  return function( dispatch, getState ){

    var userId = getState().globalReducer.profileInfo.userId

     sendMsgAPI(convId, userId, userToId, msg)

//    globalActions.showHeaderNotification('convId = ' + convId + ', userToId = ' + userToId + ', msg = ' + msg)( dispatch, getState )
  }
}


//=------------------ APIs ----------------------
sendMsgAPI = (convId, userToId, msg) => {}

listMsgAPI = (convId, page, userId, userToId) => (
[
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Good to heard",
    createdAt: new Date(Date.UTC(2016, (10 - (page*2)), 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: "Developer"
    },
    sent: true,
    received: true
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Great",
    createdAt: new Date(Date.UTC(2016, (10 - (page*2)), 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: "Julio"
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "I'm Fine What about you?",
    createdAt: new Date(Date.UTC(2016, (10 - (page*2)), 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: "Developer"
    },
    sent: true,
    received: true
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "How are You?",
    createdAt: new Date(Date.UTC(2016, (10 - (page*2)), 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: "Julio"
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Hi!!",
    createdAt: new Date(Date.UTC(2016,  (10 - (page*2)), 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: "Julio"
    }
  },


  {
    _id: Math.round(Math.random() * 1000000),
    text: "Good to heard",
    createdAt: new Date(Date.UTC(2016, (10 - (page*2) - 1), 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: "Developer"
    },
    sent: true,
    received: true
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Great",
    createdAt: new Date(Date.UTC(2016, (10 - (page*2) - 1), 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: "Julio"
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "I'm Fine What about you?",
    createdAt: new Date(Date.UTC(2016, (10 - (page*2) - 1), 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: "Developer"
    },
    sent: true,
    received: true
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "How are You?",
    createdAt: new Date(Date.UTC(2016, (10 - (page*2) - 1), 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: "Julio"
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Hi!!",
    createdAt: new Date(Date.UTC(2016,(10 - (page*2) - 1), 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: "Julio"
    }
  }
])



listConversationsAPI = (page, userId) => (
  [
    {
      id: (page * 10 + 0),
      userId: (page * 10 + 0),
      userName: "Kumar Pratik",
      lastMsg: "Messi once again crowned the Ballon Dor. Valentino Rossi wins the MotoGP Premier 2016. Avantador is fast. Really fast.",
      time: "11:04 AM"
    },
    {
      id: (page * 10 + 1),
      userId: (page * 10 + 1),
      userName: "Atul Ranjan",
      lastMsg:  "Valentino Rossi wins the MotoGP Premier 2016.",
      time: "9:44 AM"
    },
    {
      id: (page * 10 + 2),
      userId: (page * 10 + 2),
      userName: "Megha Kumari",
      userImg:'https://www.trucks.com/wp-content/uploads/2016/06/Kylie-Jenner-Von-Dutch-Trucker-Hat-Headshot.jpg',
      lastMsg:"Messi once again crowned the Ballon Dor.",
      time: "6:34 PM",
      seen: true
    },
    {
      id: (page * 10 + 3),
      userId: (page * 10 + 3),
      userName: "Saurav",
      lastMsg: "Avantador is fast. Really fast",
      time: "Yesterday",
      seen: true
    },
    {
      id: (page * 10 + 4),
      userId: (page * 10 + 4),
      userName: "Varun",
      lastMsg: "It was a beautiful sunset.",
      time: "Yesterday",
      seen: true
    },

    {
      id: (page * 10 + 5),
      userId: (page * 10 + 5),
      userName: "Kumar Pratik",
      lastMsg: "Messi once again crowned the Ballon Dor. Valentino Rossi wins the MotoGP Premier 2016. Avantador is fast. Really fast.",
      time: "11:04 AM"
    },
    {
      id: (page * 10 + 6),
      userId: (page * 10 + 6),
      userName: "Atul Ranjan",
      lastMsg:  "Valentino Rossi wins the MotoGP Premier 2016.",
      time: "9:44 AM"
    },
    {
      id: (page * 10 + 7),
      userId: (page * 10 + 7),
      userName: "Megha Kumari",
      lastMsg:"Messi once again crowned the Ballon Dor.",
      time: "6:34 PM",
      seen: true
    },
    {
      id: (page * 10 + 8),
      userId: (page * 10 + 8),
      userName: "Saurav",
      lastMsg: "Avantador is fast. Really fast",
      time: "Yesterday",
      seen: true
    },
    {
      id: (page * 10 + 9),
      userId: (page * 10 + 9),
      userImg: 'http://www.truckercpa.com/newimages/truckerWindow.png',
      userName: "Varun",
      lastMsg: "It was a beautiful sunset.",
      time: "Yesterday",
      seen: true
    },
  ]
)
