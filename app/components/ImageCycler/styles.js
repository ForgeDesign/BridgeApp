import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';
const  myWidth  = Dimensions.get('window').width;
const  myHeight  = Dimensions.get('window').height;

export default EStyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: myWidth,
    // height: myHeight,
    justifyContent: 'center'
  },
    wrapper: {
      position:'relative',
      // overflow:'hidden',
      // height: 0,
      // width: 0,
    },
    slide1: {

    
      // alignSelf: 'stretch',
      backgroundColor: 'transparent',
      },
    slide2: {

      backgroundColor: 'transparent',
      
      // justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: 'transparent',
    },
    slide3: {

      backgroundColor: 'transparent',
      
      // justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: 'transparent',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }
  
});
