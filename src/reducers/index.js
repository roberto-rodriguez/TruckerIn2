import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import settingsReducer from "src/views/settings/reducer";
import globalReducer from "./globalReducer";
import profileReducer from "src/views/profile/reducer/profileReducer";

export default combineReducers({
  form: formReducer,
  settingsReducer,
  globalReducer,
  profileReducer
});
