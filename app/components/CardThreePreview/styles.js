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
      color: '$inputText',
      fontSize: 12,
      top: 4,
      right: 75
    },
    tagline: {
      color: '$inputText',
      fontSize: 12,
      top: 20,
      right: 95
    },
    footView: {
      flex: .3,
      alignItems: 'flex-end',
      width: (width-20)
    },
    buisname: {
      color: '$inputText',
      fontSize: 12,
      top: 40,
      left: 95

    },
    phonenum: {
      color: '$inputText',
      fontSize: 12,
      top: 36,
      left: 115
    },
    name: {
      color: '$inputText',
      fontSize: 16,
      left: 60,
    },

});
