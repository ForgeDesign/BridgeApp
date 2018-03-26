import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    container: {
      width: (width-20),
      height: ((width*.35)-10),
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
      flex: 1.25,
      alignItems: 'center',
      margin: 5,
    },
    image: {
      height: width*.25,
      width: width*.25,
      borderRadius: width*.125
    },
    textcontainer: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    name: {
      fontSize: 18,
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
      bottom: "5%"
    },
    buttonText: {
      fontSize: 16,
      color: 'white',
    },

});
