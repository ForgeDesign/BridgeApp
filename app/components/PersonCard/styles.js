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
      marginTop: 15,
      borderRadius: 10,
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

});
