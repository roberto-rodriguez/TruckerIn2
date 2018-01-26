
import * as connector from 'src/reducers/connector'
import * as globalActions from 'src/reducers/globalActions'

export const setCityAction = (cityId, cityName) => ({ type: 'SET_CITY', cityId, cityName })
export const setStateAction = (stateId, stateName) => ({ type: 'SET_STATE', stateId , stateName})
export const setLocationAction = (location) => ({ type: 'SET_LOCATION', location })
export const clearLocationAction = () => ({ type: 'CLEAR_LOCATION'})



export function listCities(text, callback){
  return function( dispatch, getState ){
      connector.doGET('listCities?state=HUE-22', dispatch, getState, function( response ){
        if(response){
          var cities = response.map((name, i) => ({name, id: i + 1}))
             callback && callback(cities)
        }else{
          alert('No response receivedd')
        }
      })
  }
}

export function selectCity(cityId, city){
  return function( dispatch, getState ){
    dispatch( setCityAction( cityId, city ) )
  }
}

export function selectState(stateId, state){
  return function( dispatch, getState ){
    dispatch( setStateAction( stateId, state ) )
  }
}

export function setLocation(location){
  return function( dispatch, getState ){
    dispatch( setLocationAction( location ) )
  }
}

export function clearLocation(){
  return function( dispatch, getState ){
    dispatch( clearLocationAction( ) )
  }
}

export function showGuidance(){
  return function( dispatch, getState ){
      globalActions.showHeaderNotification('You can swipe to change between states and cities.')( dispatch, getState )
  }
}
