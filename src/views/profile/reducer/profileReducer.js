const initialState = {

};
export default function(state: any = initialState, action: Function) {
  var userId = action.userId
  var user = state[userId] || {}

  switch (action.type) {
    case "RESET_PROFILE":
        return {};

    case "SAVE_PROFILE_INFO":
        var newProfileInfo = {...(user.profileInfo || {}), ...action.profileInfo}

        return { ...state, [userId]: {...user, profileInfo: newProfileInfo } }

    case "SAVE_PROFILE_EXPERIENCE":
        var newExperience= {...(user.profileExperience || {}), ...action.profileExperience}

       return { ...state, [userId]: {...user, profileExperience: newExperience } }

    case "SAVE_PROFILE_CAREER":
        return { ...state, [userId]: {...user, profileCareer: action.profileCareer } }

    case "SAVE_PROFILE_CAREER_ITEM":

           return { ...state, [userId]: {...user, profileCareer: {
             ...user.profileCareer,
             [action.profileCareerItem.id]: action.profileCareerItem
            }
            }};
    case "DELETE_PROFILE_CAREER_ITEM":
      var profileCareer = user.profileCareer || {}
      delete profileCareer[action.id]

      return { ...state, [userId]: {...user, profileCareer: { ...profileCareer }  } } 


    // case "SAVE_PROFILE_POSTED_JOBS":
    //     return { ...state, postedJobs: (action.list || [])};

    default:
      return state;
  }
}
