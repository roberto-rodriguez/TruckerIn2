import React, { Component } from "react";
import { View  } from 'react-native';
import { Container, Content, Spinner } from "native-base";
import { connect } from "react-redux";
import {Row, Header, Text, Column, TransparentButton} from 'src/components/'
import * as jobActions from "src/views/jobs/jobs.actions";
import BulletsView from 'src/components/widgets/BulletsView'
import JobPost from 'src/views/jobs/post/JobPost'
import Details from 'src/views/jobs/post/Details'
import I18n from 'react-native-i18n'

const tabs = [
  {title: 'req', prop: 'requirements'},
  {title: 'resp', prop: 'responsabilities'},
  {title: 'benefits', prop: 'benefits'}
]

class JobDetails extends Component {
  constructor(props) {
      super(props);

       var data = this.props.navigation.state
               && this.props.navigation.state.params
               && this.props.navigation.state.params.data

      this.state = {
        data,
        details: null
      }
    }

  componentDidMount(){
    if(!this.state.data.id)return;
    var _this = this
debugger;
     setTimeout(() => {
       this.props.loadJobDetails(this.state.data.id, (details) => this.setState({details}))
     }, 200)
   }

  render() {
    const navigation = this.props.navigation;
    var {details, data} = this.state;

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t('jobs.details.title')}/>
        <Content fullscreen>
           <JobPost data={data} navigation={navigation}>
             {details ? ( <Details data={details}/>) : ( <Spinner color={'#629aa9'}/>)}
           </JobPost>
        </Content>
      </Container>
    );
  }

}

export default connect(null, jobActions)(JobDetails);
