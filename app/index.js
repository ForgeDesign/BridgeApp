import React from 'react';
import { View } from 'react-native';
import RecordVideo from './screens/RecordVideo';
import EStyleSheet from 'react-native-extended-stylesheet';
import Navigator from './config/routes';
EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $lightGray: '#F0F0F0',
  $border: '#979797',
  $inputText: '#797979',
  $darkText: '#343434',

});
export default () => <Navigator />