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
      color: 'white',
      fontSize: 12,
      top: 4,
      right: 75
    },
    name: {
      color: 'white',
      fontSize: 26,
      top: 0,
      right: 75
    },
    tagline: {
      color: 'white',
      fontSize: 12,
      right: 50
    },
    footView: {
      flex: .3,
      alignItems: 'flex-end',
      width: (width-20)
    },
    buisname: {
      color: 'white',
      fontSize: 12,
      right: 47,
    },
    phonenum: {
      color: 'white',
      fontSize: 12,
      right: 75,
      bottom: 8
    },

});
