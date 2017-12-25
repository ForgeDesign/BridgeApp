import React from 'react';
import Hero from 'react-native-hero';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const CardFivePreview = ({ title, tagline, buisname, phonenum }) => {

    return (
      <View style={styles.top}>
        <Hero style={styles.image}
          source={require('../../data/CardTemplates/businesscard5.png')}
          renderOverlay={() => (
          <View style={styles.container}>
            <View style={styles.headView}/>
            <View style={styles.mainView}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.tagline}>{tagline}</Text>
            </View>
            <View style={styles.footView}>
              <Text style={styles.buisname}>{buisname}</Text>
              <Text style={styles.phonenum}>{phonenum}</Text>
            </View>
          </View>
          )} />
      </View>
    )
};

export default CardFivePreview;
