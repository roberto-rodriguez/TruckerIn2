import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

export const codePinStyles = StyleSheet.create({
  container: {
    height          : 150,
    width           : width - 30,
    backgroundColor : '#FFF'
  },
  containerPin: {
    width           : width - 30,
    height          : 40,
    flexDirection   : 'row',
    justifyContent  : 'space-around',
    alignItems      : 'center',
    marginTop       : 20,
    paddingHorizontal: 40
  },
  pin: {
    backgroundColor : '#F0F0F0',
    textAlign       : 'center',
    flex            : 1,
    marginLeft      : 10,
    marginRight     : 10,
    borderRadius    : 5,
    shadowColor     : '#629aa9',
    fontSize    : 18,
    borderWidth: 0.5,
    borderColor: '#629aa9',
    shadowOffset    : {
      width  : 10,
      height : 10
    },
    shadowRadius  : 5,
    shadowOpacity : 0.4
  },
  text: {
    textAlign   : 'center',
    color       : 'gray',
    fontSize    : 16,
    marginTop   : 30
  },
  error: {
    textAlign   : 'center',
    color       : 'red',
    paddingTop  : 10
  }
});
