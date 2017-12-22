import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';
const  myWidth  = Dimensions.get('window').width;

export default EStyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: myWidth,
    justifyContent: 'center'
  },
    wrapper: {
      
    },
    slide1: {
      flex: 1,
    
      // alignSelf: 'stretch',
      backgroundColor: 'transparent',
      },
    slide2: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    slide3: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }
  
});
