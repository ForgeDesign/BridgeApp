import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Navigator from './config/loginnav';
// import CameraScreen from   './screens/CameraScreen';
EStyleSheet.build({
  $primaryBlue: '#003E5B',
  $lightGray: '#E6E6E6',
  $border: '#979797',
  $inputText: '#797979',
  $darkText: '#343434',
  $offwhite: 'whitesmoke',
  $alertSuccess: '#5BB85B',
});
$alertSuccess = '#5BB85B'
$primaryBlue = '#003E5B'
$lightGray = '#E6E6E6'
$border = '#979797'
$inputText = '#797979'
$darkText = '#343434'
$offwhite = 'whitesmoke'
console.ignoredYellowBox = ['Remote debugger'];

$defaultAssets = {
    jamessmith: require('./assets/images/jamessmith.jpg'),
    brianamin: require('./assets/images/brianamin.jpg'),
    markbrown: require('./assets/images/markbrown.jpg'),
    frankbarnes: require('./assets/images/frankbarnes.jpg'),
    marylewis: require('./assets/images/marylewis.jpg'),
    davidrodriguez: require('./assets/images/davidrodriguez.jpg'),
    ryan: require('./assets/images/ryan.jpg')
}

export default () => <Navigator />
