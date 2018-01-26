import moment from 'moment';

//import I18n from 'react-native-i18n'
import data from './list/data'
import * as globalActions from 'src/reducers/globalActions'

export function jobApply(jobId, availability, callback){
  return function( dispatch, getState ){
    var userId =  getState().globalReducer.profileInfo.id

    console.log('Applying for Job: ' + jobId);

    var success = true
    var resultMsg = 'Success'

    callback && callback(success, resultMsg)
  }
}

export function loadJobs(page = 0, searchParams, callback, reset){
  return function( dispatch, getState ){
    var userId = searchParams.userId ||  getState().globalReducer.profileInfo.id

    var jobs =  apiLoadJobs(userId, page, searchParams)

    callback && callback(jobs, reset)
  }
}

export function answerJobApp(job, answer, callback){
  return function( dispatch, getState ){

    var action = {
      id: job.appActions.length + 1,
      date:  moment( ).format('YYYYMMDDTHH:mm:ss'),
      answer:true,
      text: answer
    }

    callback && callback(action)
  }
}

export function sendMsgJobApp(appId, msg, callback){
  return function( dispatch, getState ){

    var action = {
      id: 100,
      date:  moment( ).format('YYYYMMDDTHH:mm:ss'),
      text: msg,
      request:true,
      relevant:true
    }

    callback && callback(action)
  }
}

export function loadJob(jobId, callback){
  return function( dispatch, getState ){
    callback && callback( apiLoadJob( jobId ) )
  }
}

export function loadJobDetails(jobId, callback){
  return function( dispatch, getState ){
    callback && callback( apiLoadJob() )
  }
}

export function createJob(job, callback, action){
  return function( dispatch, getState ){

    //TODO save Job
    var jobId = 1;
    callback && callback( jobId )

    if(action != 'create'){
      var label = action === 'edit' ? 'edited' : 'created'

      globalActions.showHeaderNotification('Job has been ' + label + ' successfuly', 500)( dispatch, getState )
    }
  }
}


export function saveJob(jobId, callback ){
  return function( dispatch, getState ){
    //TODO call api
    var jobId = 1;
    callback && callback( )

    var savedJobs = getState().globalReducer.profileInfo.savedJobs || 0
    savedJobs++
    dispatch( globalActions.setGlobalProfileInfoAction({savedJobs}) )
    globalActions.showHeaderNotification('Job has been saved')( dispatch, getState )
  }
}


export function discardJob(jobId, callback ){
  return function( dispatch, getState ){
    //TODO call api
    var jobId = 1;
    callback && callback( )

    var appliedJobs = getState().globalReducer.profileInfo.appliedJobs || 0
    appliedJobs--
    dispatch( globalActions.setGlobalProfileInfoAction({appliedJobs}) )
    globalActions.showHeaderNotification('Job has been discarded')( dispatch, getState )
  }
}
//--- MOCK DATA ------------
//jobs = []

function apiLoadJobs(userId, page = 0, searchParams){
  console.log('Retrieving Jobs. page: ' + page)

//  if(page === 0)jobs = []

  var list = data.concat(data)

  var listWithId = list.map((item, i) => ({...item, id: page * 10 + i, userId: page * 10 + i}))

  var filters = ['saved', 'experienceId','author', 'locationId', 'equipmentId', 'applied', 'posted']

  if(searchParams){
    filters.forEach((filter) => {
      listWithId = applyFilter(filter, searchParams, listWithId)
    })
  }

    if(searchParams.limit){
      listWithId = listWithId.slice(0, searchParams.limit)
    }

//  jobs = jobs.concat(listWithId)
   return listWithId

}


function apiLoadJob(jobId){
  return {
    userName:'Marcos Naranjo',
    userid: 1,
    locationId:3,
    location: 'New York, NY',
    equipmentId: 2,
    equipment: 'Dump Truck',
    experienceId: 3,
    experience: '1 year',
    compensation: 'Compensation goes here',
    desc: 'We are looking for an experienced truck driver to serve our supply chain logistics department in a safe and timely manner.',
    requirements: 'Requirem goes here',
    responsabilities: 'Responsab goes here',
    benefits: 'Benefits goes here'
   }
}



function apiAnswerJobApp(appId, answer){
  // var job = jobs.filter(j => (j.id === appId))[0]
  // job.appActions.push({
  //   id: job.appActions.length + 1,
  //   date:  moment( ).format('YYYYMMDDTHHmmss'),
  //   answer:true,
  //   text: answer
  // })
  // return job
}

function applyFilter(filter, searchParams, list){
  var val = searchParams[filter]
  if(val){
    switch (filter) {
      case 'saved':
        return list.slice(0, 2)
      case 'applied':
          return list.map((job, i) => addAppActions(filter, job, i))
      case 'posted':
          return list.map((job, i) => addAppActions(filter, job, i))
      case 'experienceId':
        return list.filter((item) => (item[filter] <= val))
      case 'author': 
        return list.filter((item) => (item[filter] && item[filter].indexOf(val) >= 0))
      default:
        return list.filter((item) => (item[filter] === val))
    }
  }
  return list;
}

function addAppActions(filter, job, i){
  var appActions = this.appActions
  var actions = appActions.slice(0, i % (appActions.length + 1))

  if(filter === 'posted'){
    actions = actions.filter(app => app.relevant)
  }

  job.appActions = actions
  job.jobId = job.id
  return job
}

appActions = [
  {
  id:1,
  date:'20171101T15:23:45',
  text:'Application seen'
},
{
  id:2,
  date:'20171102T16:24:45',
  text:'Started reviewing'
},
{
  id:3,
  date:'20171103T17:25:45',
  text:'Information Requested: Please send a picture of your Id and Driver License to this email: titorobe@yahoo.com',
  request:true,
  relevant:true
},
{
  id:4,
  date:'20171104T18:26:45',
  answer:true,
  text:'Answer: Picture of ID and Driver License were sent to the provided email',
  relevant:true
},
{
  id:5,
  date:'20171105T19:27:45',
  text:'Answer seen'
},
{
  id:6,
  date:'20171106T20:28:45',
  request:true,
  text:'Information Requested: Need a copy of the insurance.',
  relevant:true
}
]
