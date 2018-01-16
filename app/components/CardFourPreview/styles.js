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
        borderRadius: 50/2,
        position: 'absolute',
        top: '5%',
        left: '7%'

    },
    container: {
        width: (width-20),
        height: ((width-20)*.52),
    },
    image: {
        width: (width-20),
        height: ((width-20)*.52),
    },
    buisname: {
        color: 'gray',
        fontSize: 16,
        position: 'absolute',
        top: '40%',
        right: '5%'
    },
    website: {
      position: 'absolute',
      color: 'gray',
      fontSize: 11,
      top: '80%',
      left: '64%',
    },
    title: {
      position: 'absolute',
      color: 'gray',
      fontSize: 14,
      top: '71%',
      right: '44%'
    },
    phonenum: {
      position: 'absolute',
      color: 'gray',
      fontSize: 11,
      top: '66.5%',
      left: '64%',
    },
    email: {
      color: 'white',
      fontSize: 10,
      position: 'absolute',
      top: '11%',
      right: '3%'
    },
    address: {
      color: 'white',
      fontSize: 10,
      position: 'absolute',
      top: '19%',
      right: '3%'
    },
    address2: {
      color: 'white',
      fontSize: 10,
      position: 'absolute',
      top: '28%',
      right: '3%'
    },
    name: {
      color: 'white',
      fontSize: 10,
      position: 'absolute',
      top: '3%',
      right: '3%'
    },
    modal: {
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, .7)',
      width: width,
      height: height,
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      width: width*.7,
      height: height*.3,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width*.4,
      height: width*.12,
      backgroundColor: '$primaryBlue',
      borderRadius: 5,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 3,
    },
    buttonText: {
      fontSize: 16,
      color: 'white',
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      marginBottom:  5,
    },

});
