import moment from 'moment';
import { formatDate} from 'src/components/'
import I18n from 'react-native-i18n'
import data from './list/data'
import * as Storage from 'src/boot/reducers/storage.actions'
import * as Connector from 'src/boot/reducers/connector'
import * as globalActions from 'src/boot/reducers/global.actions'

export function cachedJobList(callback){
    return function( dispatch, getState ){

      Storage.retrieveJobs().then(data => {
          var jobs = JSON.parse( (data && data.jobs) || '[]' )
          callback( jobs )
       })
    }
}

export function xJobList(page = 0, callback, reset){
    return function( dispatch, getState ){

      var params = {
      	page,
      	"limit": 10,
      	"experienceId": 3,
      	"equipmentId": "2",
      	"categoryId": 1,
      	"distanceId": 1,
      	"stateId": "FL",
      	"cityId": 1
      }

      Connector.doPOST('xjob/xlist', dispatch, getState, params,  (jobs) => {
        var usStatesObj = getState().locationReducer.usStatesObj
        var {categoryOptionsObj, distanceOptionsObj, equipmentOptionsObj, experienceOptionsObj}  = getState().globalReducer.config
 
        jobs = jobs.map(job => ({
          ...job,
          states: job.stateIds.split(',').map(s => (usStatesObj[s])).join(' • '),
          category: categoryOptionsObj ? categoryOptionsObj[job.categoryId] : '',
          distance: distanceOptionsObj ? distanceOptionsObj[job.distanceId] : '',
          equipments: equipmentOptionsObj ? job.equipmentIds.split(',').map(s => (equipmentOptionsObj[s])).join(' • ') : '',
          experience: experienceOptionsObj ? experienceOptionsObj[job.experienceId] : ''
        }))

        callback(jobs, reset)

        var jobsToCach = JSON.stringify( (jobs && jobs.slice(0, 2)) || [] )
        Storage.storeJobs( jobsToCach )
      })
    }
}



export function searchJobs(page = 0, requestParams, callback, reset){
    return function( dispatch, getState ){

      var params = {}

      if(requestParams){
        if(requestParams.equipmentId){
          params.equipmentId = requestParams.equipmentId
        }

        if(requestParams.experienceId){
           params.experienceId = requestParams.experienceId
        }

        if(requestParams.author){
          params['author.firstName@or@author.lastName'] = requestParams.author
        }

        if(requestParams.location){
          if(requestParams.location.stateId && requestParams.location.stateId !== 'US'){
            params.stateId = requestParams.location.stateId

            if( requestParams.location.cityId){
              params.cityId = requestParams.location.cityId
            }
          }

        }
      }

      listJobs(page, params, callback, reset)( dispatch, getState )
    }
}

export function listJobs(page = 0, params, callback, reset){
  return function( dispatch, getState ){

   var request = { limit: 10, params,  page }

   Connector.doPOST('job/list', dispatch, getState, request,  (jobs) => callback(jobs, reset))
  }
}


export function listSavedJobs(page = 0, params, callback, reset){
  return function( dispatch, getState ){

   var request = { limit: 10, params,  page }

   Connector.doPOST('savedJob/list', dispatch, getState, request,  (jobs) => callback(jobs, reset))
  }
}

export function listApps(page = 0, params, callback, reset, limit){
  return function( dispatch, getState ){

   var request = { limit: 5, params, page }

   Connector.doPOST('app/list', dispatch, getState, request,  (apps) => {

       if(params['applicant.id']){
       apps && apps.forEach( (app, i) => {
         var seenAction = {
           id: i,
           createdAt: app.seenTime,
           description:  I18n.t(['jobs', 'applied', app.seenTime ? 'seen' : 'notSeen'])
         }

         if(!app.appActions){
            app.appActions = [seenAction]
         }else{
            app.appActions = [seenAction, ...app.appActions]
         }
       })
    }

     callback(apps, reset)
   })

  }
}

