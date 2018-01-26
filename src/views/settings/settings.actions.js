
import * as connector from 'src/reducers/connector'
import * as globalActions from 'src/reducers/globalActions'

export function contactUs(text, callback){
  return function( dispatch, getState ){
//TODO send hte userId from the globalReducer,

      globalActions.showHeaderNotification('Thanks for contacting us.')( dispatch, getState )
      callback && callback()
  }
}
