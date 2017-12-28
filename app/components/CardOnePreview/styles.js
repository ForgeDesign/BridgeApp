import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    top: {
        width: (width-20),
        height: ((width-20)*.52),
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    logo: {
        width: 50,
        height: 50,
        right: 50,
        borderRadius: 50/2,
    },
    container: {
        width: (width-20),
        height: ((width-20)*.52),
    },
    image: {
        width: (width-20),
        height: ((width-20)*.52),
    },
    title: {
        color: 'black',
        fontSize: 22,
        alignSelf: 'flex-end'
    },
    website: {
      color: 'white',
      fontSize: 10,
      marginLeft: 6,
      alignSelf: 'flex-start'
    },
    buisname: {
      color: 'black',
      fontSize: 14,
      marginRight: 6,
      alignSelf: 'flex-end'
    },
    phonenum: {
      color: 'white',
      fontSize: 10,
      marginLeft: 6,
      alignSelf: 'flex-start'
    },
    email: {
      color: 'white',
      fontSize: 10,
      marginTop: 6,
      marginLeft: 6,
      alignSelf: 'flex-start'
    },
    address: {
      color: 'white',
      fontSize: 10,
      marginLeft: 6,
      alignSelf: 'flex-start'
    },
    name: {
      color: 'white',
      fontSize: 10,
      marginLeft: 6,
      alignSelf: 'flex-start'
    },

});
