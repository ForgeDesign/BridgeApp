import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  main: {
    width: width,
    height: width*.5,
  },
});
