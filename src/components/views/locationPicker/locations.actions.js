
import * as connector from 'src/reducers/connector'
export const selectCityAction = (selectedCityId) => ({ type: 'SELECT_CITY', selectedCityId })
export const selectStateAction = (selectedStateId) => ({ type: 'SELECT_STATE', selectedStateId })
 

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

export function selectCity(cityId){
  return function( dispatch, getState ){
    dispatch( selectCityAction( cityId ) )
  }
}

export function selectState(selectedStateId){
  return function( dispatch, getState ){
    dispatch( selectStateAction( selectedStateId ) )
  }
}
