import React from 'react';
import Hero from 'react-native-hero';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';

const CardThreePreview = ({ color, title, tagline, buisname, phonenum }) => {

    return (
      <View style={styles.top}>
        <Hero style={styles.image}
        colorOverlay={color}
          source={require('../../data/CardTemplates/businesscard3.png')}
          renderOverlay={() => (
          <View style={styles.container}>
            <View style={styles.headView}/>
            <View style={styles.mainView}>
            <Text style={styles.name}></Text>
            <Text style={styles.phonenum}>{phonenum}</Text>
            <Text style={styles.buisname}>{buisname}</Text>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.tagline}>{tagline}</Text>
            </View>
            <View style={styles.footView}>

            </View>
          </View>
          )} />
      </View>
    )
};

export default CardThreePreview;
