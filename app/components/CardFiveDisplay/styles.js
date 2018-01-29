import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    top: {
        width: (width-20),
        height: ((width-20)*.57),
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
        top: '6%',
        left: '14%'
    },
    container: {
        width: (width-20),
        height: ((width-20)*.57),
    },
    image: {
        width: (width-20),
        height: ((width-20)*.57),
    },
    buisname: {
        color: 'white',
        fontSize: 14,
        position: 'absolute',
        top: '44%',
        left: '5%'
    },
    website: {
      position: 'absolute',
      color: 'white',
      fontSize: 13,
      bottom: '4%',
      left: '13%',
    },
    title: {
      color: 'black',
      fontSize: 12,
      position: 'absolute',
      top: '13%',
      left: '63%'
    },
    phonenum: {
      position: 'absolute',
      color: 'white',
      fontSize: 13,
      bottom: '28%',
      left: '13%',
    },
    email: {
      position: 'absolute',
      color: 'white',
      fontSize: 13,
      bottom: '16%',
      left: '13%',
    },
    address: {
      color: 'black',
      fontSize: 10,
      position: 'absolute',
      top: '28%',
      left: '63%'
    },
    address2: {
      color: 'black',
      fontSize: 10,
      position: 'absolute',
      top: '36%',
      left: '63%'
    },
    name: {
      color: 'black',
      fontSize: 12,
      position: 'absolute',
      top: '6%',
      left: '63%'
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
