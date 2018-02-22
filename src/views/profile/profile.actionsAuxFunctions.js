

import * as Connector from 'src/boot/reducers/connector'
import * as roles from 'src/components/c/Role'

export const saveProfileCareerAction = (userId,profileCareer) => ({ type: 'SAVE_PROFILE_CAREER', userId, profileCareer })

export function completeLoadProfile(userId, roleId, dispatch, getState){

  if( roleId === roles.DRIVER){

    if( getState().profileReducer[roleId] && getState().profileReducer[roleId].profileCareer){
      //If is already loaded, dont need to get it from server
      return;
    }

    setTimeout(() => Connector.doPOST('career/list', dispatch, getState, {limit: 4, params:{'usuario.id': userId}}, (careerHistory) => {
      if(careerHistory){
         careerHistory = careerHistory.reduce((acc, careerItem) => {
                                   acc[careerItem.id] = careerItem;
                                   return acc;
                                 }, {});
      }else{
        careerHistory = {}
      }

      dispatch( saveProfileCareerAction(userId, careerHistory) )
    }), 1000)
  }
}


export function completeProfileInfo(profileInfo, getState) {
  var roleOptions = getState().globalReducer.config.roleOptions

    if(profileInfo.roleId && roleOptions){
      var selectedConfig = roleOptions.filter(c => c.id === profileInfo.roleId)
      if(selectedConfig && selectedConfig.length > 0){
        profileInfo.role = selectedConfig[0].name
      }
    }
}

export function completeProfileExperience( profileExperience, getState) {
 debugger;
  ['equipment', 'experience', 'category', 'role', 'distance'].forEach( prop => {
    var config = getState().globalReducer.config[prop + 'OptionsObj']

    if(profileExperience[ prop + 'Id' ] &&  config){
        profileExperience[prop] = config[ profileExperience[ prop + 'Id' ] ]
    }
  })
}
