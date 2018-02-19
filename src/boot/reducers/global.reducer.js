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
    completion: 0,
    equipmentId: 0,
    equipment: '',
    experienceId: 0,
    experience: '',
    ownerOperator:0,
    jobStatusId: 1,
    jobStatus: '',
    about:''
  },
  config:{
    lang: I18n.currentLocale() &&  I18n.currentLocale().split('-')[0],
    categoryOptions: [],
    equipmentOptions: [],
    experienceOptions: [],
    jobStatusOptions: [],
    hiringStatusOptions: [],
    roleOptions: [],
    distanceOptions: [],

    categoryOptionsObj: {},
    equipmentOptionsObj: {},
    experienceOptionsObj: {},
    jobStatusOptionObj: {},
    hiringStatusOptionsObj: {},
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
        var config = {...action.config}

        Object.keys(config).forEach(optionsKey => {config[optionsKey + 'Obj'] = config[optionsKey].reduce((acc, elem) => {acc[elem.id] = elem.name
                                       return acc;
                                     }, {})
									 })

      return { ...state, config: {...state.config, ...config} };
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
