
import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';
import { Container, Content, Button} from "native-base";
import { RowColumn, Column,Row, Header, BlockButton, T11, T12, T13,T14, AgentImg, ListItem, SimpleListItem } from 'src/components/'
import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";
import * as jobActions from "src/views/jobs/jobs.actions";
import I18n from 'react-native-i18n'

class JobApp extends Component {

  constructor(props) {
      super(props)

      this.state = {
        loading: false,
        submitted: false,
        appSuccess: null,
        resultMsg: ''
      }
}

  jobApply = () => {
   var jobId = this.props.navigation.state.params.jobId
   var _this = this

   this.setState({loading: true})

   this.props.jobApply(jobId,  (success, resultMsg) => {
     _this.setState((prevState) => {
       prevState['appSuccess'] = success;
       prevState['resultMsg'] = resultMsg;
       prevState['submitted'] = true;
       prevState['loading'] = false;
       return prevState;
     })
   })
  }


  render() {
    const {navigation } = this.props;

    var {submitted, appSuccess, resultMsg, loading} = this.state;

    return (
      <Container white>
        <Header navigation={navigation} back title={I18n.t('jobs.app.title')}/>
        <Content fullscreen contentContainerStyle={styles.container}>

         {submitted ? this.postApplyView(navigation, appSuccess, resultMsg)
           : this.preApplyView(navigation )}

        </Content>
        {
          submitted ? <BlockButton loading={loading} text={I18n.t('jobs.app.goBack')} onPress={()=> navigation.goBack()}/>
                    : <BlockButton loading={loading} text={I18n.t('jobs.app.apply')} onPress={this.jobApply}/>
        }
      </Container>
    );
  }

  preApplyView = (navigation) => (
    <View>
      <AgentImg text={I18n.t('jobs.app.infoWillBeShared1')} text2={I18n.t('jobs.app.infoWillBeShared2')}/>

      <SimpleListItem
        icon={'user-circle-o'}
        navigation={navigation}
        borderTop
        routeName={'EditProfileInformation'}
        params={{hidePrivacityOption: true}}
        label={I18n.t('jobs.app.personalInfo')}
      />

      <SimpleListItem
        icon={'truck'}
        navigation={navigation}
        routeName={'EditProfileExperience'}
        label={I18n.t('profile.titles.experience')}
      />

      <SimpleListItem
        icon={'graduation-cap'}
        navigation={navigation}
        routeName={'ProfileCareerList'}
        params={{isMe: true}}
        label={I18n.t('jobs.app.career')}
      />

    <RowColumn>
      <T11 grey >{ I18n.t('jobs.app.disclosure')}</T11>
    </RowColumn>

    </View>
  )

  postApplyView = (navigation, appSuccess, resultMsg) => (
    <View>
      <AgentImg red={!appSuccess} text={appSuccess ? I18n.t('jobs.app.appSent') : I18n.t('jobs.app.appFailed')}
        text2={appSuccess ? I18n.t('general.successfuly') : ' '}/>

      {
        appSuccess ?
        (<View>
            <T14 green style={{margin:10}}> {I18n.t('jobs.app.followUp')} <T14 green strong> {I18n.t('jobs.app.jobsAppSection')}</T14></T14>

            <ListItem
              icon={'graduation-cap'}
              navigation={navigation}
              routeName={'AppliedJobs'}
              borderTop
              value={I18n.t('jobs.app.viewJobApps')}
            />
         </View>)
        :  (<RowColumn>
              <T14 red style={{margin:10}}>{resultMsg}</T14>
            </RowColumn>)
      }
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal:20
    }
    })

    const mapStateToProps = ({  globalReducer}) => ({
    })

    export default connect(mapStateToProps, jobActions)(JobApp);