export function jobApply(jobId,  callback){
  return function( dispatch, getState ){
    var userId =  getState().globalReducer.profileInfo.id

    Connector.doPOST('/app/save', dispatch, getState, {userId, jobId},
      () => callback(true),
      (errorMsg) => callback(false, errorMsg)  //callback Error
    )

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

export function sendMsgJobApp(appAction, callback){
  return function( dispatch, getState ){

    Connector.doPOST('/appAction/save', dispatch, getState, appAction, callback)
  }
}

export function loadJobDetails(jobId, callback){
  return function( dispatch, getState ){
    var userId =  getState().globalReducer.profileInfo.id
    Connector.doGET('job/load/' + userId + '/' + jobId, dispatch, getState, (job) => callback( job ))
  }
}

export function createJob(job, callback, action){
  return function( dispatch, getState ){

    var userId = getState().globalReducer.profileInfo.id

    job.authorId = userId;
    var isUpdating = job.id

    Connector.doPOST('/job/save', dispatch, getState, job, function( jobId ){
      if(jobId){
        job.id = jobId

        if(action != 'create'){
          var label = action === 'edit' ? 'edited' : 'created'

          globalActions.showHeaderNotification(I18n.t('jobs.actions.jobHas') + label + I18n.t('jobs.actions.successfuly'), 500)( dispatch, getState )
         }

         if(!isUpdating){
           var postedJobs = getState().globalReducer.profileInfo.postedJobs || 0
           postedJobs++
           dispatch( globalActions.setGlobalProfileInfoAction({postedJobs}) )
         }

        callback( job )
      }
    })
}
}


export function saveJob(jobId, callback ){
  return function( dispatch, getState ){
      var userId = getState().globalReducer.profileInfo.id

    Connector.doPOST('/savedJob/save', dispatch, getState, {userId, jobId},
      () => {
          var savedJobs = getState().globalReducer.profileInfo.savedJobs || 0
          savedJobs++
          dispatch( globalActions.setGlobalProfileInfoAction({savedJobs}) )
          globalActions.showHeaderNotification(I18n.t('jobs.actions.saved'))( dispatch, getState )

      }
    )

  }
}

//To use for the applicant
export function discardApp(appId, callback ){
  return function( dispatch, getState ){

    Connector.doPOST('/app/save', dispatch, getState, {id: appId, discarded: true},
      () => {
          var appliedJobs = getState().globalReducer.profileInfo.appliedJobs || 0
          appliedJobs--
          dispatch( globalActions.setGlobalProfileInfoAction({appliedJobs}) )
          globalActions.showHeaderNotification(I18n.t('jobs.actions.discarded'))( dispatch, getState )
          callback()
      }
    )
  }
}


//To use for the employer
export function rejectApp(appId, callback ){
  return function( dispatch, getState ){

    Connector.doPOST('/app/save', dispatch, getState, {id: appId, rejected: true},
      () => {
          globalActions.showHeaderNotification(I18n.t('jobs.actions.rejected'))( dispatch, getState )
          callback()
      }
    )
  }
}

export function deleteSavedJob(jobId, callback ){
  return function( dispatch, getState ){
    var userId = getState().globalReducer.profileInfo.id

    Connector.doGET('savedJob/deleteSavedJob/' + userId + '/' + jobId, dispatch, getState, () => {
      globalActions.showHeaderNotification(I18n.t('jobs.actions.discarded'))( dispatch, getState )
      var savedJobs = getState().globalReducer.profileInfo.savedJobs || 0
      savedJobs && savedJobs--
      dispatch( globalActions.setGlobalProfileInfoAction({savedJobs}) )
      callback()
    } )
  }
}

export function deleteJob(id, callback, action){
  return function( dispatch, getState ){


    Connector.doPOST('/job/save', dispatch, getState, {id, deleted: true}, () => {

        var postedJobs = getState().globalReducer.profileInfo.postedJobs || 0
        postedJobs--
        dispatch( globalActions.setGlobalProfileInfoAction({postedJobs}) )
        globalActions.showHeaderNotification(I18n.t('jobs.actions.deleted'))( dispatch, getState )
        callback()
    })
}
}
//--- MOCK DATA ------------
//jobs = []

function apiLoadJobs(userId, page = 0, searchParams){
  console.log('Retrieving Jobs. page: ' + page)

//  if(page === 0)jobs = []

  var list = data.concat(data)

  var listWithId = list.map((item, i) => ({...item, id: page * 10 + i}))  //, userId: page * 10 + i

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
          return list.map((job, i) => ({...job, appTime: (new Date()).getTime() - (i * 1000000000)})).map((job, i) => addAppActions(filter, job, i))
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
  createdAt: 1517085498990,
  text:'Application seen'
},
{
  id:2,
  createdAt: 1517085498990,
  text:'Started reviewing'
},
{
  id:3,
  createdAt: 1517085498990,
  text:'Information Requested: Please send a picture of your Id and Driver License to this email: titorobe@yahoo.com',
  request:true,
  relevant:true
},
{
  id:4,
  createdAt: 1517085498990,
  answer:true,
  text:'Answer: Picture of ID and Driver License were sent to the provided email',
  relevant:true
},
{
  id:5,
  createdAt: 1517085498990,
  text:'Answer seen'
},
{
  id:6,
  createdAt: 1517085498990,
  request:true,
  text:'Information Requested: Need a copy of the insurance.',
  relevant:true
}
]
