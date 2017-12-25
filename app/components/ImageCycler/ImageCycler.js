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
import Swiper from 'react-native-swiper';


var {height, width} = Dimensions.get('window');

const ImageCycler = () => {

    return (
      <View style={styles.main}>
            <Swiper style={styles.wrapper} showsButtons={true}>

                <View style={styles.slideView}>
                  <Image style={styles.image}
                    source={require('../../data/CardTemplates/businesscard1.png')} />
                </View>

                <View style={styles.slideView}>
                  <Image style={styles.image}
                    source={require('../../data/CardTemplates/businesscard2.png')} />
                </View>

                <View style={styles.slideView}>
                  <Image style={styles.image}
                    source={require('../../data/CardTemplates/businesscard3.png')} />
                </View>

                <View style={styles.slideView}>
                  <Image style={styles.image}
                    source={require('../../data/CardTemplates/businesscard4.png')} />
                </View>

                <View style={styles.slideView}>
                  <Image style={styles.image}
                    source={require('../../data/CardTemplates/businesscard5.png')} />
                </View>
            </Swiper>
          </View>
      )

};

  export default ImageCycler;
