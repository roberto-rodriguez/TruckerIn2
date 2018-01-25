const initialState = {
  selectedCityId: null,
  selectedStateId: null
};

export default function(state: any = initialState, action: Function) {

  switch (action.type) {
    case "SELECT_CITY": return { ...state, selectedCityId: action.selectedCityId };
    case "SELECT_STATE": return { ...state, selectedStateId: action.selectedStateId }; 
    default:
      return state;
  }
}
