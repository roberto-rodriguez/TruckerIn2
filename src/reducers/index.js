import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import settingsReducer from "src/views/settings/reducer";
import globalReducer from "./globalReducer";
import profileReducer from "src/views/profile/reducer/profileReducer";
import locationReducer from "src/components/views/locationPicker/locationReducer";

export default combineReducers({
  form: formReducer,
  settingsReducer,
  globalReducer,
  profileReducer,
  locationReducer
});
