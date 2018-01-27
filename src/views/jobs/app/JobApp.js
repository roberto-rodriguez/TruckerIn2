
import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';
import { Container, Content, Button} from "native-base";
import { Column,Row, Header, BlockButton,  T12, T13,T14, AgentImg, ListItem } from 'src/components/'
import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";
import * as jobActions from "src/views/jobs/jobs.actions";
import I18n from 'react-native-i18n'

class JobApp extends Component {

  constructor(props) {
      super(props)

      this.state = {
        submitted: false,
        appSuccess: null,
        resultMsg: '',
        availability: null
      }
}

  jobApply = () => {
   var jobId = this.props.navigation.state.params.jobId
   var _this = this
   var availability = this.state.availability

   this.props.jobApply(jobId, availability, (success, resultMsg) => {
     _this.setState((prevState) => {
       prevState['appSuccess'] = success;
       prevState['resultMsg'] = resultMsg;
       prevState['submitted'] = true;
       return prevState;
     })
   })
  }

  onavailabilityComplete = (availability) => {
       this.setState((prevState) => {
         return {
           ...prevState,
           availability
         }
       })
  }

  render() {
    const {navigation, profileInfoCompletion, profileExperienceCompletion} = this.props;

    var {submitted, appSuccess, resultMsg, availability} = this.state;

    var disableButton = (profileInfoCompletion < 100 || profileExperienceCompletion < 100)

    return (
      <Container white>
        <Header navigation={navigation} back title={I18n.t('jobs.app.title')}/>
        <Content fullscreen contentContainerStyle={styles.container}>

         {submitted ? this.postApplyView(navigation, appSuccess, resultMsg)
           : this.preApplyView(navigation, disableButton, profileInfoCompletion, profileExperienceCompletion)}

        </Content>
        {
          submitted ? <BlockButton text={I18n.t('jobs.app.goBack')} onPress={()=> navigation.goBack()}/>
                    : <BlockButton text={I18n.t('jobs.app.apply')} disabled={disableButton} onPress={this.jobApply}/>
        }
      </Container>
    );
  }

  preApplyView = (navigation, disableButton, profileInfoCompletion, profileExperienceCompletion) => (
    <View>
    <AgentImg text={I18n.t('jobs.app.infoWillBeShared')}/>

    {disableButton &&
      (
        <Row h={20}><Column h={20}>
          <T12 red>{I18n.t('jobs.app.itemsInRed')}</T12>
        </Column></Row>
      )
    }

      <ListItem
        red={profileInfoCompletion < 100}
        icon={'user-circle-o'}
        navigation={navigation}
        routeName={'EditProfileInformation'}
        params={{hidePrivacityOption: true}}
        label={'Completted ' + profileInfoCompletion + '%'}
        value={I18n.t('jobs.app.personalInfo')}
      />

      <ListItem
        red={profileExperienceCompletion < 100}
        icon={'truck'}
        navigation={navigation}
        routeName={'EditProfileExperience'}
        label={I18n.t('jobs.app.completted') + profileExperienceCompletion + '%'}
        value={I18n.t('profile.titles.experience')}
      />

      <ListItem
        icon={'graduation-cap'}
        navigation={navigation}
        routeName={'ProfileCareerList'}
        params={{isMe: true}}
        value={I18n.t('jobs.app.career')}
      />

      <ListItem
        icon={'rocket'}
        navigation={navigation}
        routeName={'TextInputView'}
        params={{title: I18n.t('jobs.app.availability'), text: this.state.availability, callback: this.onavailabilityComplete}}
        label={I18n.t('jobs.app.whenCanStart')}
        value={I18n.t('jobs.app.availability')}
        red={this.state.availability == null}
      />
    </View>
  )

  postApplyView = (navigation, appSuccess, resultMsg) => (
    <View>
      <AgentImg text={appSuccess ? I18n.t('jobs.app.appSuccess') : I18n.t('jobs.app.appFailed')}/>

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
        :  <T14 red style={{margin:10}}>{resultMsg}</T14>
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
      profileInfoCompletion: globalReducer.profileInfo.completion,
      profileExperienceCompletion: globalReducer.profileExperience.completion
    })

    export default connect(mapStateToProps, jobActions)(JobApp);
