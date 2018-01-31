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
        top: '5%',
        left: '4%'

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
        fontSize: 12,
        position: 'absolute',
        top: '12%',
        left: '20%'
    },
    website: {
      position: 'absolute',
      color: 'gray',
      fontSize: 11,
      top: '74.5%',
      left: '60%',
    },
    title: {
      position: 'absolute',
      color: 'white',
      fontSize: 12,
      top: '14%',
      right: '3%'
    },
    phonenum: {
      position: 'absolute',
      color: 'gray',
      fontSize: 11,
      top: '64%',
      left: '60%',
    },
    email: {
      color: 'gray',
      fontSize: 11,
      position: 'absolute',
      top: '85%',
      left: '60%'
    },
    address: {
      color: 'white',
      fontSize: 10,
      position: 'absolute',
      top: '35%',
      right: '3%'
    },
    address2: {
      color: 'white',
      fontSize: 10,
      position: 'absolute',
      top: '42%',
      right: '3%'
    },
    name: {
      color: 'white',
      fontSize: 12,
      position: 'absolute',
      top: '6%',
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
