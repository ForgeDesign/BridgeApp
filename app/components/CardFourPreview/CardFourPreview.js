import React from 'react';
import Hero from 'react-native-hero';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';

const CardFourPreview = ({ city, stateabb, zip, logo, color, position, website, buisname, phonenum, email, address, name }) => {

      return (
        <View style={styles.top}>
            <Hero style={styles.image}
                colorOverlay={color}
                source={require('../../data/CardTemplates/businesscard4.png')}
                renderOverlay={() => (
                    <View style={styles.container}>
                            <Image
                                style={styles.logo}
                                source={{uri: logo }}
                            />
                            <Text style={styles.email}>{email}</Text>
                            <Text style={styles.address}>{address}</Text>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.title}>{position}</Text>
                            <Text style={styles.address2}>{city} {stateabb} {zip}</Text>
                            <Text style={styles.website}>{website}</Text>
                            <Text style={styles.phonenum}>{phonenum}</Text>
                            <Text style={styles.buisname}>{buisname}</Text>
                    </View>
                )}
            />
        </View>
    )
};

export default CardFourPreview;
