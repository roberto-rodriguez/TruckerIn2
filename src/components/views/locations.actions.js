
import * as connector from 'src/reducers/connector'


export function listCities(text, callback){
  return function( dispatch, getState ){

    connector.doGET('listCities?state=HUE-22', dispatch, getState, function( response ){
      if(response){
        var cities = response.map((name, i) => ({name, id: 1}))
           callback && callback(cities)
      }else{
        alert('No response receivedd')
      }

    })
  }
}

function apiListStates(text){
  var list = Object.keys(states).map(k => ({id: k, name:states[k]}))

  if(text){
    return list.filter((o) => o.name.indexOf( text ) >= 0)
  }else{
    return list
  }
}
