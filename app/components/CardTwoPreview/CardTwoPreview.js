import React from 'react';
import Hero from 'react-native-hero';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';

const CardTwoPreview = ({ logo, color, title, tagline, buisname, phonenum }) => {

    return (
        <View style={styles.top}>
            <Hero style={styles.image}
                colorOverlay={color}
                source={require('../../data/CardTemplates/businesscard2.png')}
                renderOverlay={() => (
                    <View style={styles.container}>
                        <View style={styles.headView}>
                            <Text style={styles.name}></Text>
                        </View>
                        <View style={styles.mainView}>
                            <Image
                                style={styles.logo} 
                                source={{uri: logo }} 
                            />
                            <Text style={styles.phonenum}>{phonenum}</Text>
                            <Text style={styles.buisname}>{buisname}</Text>
                        </View>
                        <View style={styles.footView}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.tagline}>{tagline}</Text>
                        </View>
                    </View>
                )} 
            />
        </View>
    )
};

export default CardTwoPreview;
