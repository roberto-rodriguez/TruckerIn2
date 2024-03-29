import I18n from 'react-native-i18n'


const initialState = {
  profileInfo:{
    id:0,
    userId:0,
    completion: 0,
    phone: '',
    email: '',
    firstName: '',
    lastName:'',
    roleId:0,
    role:'',
    location: null,
    profileImg:'',
    savedJobs: 0,
    appliedJobs: 0,
    postedJobs: 0,
    connections: 0,
    pendingRequest: 0,
    notifications:0
  },
  profileExperience:{
  //  completion: 0,
    equipment: '',
    equipmentId: 0,
    experience: '',
    experienceId: 0,
    category: '',
    categoryId: 0,
    distance: '',
    distanceId: 0,
  //  ownerOperator:0,
  //  jobStatusId: 1,
  //  jobStatus: '',
    about:''
  },
  config:{
    lang: I18n.currentLocale() &&  I18n.currentLocale().split('-')[0],
    // categoryOptions: [],
    // equipmentOptions: [],  // [{id: 1, name: "Dump Truck"}, {id: 2, name: "Tractor (Long Haul)"},{id: 3, name: "Dry Van"}, {id: 4, name: "Auto Hauler"},{id:5, name:  "Flat Bed"}, {id: 6, name:  "Refrigerated"}, {id: 7, name: "Tanker"}],
    // experienceOptions: [], // [{id: 1, name: '1 Year'}, {id: 2, name: '2 Years'}],
    // jobStatusOptions: [],
    // hiringStatusOptions: [],
    // roleOptions: [],
    // distanceOptions: [],

    categoryOptionsObj: {},
    equipmentOptionsObj: {},
    experienceOptionsObj: {},
    // jobStatusOptionObj: {},
    // hiringStatusOptionsObj: {},
    roleOptionsObj: {},
    distanceOptionsObj: {}
  },
  // notifications:{
  //
  // },
  view: {
    headerNotification: null,
    headerError: null,
    headerTimestamp: null
  }
};

export default function(state: any = initialState, action: Function) {

  switch (action.type) {
    case "RESET_GLOBAL":
        return {...initialState, config: state.config};
    case "LOAD_CONFIG":
      return { ...state, config: {...state.config, ...action.config}};
    case 'SET_GLOBAL_PROFILE_INFO':
      return { ...state, profileInfo: {...state.profileInfo, ...action.profileInfo }};
    case 'SET_GLOBAL_PROFILE_EXPERIENCE':
      return { ...state, profileExperience: {...state.profileExperience , ...action.profileExperience} };
    case 'SHOW_HEADER_NOTIFICATION':
      return { ...state, view: {...state.view, headerNotification: action.headerNotification} };
    case 'SHOW_HEADER_ERROR':
      return { ...state, view: {...state.view, headerError: action.headerError, headerTimestamp: (new Date()).getMilliseconds()} }; //headerTimestamp is to make hte page refresh even if is the same error
    case 'UPDATE_NOTIFICATIONS':
      return { ...state, notifications: {...state.notifications, [action.notification]: action.value}};
    case 'SET_LANG':
      return { ...state, config: {...state.config, lang: action.lang}};
    default:
      return state;
  }
}
