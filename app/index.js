import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Navigator from './config/loginnav';
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

export default () => <Navigator />
