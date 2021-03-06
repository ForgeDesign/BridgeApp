import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    container: {
      width: (width-20),
      height: ((width*.3)-10),
      alignItems: 'center',
      backgroundColor: 'white',
      flexDirection: 'row',
      marginLeft: 10,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,

    },
    piccontainer: {
      flex: .75,
  //    alignItems: 'center',
      marginLeft: 10,
    },
    image: {
      height: width*.15,
      width: width*.15,
      borderRadius: width*.075
    },
    textcontainer: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    name: {
      fontSize: 14,
      color: '$primaryBlue',
    },
    location: {
      fontSize: 12,
      color: '$inputText',
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width*.4,
      height: width*.12,
      backgroundColor: '$primaryBlue',
      borderRadius: 5,
      marginLeft: width*.3,
      marginRight: width*.3,
      marginTop: 15,
    },
    buttonText: {
      fontSize: 16,
      color: 'white',
    },

});
