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
      top: '33%',
      left: '8%'

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
      color: 'white',
      fontSize: 16,
      position: 'absolute',
      bottom: '15%',
      left: '3%'
  },
  website: {
    position: 'absolute',
    color: 'black',
    fontSize: 12,
    top: '42%',
    right: '10%',
  },
  title: {
    position: 'absolute',
    color: 'white',
    fontSize: 14,
    bottom: '25%',
    left: '3%'
  },
  phonenum: {
    position: 'absolute',
    color: 'black',
    fontSize: 12,
    top: '31%',
    right: '10%',
  },
  email: {
    color: 'black',
    fontSize: 10,
    position: 'absolute',
    top: '5%',
    right: '3%'
  },
  address: {
    color: 'white',
    fontSize: 10,
    position: 'absolute',
    bottom: '9%',
    left: '5%'
  },
  address2: {
    color: 'white',
    fontSize: 10,
    position: 'absolute',
    bottom: '2%',
    left: '5%'
  },
  name: {
    color: 'white',
    fontSize: 10,
    position: 'absolute',
    top: '5%',
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
