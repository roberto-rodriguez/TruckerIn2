

import * as Connector from 'src/boot/reducers/connector'
import * as roles from 'src/components/c/Role'

export const saveProfileCareerAction = (profileCareer) => ({ type: 'SAVE_PROFILE_CAREER', profileCareer })

export function completeLoadProfile(userId, roleId, dispatch, getState){
  debugger;
  if( roleId === roles.DRIVER){
      Connector.doPOST('career/list', dispatch, getState, {limit: 3, params:{'usuario.id': userId}}, (careerHistory) => {
        if(careerHistory){
           careerHistory = careerHistory.reduce((acc, careerItem) => {
                                     acc[careerItem.id] = careerItem;
                                     return acc;
                                   }, {});
        }else{
          careerHistory = {}
        }

        dispatch( saveProfileCareerAction(careerHistory) )
      })
//     var profileCareer = apiGetCareer(userId)
//
//     if(profileCareer.careerHistory){
//       profileCareer.careerHistory = profileCareer.careerHistory.reduce((acc, careerItem) => {
//                                        acc[careerItem.id] = careerItem;
//                                        return acc;
//                                      }, {});
//     }else{
//       profileCareer.careerHistory = {}
//     }
//
//     dispatch( saveProfileCareerAction(profileCareer) )
//
//
//     loadProfileConnections(userId)(dispatch, getState)
//
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

export function completeProfileExperience(roleId, profileExperience, getState) {
  ['equipment', 'experience', 'jobStatus'].forEach( prop => {
    var config = getState().globalReducer.config[prop + 'Options']

    if(roleId != 1){
      config = getState().globalReducer.configs['hiringStatusOptions']
    }

    if(config){
      var selectedConfig = config.filter(c => c.id === profileExperience[prop + 'Id'])
      if(selectedConfig && selectedConfig.length > 0){
        profileExperience[prop] = selectedConfig[0].name
      }
    }
  })
}