import React, { Component } from "react";
import { StyleSheet, TextInput, Text, View} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {Row, Header, PlainListItem} from 'src/components/'
const secondaryColor = require("src/theme/variables/commonColor").secondaryColor;
import I18n from 'react-native-i18n'

class TextInputView extends Component {

  constructor(props){
    super(props)

    this.state = {
        text: ''
      }
   }

  componentDidMount(){
    var props = this.props;
    (props
    && props.navigation
    && props.navigation.state
    && props.navigation.state.params
    && props.navigation.state.params.text
    && this.setState({text: props.navigation.state.params.text}))
  }

  render() {
    const navigation = this.props.navigation;
    var title = this.props.navigation.state.params.title
    var text = this.state.text;

    return (
      <Container>
        <Header navigation={navigation} back title={title}/>
        <Content fullscreen >

          <TextInput
              underlineColorAndroid='transparent'
             style={{textAlign:'left', padding:20, textAlignVertical: 'top'}}
              placeholder={I18n.t('general.typeHere')}
              multiline={true}
              numberOfLines={20}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}/>

         </Content>
         <View style={{backgroundColor:'white'}}>
            <Button block rounded style={styles.button} onPress={() => this.onAccept()}>
                <Text style={{color: 'white'}}>{I18n.t('cmp.accept')}</Text>
            </Button>
          </View>
      </Container>
    );
  }

  onAccept(){
    this.props.navigation.state.params.callback(this.state.text);
    this.props.navigation.goBack();
  }
}


const styles = StyleSheet.create({
  button:{backgroundColor: secondaryColor,
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: 15
  }
  })

export default TextInputView;
