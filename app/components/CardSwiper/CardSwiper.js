import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, KeyboardAvoidingView, } from 'react-native';
import styles from './styles';
import { Icon } from 'native-base';
import firebase from 'react-native-firebase';
import Swiper from 'react-native-swiper';
import { BusinessCard } from '../BusinessCard';

class CardSwiper extends React.Component {

    render() {
        recommended = this.props.recommendation == undefined ? false : true
        return(
            <Swiper style={styles.wrapper} showsButtons={this.props.card.length > 1 ? true : false} showsPagination={true}>

                {this.props.card.map(function(item, i){

                    if(item != null)
                    return (
                        <View style={styles.slide1} key={i + "view"}>
                            <BusinessCard
                                recommendation={recommended}
                                key={i}
                                font={item.font}
                                cardnum={item.cardnum}
                                logo={item.logo}
                                color={item.color} 
                                position={item.position} 
                                website={item.website} 
                                businame={item.businame} 
                                phonenum={item.phonenum} 
                                name={item.name} 
                                email={item.email} 
                                address={item.address}
                                stateabb={item.stateabb}
                                city={item.city}
                                zip={item.zip}
                                socialMedia={item.socialMedia}
                                section={item.fireKey}
                                index={i}
                                contact={true}
                            />
                        </View>
                    )
                })}
            </Swiper>
        )
    }
}

export default CardSwiper;
