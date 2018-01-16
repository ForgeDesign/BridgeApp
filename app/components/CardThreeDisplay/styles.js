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
        top: '45%',
        left: '20%'

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
        color: 'black',
        fontSize: 16,
        position: 'absolute',
        bottom: '3%',
        left: '3%'
    },
    website: {
      position: 'absolute',
      color: 'gray',
      fontSize: 10,
      top: '3%',
      right: '3%',
    },
    title: {
      position: 'absolute',
      color: 'black',
      fontSize: 10,
      top: '11%',
      left: '3%'
    },
    phonenum: {
      position: 'absolute',
      color: 'black',
      fontSize: 12,
      top: '48%',
      left: '61%',
    },
    email: {
      color: 'black',
      fontSize: 12,
      position: 'absolute',
      top: '59%',
      left: '61%'
    },
    address: {
      color: 'black',
      fontSize: 10,
      position: 'absolute',
      top: '19%',
      left: '3%'
    },
    address2: {
      color: 'black',
      fontSize: 10,
      position: 'absolute',
      top: '27%',
      left: '3%'
    },
    name: {
      color: 'gray',
      fontSize: 10,
      position: 'absolute',
      top: '3%',
      left: '3%'
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
