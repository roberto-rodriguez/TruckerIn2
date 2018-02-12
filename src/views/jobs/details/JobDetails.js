import React, { Component } from "react";
import { View  } from 'react-native';
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import {Row, Header, Text, Column, TransparentButton} from 'src/components/'
import * as jobActions from "src/views/jobs/jobs.actions";
import BulletsView from 'src/components/widgets/BulletsView'
import JobPost from 'src/views/jobs/JobPost'
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
        selectedTab: 0,
        data
      }
    }

  componentDidMount(){
    if(!this.state.data.id)return;
    var _this = this

     setTimeout(() => {
       this.props.loadJobDetails(this.state.data.id, (details) => {
         _this.setState(prevState => {
           prevState.data = {
             ...prevState.data,
             ...details
           }

           return prevState
         })
       })
     }, 100)
   }

  render() {
    const navigation = this.props.navigation;
    var {selectedTab, data} = this.state;

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t('jobs.details.title')}/>
        <Content fullscreen>
         <JobPost data={data} navigation={navigation}/>
        <View  >
           <Row style={{height:41, borderBottomWidth: 0.5, borderBottomColor:'grey'}}>
            {tabs.map(({title}, i) => (
              <Column columns={3} key={i}>
                <TransparentButton
                  text={I18n.t(['jobs','post', title])}
                  active={selectedTab === i}
                  handler={() => this.setState({...this.state, selectedTab: i})}/>
              </Column>
            )) }
           </Row>
           {data && (<BulletsView list={ [data[tabs[selectedTab].prop ] ] }/>)}
         </View>
        </Content>
      </Container>
    );
  }

}

export default connect(null, jobActions)(JobDetails);
