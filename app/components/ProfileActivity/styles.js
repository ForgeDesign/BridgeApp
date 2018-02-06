import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    container: {
      width: (width-20),
      height: ((width*.2)-10),
      alignItems: 'center',
      backgroundColor: 'white',
      flexDirection: 'row',
      marginLeft: 10,
      marginTop: 3,
      marginBottom: 3,
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
      height: width*.125,
      width: width*.125,
      borderRadius: width*.0625
    },
    textcontainer: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    name: {
      fontSize: 14,
      color: '$primaryBlue',
      top: '10%'
    },
    activity: {
        fontSize: 12,
        top: '10%',
        // color: '$primaryBlue',
    },
    location: {
      fontSize: 12,
      color: '$inputText',
      top: '10%'
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
