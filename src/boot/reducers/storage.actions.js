import React from 'react'
import { AsyncStorage } from 'react-native';

const langKey = '@TruckerIn:language'
const tokenKey = '@TruckerIn:token'

export function storeLang(lang) {
  return AsyncStorage.multiSet([
      [langKey,lang]
  ])
}

export function storeToken(token) {
  debugger;
  var result = AsyncStorage.multiSet([
      [tokenKey, token]
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
