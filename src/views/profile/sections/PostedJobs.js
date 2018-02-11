import React, { Component } from "react";
import {  View  } from "react-native";
import { Button, Container,  Text, Spinner } from "native-base";
import { nav} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'
import theme from 'src/theme/variables/platform'
import * as jobActions from "src/views/jobs/jobs.actions";

import PostedJobPost from 'src/views/jobs/postedJobs/PostedJobPost'

class PostedJobs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true
     }
   }

   componentDidMount(){
     debugger;
     var params = {'author.id': this.props.id}
     this.props.listJobs(0, params, (list) => this.setState({ loading: false, list }) , true)
   }

 componentWillReceiveProps(newProps){
   if(newProps.headerError){
     this.setState({loading: false})
   }
 }


  render() {
    var {isMe, navigation} = this.props
    var {loading, list} = this.state

    if(loading){
      return  (<Spinner color={theme.secondaryColor} />)
    }

    return (
       <View>

       {list && list.map( (data, i) => (  <PostedJobPost navigation={navigation}  key={i} data={data}/> ))}

       {list && list.length > 10 && (
         <Button full transparent onPress={() => nav(navigation, 'PostedJobs', {userId: this.props.id})}>
           <Text style={{ color: theme.secondaryColor }}>
             {I18n.t('profile.seeMore')}
           </Text>
         </Button>
       )}
       </View>

    );
  }
}

 const mapStateToProps = ({globalReducer}) => ({
   headerError: globalReducer.view.headerError
 })

 export default connect(mapStateToProps,  jobActions)(PostedJobs);
