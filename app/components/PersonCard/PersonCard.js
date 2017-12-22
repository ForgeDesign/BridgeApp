import React from 'react';

import { View, Text, Image } from 'react-native';
import styles from './styles';

const PersonCard = ({name, location, imagepath}) => (
    <View style={styles.container}>
      <View style={styles.piccontainer}>
        <Image
          source={{uri: imagepath}}
          style={styles.image}/>
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
);

export default PersonCard;
