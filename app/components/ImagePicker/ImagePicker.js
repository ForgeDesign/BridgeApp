import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import styles from './styles';
import Picker from 'react-native-image-picker'

const ImagePicker = () => {

    var options = {
        title: 'Select Avatar',
        customButtons: [
            {name: 'fb', title: 'Choose Photo from Facebook'},
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

      
    return (
        <View style={styles.main}>
            <Text> here is a test </Text>
        </View>
    )

};

  export default ImagePicker;
