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
        right: '5%'

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
        top: '50%',
        left: '52%'
    },
    website: {
      position: 'absolute',
      color: 'white',
      fontSize: 12,
      top: '85%',
      right: '8%',
    },
    title: {
      position: 'absolute',
      color: 'white',
      fontSize: 14,
      top: '5%',
      left: '5%'
    },
    phonenum: {
      position: 'absolute',
      color: 'white',
      fontSize: 12,
      top: '76%',
      right: '8%',
    },
    name: {
      color: 'white',
      fontSize: 10,
      position: 'absolute',
      top: '16%',
      left: '5%'
    },
    email: {
      color: 'white',
      fontSize: 10,
      position: 'absolute',
      top: '23%',
      left: '5%'
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
