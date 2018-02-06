import React, { Component } from "react";
import { Container, Content, Spinner } from "native-base";
import { Header, BlockButton} from 'src/components/'
import theme from 'src/theme/variables/platform'

class StackView extends Component {

  constructor(props) {
      super(props)

      this.state = {
        accepted: false
     }
 }

 onAccept = () => {
   if(this.state.accepted)return;

   this.setState({accepted: true})

   if(this.props.onAccept()){
     setTimeout(() =>  this.setState({accepted: false}), 2000)
   }
 }

  render() {
    const {navigation, title, buttonText, headerBtn } = this.props;

    return (
      <Container white>
        <Header navigation={navigation} back title={title} right={headerBtn}/>
        <Content fullscreen >
          {this.props.children}
        </Content>
        {this.props.onAccept && (this.state.accepted ? <Spinner color={theme.secondaryColor} /> : <BlockButton text={buttonText}  onPress={this.onAccept}/>) }
      </Container>
    );
  }
}



export default StackView;
