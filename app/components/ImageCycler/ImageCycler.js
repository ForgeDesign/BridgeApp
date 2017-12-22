import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-swiper';

const ImageCycler = () => (
        <Swiper style={styles.wrapper} showsButtons={true}>
            <View style={styles.slide1}>
                <Image style={styles.card} 
                
                resizeMode="contain"

                source={require('../../data/CardTemplates/template1.jpg')} />  
            </View>
            <View style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
            </View>
        </Swiper>
  );

  export default ImageCycler;
  

