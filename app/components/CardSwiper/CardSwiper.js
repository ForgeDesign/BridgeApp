import React from 'react';
import { View, Text, Image, Platform, Modal, KeyboardAvoidingView, } from 'react-native';
import styles from './styles';
import { Icon } from 'native-base';
import firebase from 'react-native-firebase';
import Swiper from 'react-native-swiper';
import { BusinessCard } from '../BusinessCard';

class CardSwiper extends React.Component {

    filter_array(test_array) {
        var index = -1,
            arr_length = test_array ? test_array.length : 0,
            resIndex = -1,
            result = [];
    
        while (++index < arr_length) {
            var value = test_array[index];
    
            if (value) {
                result[++resIndex] = value;
            }
        }
    
        return result;
    }

    render() {
        recommended = this.props.recommendation == undefined ? false : true
        allCards = this.filter_array(this.props.card)

        if(Platform.OS == "android")
            return(
                allCards.map(function(item, i){
                    if(item != null)
                    return (
                        <View style={styles.slide1} key={i + "view"}>
                            <BusinessCard
                                logoFrame={item.logoFrame}
                                justImage={item.id == "IMAGE" ? item.id : undefined}
                                justImageImage={item.image}
                                recommendation={recommended}
                                key={i}
                                font={item.font}
                                chosenImage={item.chosenImage}
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
                })
            )

        if(this.props.fromContactsPage) {
            return(
                <Swiper onIndexChanged={(index) => {
                    this.props.updateVisible(index)
                }} style={styles.wrapper} showsButtons={allCards.length > 1 ? true : false} showsPagination={true}>
    
                    {allCards.map(function(item, i){
                        if(item != null)
                        return (
                            <View style={styles.slide1} key={i + "view"}>
                                <BusinessCard
                                    logoFrame={item.logoFrame}
                                    justImage={item.id == "IMAGE" ? item.id : undefined}
                                    justImageImage={item.image}
                                    recommendation={recommended}
                                    key={i}
                                    font={item.font}
                                    chosenImage={item.chosenImage}
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
        return(
            <Swiper style={styles.wrapper} showsButtons={allCards.length > 1 ? true : false} showsPagination={true}>

                {allCards.map(function(item, i){
                    if(item != null)
                    return (
                        <View style={styles.slide1} key={i + "view"}>
                            <BusinessCard
                                logoFrame={item.logoFrame}
                                justImage={item.id == "IMAGE" ? item.id : undefined}
                                justImageImage={item.image}
                                recommendation={recommended}
                                key={i}
                                font={item.font}
                                chosenImage={item.chosenImage}
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
