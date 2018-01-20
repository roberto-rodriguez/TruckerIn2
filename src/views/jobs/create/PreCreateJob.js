
import React, { Component } from "react";
import { StyleSheet,Image,View , Text } from 'react-native';
import { Container, Content, Button,Thumbnail} from "native-base";
import Icon from 'react-native-fa-icons';
import {Row, Header, T18, CustomButton, T13, T14, T16, T15,ListItem, AgentImg } from 'src/components/'
import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";
import * as globalActions from "src/reducers/globalActions";

class PreCreateJob extends Component {

  constructor(props) {
      super(props)

      this.state = {
        created: false,
        jobId: null
      }
}

onCreate = (jobId) => {
  debugger;
  this.setState({
    created: true,
    jobId
  })
}

  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <Header navigation={navigation} back title={'Create Job'}/>

        {this.state.created ? this.postCreate(navigation) : this.preCreate(navigation)}

      </Container>
    );
  }

  preCreate = (navigation) => (
    <Content fullscreen contentContainerStyle={styles.container}>
      <AgentImg text={'Want to create a Job?'}/>

      <T15 green  style={{marginTop:10, marginBottom:20}}>Is very easy...</T15>

      <ListItem
        borderTop
        icon={'hand-o-right'}
        value={'Create a new Job'}
        navigation={navigation}
        routeName={'CreateJob'}
        params={{callback: this.onCreate}}
      />

      <T14 green  style={{margin:10}}>If you have created a Job before, you can take one of those as starting point, and <T14 strong green>COPY IT</T14></T14>

      <ListItem
        borderTop
        icon={'hand-o-right'}
        navigation={navigation}
        routeName={'PostedJobs'}
        value={'See my posted Jobs'}
      />


    </Content>
  )

postCreate = (navigation) => (
  <Content fullscreen contentContainerStyle={styles.container}>
    <AgentImg text={'Job Created Successfuly'}/>

    <T14 green  style={{margin:10}}>From now you can follow the applications here:</T14>

    <ListItem
      borderTop
      icon={'hand-o-right'}
      navigation={navigation}
      routeName={'PostedJobs'}
      value={'See all my posted Jobs'}
    />

    <T14 green  style={{margin:10}}>Or you can copy it, in case you want to create a new Job taking information from this one:</T14>

    <ListItem
      borderTop
      icon={'hand-o-right'}
      value={'Copy and create a new Job'}
      navigation={navigation}
      routeName={'CreateJob'}
      params={{callback: this.onCreate, action: 'copy', jobId: this.state.jobId}}
    />
    <ListItem
      icon={'hand-o-right'}
      value={'Create a new Job'}
      navigation={navigation}
      routeName={'CreateJob'}
      params={{callback: this.onCreate}}
    />
  </Content>
)
}


const styles = StyleSheet.create({
    container:{
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal:20
    },
    thumbnail: {
      borderWidth:0.2,
      borderColor:theme.secondaryColor,
      margin: 20
    }
    })


    const mapStateToProps = state => ({

    });
    export default connect(mapStateToProps, globalActions)(PreCreateJob);
