import React, { Component } from "react";
import { Container, Content } from "native-base";
import { Header, BlockButton} from 'src/components/'
import theme from 'src/theme/variables/platform'

class StackView extends Component {

  render() {
    const {navigation, title, buttonText, onAccept, headerBtn } = this.props;

    return (
      <Container white>
        <Header navigation={navigation} back title={title} right={headerBtn}/>
        <Content fullscreen >
          {this.props.children}
        </Content>
        {onAccept && <BlockButton text={buttonText}  onPress={onAccept}/>}
      </Container>
    );
  }
}



export default StackView;
