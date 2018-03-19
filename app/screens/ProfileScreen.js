import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, RefreshControl, FlatList, TouchableOpacity, Modal, Dimensions, AsyncStorage } from 'react-native';
import store from 'react-native-simple-store';

import styles from './ProfileStyles'

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { ProfileHeader } from '../components/ProfileHeader';
import { BusinessCard } from '../components/BusinessCard';
import Checkbox from '../components/Checkbox';
import { ProfileActivity } from '../components/ProfileActivity';

import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import Swipeable from 'react-native-swipeable';

import { Col, Row, Grid } from "react-native-easy-grid";
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import firebase from 'react-native-firebase';
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

var {height, width} = Dimensions.get('window');

class ProfileScreen extends Component {

    tick() {
        this._getActivity()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    constructor(props) {
        super(props)

        this.state = {
            disabled: true,
            activity: [ ]
        }

        this._handleCheck.bind(this)
        this._renderItem.bind(this)

        this._getCards()
        this._getActivity()
        this.interval = setInterval(this.tick.bind(this), 1000)
    }

    arraysEqual(arr1, arr2) {
        if(arr1.length !== arr2.length)
            return false;
        for(var i = arr1.length; i--;) {
            if(arr1[i].connector !== arr2[i].connector 
                || arr1[i].text !== arr2[i].text
                || arr1[i].connectee !== arr2[i].connectee
                || arr1[i].icon !== arr2[i].icon
                || arr1[i].image !== arr2[i].image
                || arr1[i].time !== arr2[i].time)
                return false;
        }
        return true;
    }

    _getActivity() {
        store.get('activity').then((value) => {
            if (value!== null && !this.arraysEqual(value.reverse(), this.state.activity)){
                this.setState({activity: value});
            } 
            if (value === null) {
                var a = new Date();
                a.setMinutes(a.getMinutes() - 1);
                obj =  
                [
                    {
                        connector: "You",
                        text: "bridged with",
                        connectee: "Ryan Camardo",
                        icon: "",
                        image: "ryan",
                        time: a.toString()
                    },
                ]
                this.setState({activity: obj.reverse()})
                store.save('activity', obj)
            }
        });
    }

    _getCards() {
        store.get('busicards').then((value) => {
            if (value!==null){
                console.log(value)
                this.setState({cards: value});
            }
        });
    }

    // this tells you if the profile screen is active
    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            // here we are in screen
            this._getActivity()
            this._getCards()
            this.interval = setInterval(this.tick.bind(this), 1000)
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // NOT HERE
            clearInterval(this.interval)
        }
    }

    openPopup() {
        if (this.state.cards != undefined)
            for (let index = 0; index < this.state.cards.length; index++) {
                this["check" + index].uncheck()
            }
        this.popupDialog.show()
    }

    cardChecked = {}

    _keyExtractor = (item, index) => index;

    _handleCheck(val, ref) {
        this.cardChecked[ref.index] = val
        isCheck = false
        for (let index = 0; index < this.state.cards.length; index++) {
            if (this.cardChecked[index] != undefined && this.cardChecked[index]) {
                isCheck = true
                break
            }
        }
        if (isCheck) {
            this.setState({disabled : false})
        }
        else {
            this.setState({disabled : true})
        }
    }

    _handleShares() {
        checks = 0
        for (let index = 0; index < this.state.cards.length; index++) {
            if (this.cardChecked[index] != undefined && this.cardChecked[index]) {
                checks += 1
            }
        }
        this.popupDialog.dismiss()
        this.header.openConnect(checks)
    }

    _renderItem(ref) {
        return (
            <Grid style={{marginTop: '12%'}}>
                <Col size={75}>
                    <BusinessCard
                        font={ref.item.font}
                        cardnum={ref.item.cardnum}
                        id={ref.index}
                        key={ref.index}
                        logo={ref.item.logo}
                        position={ref.item.position}
                        color={ref.item.color}
                        website={ref.item.website}
                        businame={ref.item.businame}
                        phonenum={ref.item.phonenum}
                        name={ref.item.name}
                        email={ref.item.email}
                        address={ref.item.address}
                        city={ref.item.city}
                        stateabb={ref.item.stateabb}
                        zip={ref.item.zip}
                    />
                </Col>
                <Col size={25}>
                    <Checkbox
                        style={{left: '45%', flex: 1, top: '-12%'}}
                        onChange={(val) => this._handleCheck(val, ref)}
                        checked={false}
                        ref={(check) => {this["check" + ref.index] = check}}
                        checkedColor={$primaryBlue}
                        uncheckedColor={$lightGray}
                        iconName='matMix'
                    />
                </Col>
            </Grid>
        )
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <Header title={'Profile'} logout={() => firebase.auth().signOut()}/>

                <ProfileHeader
                    ref={ref => this.header = ref}
                    navigation={this.props.navigation}
                    showPopup={this.openPopup.bind(this)}
                />

                <View style={{
                    borderBottomColor: '#003E5B',
                    borderBottomWidth: 4,
                    shadowOffset: { width: 0, height:2.8 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1,
                    bottom: 3
                }}/>

                <PopupDialog
                    dialogTitle={<DialogTitle title="Select a Card" />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    height={0.70}
                    actions={[
                        <Grid key="grid">
                            <Row style={{justifyContent: 'center'}}>
                                <DialogButton
                                    text="Cancel"
                                    onPress={() => {
                                        this.popupDialog.dismiss();
                                    }}
                                    key="button-1"
                                />
                                <DialogButton
                                    disabled={this.state.disabled}
                                    text="Share"
                                    onPress={() => {
                                        this._handleShares();
                                    }}
                                    key="button-2"
                                />
                            </Row>
                        </Grid>]
                    }
                    >
                    <View>
                        <FlatList
                            height={'80%'}
                            data={this.state.cards}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem.bind(this)}
                        />
                    </View>
                </PopupDialog>
                <ScrollView style={{ flex: 1, marginTop: 3 }}>
                    {this.state.activity.map((ref, key) =>
                        <ProfileActivity
                          key={key}
                          ref={(card) => {this[key] = card}}
                          connector={ref.connector}
                          connectee={ref.connectee}
                          text={ref.text}
                          image={ref.image}
                          icon={ref.icon}
                          time={ref.time}/>
                    )}
                </ScrollView>
            </Container>
        )
    }
}

export default withNavigationFocus(ProfileScreen, 'Profile')
