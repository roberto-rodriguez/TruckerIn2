
import * as connector from 'src/boot/reducers/connector'
import * as globalActions from 'src/boot/reducers/global.actions'

export function contactUs(text, callback){
  return function( dispatch, getState ){
//TODO send hte userId from the globalReducer,

      globalActions.showHeaderNotification('Thanks for contacting us.')( dispatch, getState )
      callback && callback()
  }
}
