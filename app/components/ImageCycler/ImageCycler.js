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

const ImageCycler = ({height = "40.25%"}) => {
    
    return (
        <View height={height} style={{paddingTop: 5}}>
            <Swiper style={styles.wrapper} showsButtons={true}>
                <View style={styles.slide1}>
                    <Image style={styles.card} 
                    source={require('../../data/CardTemplates/businesscard1.png')} />  
                </View>
                <View style={styles.slide2}>
                <Image style={styles.card} 
                    

                    source={require('../../data/CardTemplates/businesscard2.png')} />  
                </View>
                <View style={styles.slide3}>
                <Image style={styles.card} 
                    

                    source={require('../../data/CardTemplates/businesscard3.png')} />  
                </View>
                <View style={styles.slide3}>
                <Image style={styles.card} 
                    

                    source={require('../../data/CardTemplates/businesscard4.png')} />  
                </View>
                <View style={styles.slide3}>
                <Image style={styles.card} 
                    

                    source={require('../../data/CardTemplates/businesscard5.png')} />  
                </View>
            </Swiper>
        </View>
      )
        
};

  export default ImageCycler;
  

