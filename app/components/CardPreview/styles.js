import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    container: {
      width: (width-20),
      height: ((width-20)*.5),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    image: {
      width: (width-20),
      height: ((width-20)*.5),
      marginLeft: 10,
      marginTop: 15,
      borderRadius: 10,
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
      color: 'black',
      fontSize: 22,
    },
    tagline: {
      color: 'white',
      fontSize: 26,
    },
    footView: {
      flex: .3,
      alignItems: 'flex-end',
      width: (width-20)
    },
    buisname: {
      color: 'white',
      fontSize: 14,
      marginRight: 8,
    },
    phonenum: {
      color: '$inputText',
      fontSize: 12,
      marginRight: 8,
    },

});
