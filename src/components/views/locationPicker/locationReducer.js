import usStates from './usStates'

const initialState = {
  stateId: null,
  stateIdList: [], //For MULTIPLE_STATE mode
  cityId: null,
  stateName: null,
  cityName: null,
  timestamp: null,
  usStates,
  usStatesObj: usStates.reduce((acc, st) => {acc[st.id] = st.name; return acc;}, {})
};

export default function(state: any = initialState, action: Function) {

  switch (action.type) {
    case "SET_CITY": return { ...state, cityId: action.cityId, cityName: action.cityName };
    case "SET_STATE": return { stateId: action.stateId, stateName: action.stateName, usStates }; //intentionally removing city data
    case "SET_LOCATION": return {...state, ...(action.location || {}), timestamp: (new Date()).getMilliseconds() };

    case "ADD_STATE":
        var selectedState = action.stateId + ''

        var stateIdList = state.stateIdList.filter(e => e != selectedState)

        if (stateIdList.length === state.stateIdList.length){ //If it didnt find it, then add it
          stateIdList.push( selectedState )
        }

       return {...state, stateIdList, timestamp: (new Date()).getMilliseconds() };

    case "CLEAR_LOCATION": return initialState;
    default:
      return state;
  }
}
