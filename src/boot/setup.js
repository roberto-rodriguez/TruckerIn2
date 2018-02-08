import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider , View} from "native-base";

import App from "../App";
import configureStore from "./configureStore";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

import CustomI18N from './i18n/'

export default class Setup extends Component {
  state: {
    store: Object,
    //isReady: boolean
  };
  constructor() {
    super();
    this.state = { 
      store: configureStore(() => {})
    };
  }

  componentWillMount(){
    CustomI18N.start();
    global.primaryColor= '#0B3A42'
    global.secondaryColor='#629aa9'
  }

  render() {

    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={this.state.store}>
          <App />
        </Provider>
      </StyleProvider>
    );
  }
}
