import React from 'react'
import { AsyncStorage } from 'react-native';

const langKey = '@TruckerIn:language'
const tokenKey = '@TruckerIn:token'
const jobsKey = '@TruckerIn:jobs'

export function storeLang(lang) {
  return AsyncStorage.multiSet([
      [langKey,lang]
  ])
}

export function storeToken(token) {
  var result = AsyncStorage.multiSet([
      [tokenKey, token]
  ])

  return result
}


export function storeJobs(jobs) {
  var result = AsyncStorage.multiSet([
      [jobsKey, jobs]
  ])
  return result
}

export function retrieveLocalStorageInfo() {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiGet([
      langKey
    ])
    .then(result => resolve({
      lang: result[0][1]
    }))
    .catch(ex => reject(ex))
  })
}

export function retrieveToken() {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiGet([ tokenKey ])
    .then(result => resolve({
      token: result[0][1]
    }))
    .catch(ex => reject(ex))
  })
}


export function retrieveJobs() {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiGet([ jobsKey ])
    .then(result => resolve({
      jobs: result[0][1]
    }))
    .catch(ex => reject(ex))
  })
}
