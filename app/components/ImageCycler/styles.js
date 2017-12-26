import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  main: {
    width: width,
    height: width*.5,
  },
  wrapper: {
  },
  color: {
    ...EStyleSheet.absoluteFillOsbject,
    backgroundColor: 'rgba(69,85,117,1)',
    },
  image: {
    width: (width-20),
    height: ((width-20)*.5),
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  slideView: {
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
