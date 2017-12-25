import React from 'react';
import Hero from 'react-native-hero';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const CardTwoPreview = ({ title, tagline, buisname, phonenum }) => {

  return (
    <View style={styles.top}>
      <Hero style={styles.image}
        source={require('../../data/CardTemplates/businesscard2.png')}
        renderOverlay={() => (
          <View style={styles.container}>
            <View style={styles.headView}>
              <Text style={styles.name}></Text>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.phonenum}>{phonenum}</Text>
              <Text style={styles.buisname}>{buisname}</Text>

            </View>
            <View style={styles.footView}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.tagline}>{tagline}</Text>
            </View>
          </View>
        )} />
    </View>
  )
};

export default CardTwoPreview;
