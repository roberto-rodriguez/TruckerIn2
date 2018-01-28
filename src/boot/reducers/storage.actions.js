import React from 'react'
import { AsyncStorage } from 'react-native';

const langKey = '@TruckerIn:language'

export function storeLang(lang) {
  return AsyncStorage.multiSet([
      [langKey,lang]
  ])
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
