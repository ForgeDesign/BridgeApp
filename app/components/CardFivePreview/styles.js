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
    container: {
        width: (width-20),
        height: ((width-20)*.52),
        alignItems: 'center',
        justifyContent: 'center',
      },
    image: {
      width: (width-20),
      height: ((width-20)*.52),
    },
    headView: {
      flex: .2,
    },
    mainView: {
      flex: .5,
      alignItems: 'center',
      width: (width-20)
    },
    title: {
      color: 'red',
      fontSize: 22,
      right: 75,
      top: 5    
    },
    tagline: {
      color: 'white',
      fontSize: 12,
      right: 77,
      top: 4
    },
    footView: {
      flex: .3,
      alignItems: 'flex-end',
      width: (width-20)
    },
    buisname: {
      color: 'white',
      fontSize: 14,
      right: 240,
      top: 34
    },
    phonenum: {
      color: 'white',
      fontSize: 16,
      right: 93,
      top: 50
    },
    name: {
      color: 'red',
      fontSize: 25,
      right: 67,
      top: 10
    },

});
