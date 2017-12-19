import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Navigator from './config/routes';
EStyleSheet.build({
  $primaryBlue: '#003E5B',
  $lightGray: '#F0F0F0',
  $border: '#979797',
  $inputText: '#797979',
  $darkText: '#343434',

});
export default () => <Navigator />
