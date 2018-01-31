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
      right: '5%'

  },
  container: {
      width: (width-20),
      height: ((width-20)*.57),
  },
  image: {
      width: (width-20),
      height: ((width-20)*.57),
  },
    businame: {
        color: 'black',
        fontSize: 14,
        position: 'absolute',
        top: '34%',
        right: '4%'
    },
    website: {
      position: 'absolute',
      color: 'white',
      fontSize: 10,
      bottom: '12.5%',
      right: '12%',
    },
    title: {
      position: 'absolute',
      color: 'white',
      fontSize: 14,
      top: '14%',
      left: '5%'
    },
    phonenum: {
      position: 'absolute',
      color: 'white',
      fontSize: 10,
      bottom: '20%',
      right: '12%',
    },
    name: {
      color: 'white',
      fontSize: 14,
      position: 'absolute',
      top: '5%',
      left: '5%'
    },
    email: {
      color: 'white',
      fontSize: 10,
      position: 'absolute',
      bottom: '5%',
      right: '12%'
    },
    address: {
      color: 'white',
      fontSize: 10,
      position: 'absolute',
      top: '30%',
      left: '5%'
    },
    address2: {
      color: 'white',
      fontSize: 10,
      position: 'absolute',
      top: '37%',
      left: '5%'
    },

});
