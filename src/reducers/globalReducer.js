import I18n from 'react-native-i18n'

const initialState = {
  isLoading: false,
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
    profileImg:'',
    //-------------
    savedJobs: 0,
    appliedJobs: 0,
    postedJobs: 0,
    connections: 0,
    pendingRequest: 0,
    notifications:0
  },
  profileExperience:{
    completion: 0,
    equipmentId: 0,
    equipment: '',
    experienceId: 0,
    experience: '',
    ownerOperator:0,
    overRoadExp: 0,
    willTakeOverRoad: 0
  },
  config:{
    lang: I18n.currentLocale() &&  I18n.currentLocale().split('-')[0],
    equipmentOptions: [],
    experienceOptions: [],
    jobStatusOptions: [],
    roleOptions: [],
    hiringStatus: []
  },
  // notifications:{
  //
  // },
  view: {
    headerNotification: null
  }
};

export default function(state: any = initialState, action: Function) {

  switch (action.type) {
    case "IS_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "LOAD_CONFIG":
      return { ...state, config: {...state.config, ...action.config} };
    case 'SET_GLOBAL_PROFILE_INFO':
      return { ...state, profileInfo: {...state.profileInfo, ...action.profileInfo }};
    case 'SET_GLOBAL_PROFILE_EXPERIENCE':
      return { ...state, profileExperience: {...state.profileExperience , ...action.profileExperience} };
    case 'SHOW_HEADER_NOTIFICATION':
      return { ...state, view: {...state.view, headerNotification: action.headerNotification} };
    case 'UPDATE_NOTIFICATIONS':
      return { ...state, notifications: {...state.notifications, [action.notification]: action.value}};
    case 'SET_LANG':
      return { ...state, config: {...state.config, lang: action.lang}};
    default:
      return state;
  }
}
