const initialState = {
  stateId: null,
  cityId: null,
  stateName: null,
  cityName: null,
  timestamp: null
};

export default function(state: any = initialState, action: Function) {

  switch (action.type) {
    case "SET_CITY": return { ...state, cityId: action.cityId, cityName: action.cityName };
    case "SET_STATE": return { stateId: action.stateId, stateName: action.stateName }; //intentionally removing city data
    case "SET_LOCATION": return {...(action.location || {}), timestamp: (new Date()).getMilliseconds() };

    case "CLEAR_LOCATION": return initialState;
    default:
      return state;
  }
}
