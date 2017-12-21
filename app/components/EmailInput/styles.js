import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    container: {
      width: width*.7,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'black'
    },
    inputWrapper:{
      flex: .85,
    },
    input: {
      fontSize: 14,
      color: '$inputText',
      padding: 0,
      marginTop: 15,
    },
    iconWrapper: {
      flex: .15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      color: 'steelblue',
      fontSize: 18,
      marginTop: 15,
    },

});
