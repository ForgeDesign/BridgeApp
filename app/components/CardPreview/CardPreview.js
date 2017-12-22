import React from 'react';

import { View, Text, Image } from 'react-native';
import styles from './styles';

const CardPreview = ({title, tagline, buisname, phonenum}) => (
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
);

export default CardPreview;
