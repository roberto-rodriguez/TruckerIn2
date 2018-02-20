import usStates from './usStates'

const initialState = {
  stateId: null,
  cityId: null,
  stateName: null,
  cityName: null,
  timestamp: null,

  stateIdList: [], //For MULTIPLE Modes
  cityIdList:[],
  cityList: [],

  usStates,
  usStatesObj: usStates.reduce((acc, st) => {acc[st.id] = st.name; return acc;}, {})
};

export default function(state: any = initialState, action: Function) {

  switch (action.type) {
    case "SET_CITY": return { ...state, cityId: action.cityId, cityName: action.cityName };
    case "SET_STATE": return { stateId: action.stateId, stateName: action.stateName, usStates, usStatesObj: state.usStatesObj, timestamp: (new Date()).getMilliseconds()  }; //intentionally removing city data
    case "SET_LOCATION": return {...state, ...(action.location || {}), timestamp: (new Date()).getMilliseconds() };

    case "ADD_STATE": // For MULTIPLE_STATES mode
        var selectedState = action.stateId + ''

        var existentStateIdList = (state.stateIdList || [])

        var stateIdList = existentStateIdList.filter(e => e != selectedState)

        if (stateIdList.length === existentStateIdList.length){ //If it didnt find it, then add it
          stateIdList.push( selectedState )
        }

       return {...state, stateIdList, timestamp: (new Date()).getMilliseconds() };

   case "ADD_CITY":  //For MULTIPLE_CITIES mode
       var selectedCityId = action.cityId + ''
       var selectedCityName = action.cityName

       var existentCityIdList = (state.cityIdList || [])
       var existentCityList = (state.cityList || [])

       var cityIdList = existentCityIdList.filter(e => e != selectedCityId)
       var cityList = existentCityList.filter(e => e != selectedCityName)

       if (cityIdList.length === existentCityIdList.length){ //If it didnt find it, then add it
         cityIdList.push( selectedCityId )
       }

       if (cityList.length === existentCityList.length){ //If it didnt find it, then add it
         cityList.push( selectedCityName )
       }

      return {...state, cityIdList, cityList, timestamp: (new Date()).getMilliseconds() };

    case "CLEAR_LOCATION": return initialState;
    default:
      return state;
  }
}
