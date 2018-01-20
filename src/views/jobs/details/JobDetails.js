import React, { Component } from "react";
import { View  } from 'react-native';
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import {Row, Header, Text, Column, TransparentButton} from 'src/components/'
import * as jobActions from "src/views/jobs/jobs.actions";
import BulletsView from 'src/components/widgets/BulletsView'
import JobPost from 'src/views/jobs/JobPost'


const tabs = [
  {title: 'Requirements', prop: 'requirements'},
  {title: 'Responsabilities', prop: 'responsabilities'},
  {title: 'Benefits', prop: 'benefits'}
]

class JobDetails extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedTab: 0,
        data: {}
      }
    }

  componentDidMount(){
    var _this = this;
    var params = (this.props.navigation
                   && this.props.navigation.state
                   && this.props.navigation.state.params)

    var data = params.data

   if(params && data){
     this.setState(prevState => ({
       ...prevState,
       data
     }))

     setTimeout(() => {
       this.props.loadJobDetails(data.id, (details) => {
         _this.setState(prevState => {
           prevState.data = details
           return prevState
         })
       })
     }, 100)
   }

  }

  render() {
    debugger;
    const navigation = this.props.navigation;
    var {selectedTab, data} = this.state;

    return (
      <Container>
        <Header navigation={navigation} back title='Job Details'/>
        <Content fullscreen>
         <JobPost data={data} navigation={navigation}/>
         <View style={{backgroundColor: 'white'}}>
           <Row style={{height:50}}>
            {tabs.map(({title}, i) => (
              <Column columns={3} key={i}>
                <TransparentButton text={title} active={selectedTab === i} handler={() => this.setState({...this.state, selectedTab: i})}/>
              </Column>
            )) }
           </Row>
           <BulletsView list={ [data[tabs[selectedTab].prop ] ] }/>
         </View>
        </Content>
      </Container>
    );
  }

}

export default connect(null, jobActions)(JobDetails);
