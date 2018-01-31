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
      top: '35%',
      left: '8%'

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
      fontSize: 16,
      position: 'absolute',
      bottom: '17%',
      left: '3%'
  },
  website: {
    position: 'absolute',
    color: 'black',
    fontSize: 10,
    top: '42.5%',
    right: '16%',
  },
  title: {
    position: 'absolute',
    color: 'white',
    fontSize: 10,
    top: '17%',
    left: '3%'
  },
  phonenum: {
    position: 'absolute',
    color: 'black',
    fontSize: 10,
    top: '34%',
    right: '16%',
  },
  email: {
    color: 'black',
    fontSize: 10,
    position: 'absolute',
    top: '51%',
    right: '16%'
  },
  address: {
    color: 'white',
    fontSize: 10,
    position: 'absolute',
    bottom: '11%',
    left: '5%'
  },
  address2: {
    color: 'white',
    fontSize: 10,
    position: 'absolute',
    bottom: '4%',
    left: '5%'
  },
  name: {
    color: 'white',
    fontSize: 12,
    position: 'absolute',
    top: '9%',
    left: '3%'
  },

});
