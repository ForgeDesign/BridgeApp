import React from 'react';
import Hero from 'react-native-hero';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';

const CardFourPreview = ({ logo, color, title, website, buisname, phonenum, email, address, name }) => {

    return (
        <View style={styles.top}>
            <Hero style={styles.image}
                colorOverlay={color}
                source={require('../../data/CardTemplates/businesscard5.png')}
                renderOverlay={() => (
                    <View style={styles.container}>
                        <View style={styles.headView}/>
                          <Text style={styles.name}>{name}</Text>
                          <Text style={styles.phonenum}>{phonenum}</Text>
                        <View style={styles.mainView}>
                            <Image
                                style={styles.logo}
                                source={{uri: logo }}/>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.website}>{website}</Text>
                        </View>
                        <View style={styles.footView}>
                            <Text style={styles.address}>{address}</Text>
                            <Text style={styles.email}>{email}</Text>
                            <Text style={styles.buisname}>{buisname}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
};

export default CardFourPreview;
