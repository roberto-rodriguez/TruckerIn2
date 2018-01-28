import { combineReducers } from "redux";

import globalReducer from "./global.reducer";
import profileReducer from "src/views/profile/reducer/profileReducer";
import locationReducer from "src/components/views/locationPicker/locationReducer";

export default combineReducers({
  globalReducer,
  profileReducer,
  locationReducer
});
