import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    container: {
      width: width-20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 5,
      backgroundColor: '$lightGray',
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    inputWrapper:{
      flex: 1
    },
    input: {
      fontSize: 16,
      color: 'black',
      padding: 0,
      margin: 15,
    },
});
