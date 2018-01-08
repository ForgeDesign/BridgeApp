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
        top: '40%',
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
        bottom: '8%',
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
      bottom: '21%',
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

});
