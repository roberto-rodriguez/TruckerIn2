const initialState = {

  connectionsCount: 0,
  location:'',
  locationId: null,
  profileInfo:{
    id:0,
    userId:0,
    completion: 0,
    phone: '',
    email: '',
    firstName: '',
    lastName:'',
    releId:0,
    role:'',
    locationId:0,
    location: '',
    jobStatusId: 1,
    jobStatus: '',
    showPersonalInfo:1
  },
  profileExperience:{
    completion: 0,
    equipmentId: 0,
    equipment: '',
    experienceId: 0,
    experience: '',
    ownerOperator:0,
    cdl: 0,
    overRoadExp: 0,
    willTakeOverRoad: 0,
    carAccident: 0,
    dui:0
  },
  profileCareer:{
    completion: 0,
    careerHistory:{}
  },
  connections:[]
};
export default function(state: any = initialState, action: Function) {

  switch (action.type) {
    case "RESET_PROFILE":
        return initialState;

    case "SAVE_PROFILE_INFO":
        return { ...state, profileInfo: {...state.profileInfo, ...action.profileInfo} };

    case "SAVE_PROFILE_EXPERIENCE":
        return { ...state, profileExperience: action.profileExperience };

    case "SAVE_PROFILE_CAREER":
        return { ...state, profileCareer: action.profileCareer };

    case "SAVE_PROFILE_CONNECTIONS":
        return { ...state, connections: action.list};

    case "SAVE_PROFILE_CAREER_ITEM":
        return { ...state,
                profileCareer: {
                        completion: 100,
                        careerHistory: {
                          ...state.profileCareer.careerHistory,
                          [action.profileCareerItem.id]: action.profileCareerItem
                        }
                }};
    case "DELETE_PROFILE_CAREER_ITEM":
      var careerHistory = state.profileCareer.careerHistory
      delete careerHistory[action.id]

        return { ...state,
                profileCareer: {
                        careerHistory,
                        completion: Object.keys(careerHistory).length == 0 ? 0 : 100
                }};

    default:
      return state;
  }
}
