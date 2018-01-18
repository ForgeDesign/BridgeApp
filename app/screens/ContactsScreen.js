import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, FlatList } from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { ActivityCard } from '../components/ActivityCard'
import { PersonCard } from '../components/PersonCard';
import { Col, Row, Grid } from "react-native-easy-grid";
import CheckBox from 'react-native-checkbox-heaven'
import EStyleSheet from 'react-native-extended-stylesheet';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

export default class ContactsScreen extends React.Component {

    componentDidMount() {
        // Register the alert located on this master page
        // This MessageBar will be accessible from the current (same) component, and from its child component
        // The MessageBar is then declared only once, in your main component.
        MessageBarManager.registerMessageBar(this.refs.alert);
    }
    
    componentWillUnmount() {
        // Remove the alert located on this master page from the manager
        MessageBarManager.unregisterMessageBar();
    }

    state = {
        disabled: true,
        people:
        [
            {
                "name": "Mark Brown",
                "location": "71 Pilgrim Ave. Chevy Chase, MD",
                "imagepath": require("../assets/images/markbrown.jpg"),
                "card":{
                    "position":"Chief Operating Officer",
                    "website":"gsb.com",
                    "buisname":"Global Secure Bank",
                    "phonenum":"(213)6129713",
                    "name":"Mark Brown",
                    "email":"brownmark@gsb.com",
                    "address":"71 Pilgrim Ave. Chevy Chase, MD",
                    "cardnum": 1
                }
            },
            {
                "name": "Brian Amin",
                "location": "3052 Parker Dr. Akron, OH",
                "imagepath": require("../assets/images/brianamin.jpg"),
                "card":{
                    "position":"Project Manager",
                    "website":"polyend.com",
                    "buisname":"Polyend Deseign",
                    "phonenum":"(330)6510981",
                    "name":"Brian Amin",
                    "email":"brian.amin@gmail.com",
                    "address":"3052 Parker Dr. Akron, OH",
                    "cardnum": 2
                }
            },
            {
                "name": "Mary Lewis",
                "location": "4 Goldfield Rd. Honolulu, HI",
                "imagepath": require("../assets/images/marylewis.jpg"),
                "card":{
                    "position":"VP of Engineering",
                    "website":"arkp.net",
                    "buisname":"Ark Petrol",
                    "phonenum":"(541)9241536",
                    "name":"Mary Lewis",
                    "email":"mlewis1@arkp.net",
                    "address":"4 Goldfield Rd. Honolulu, HI",
                    "cardnum": 3
                }
            },
            {
                "name": "David Rodriguez",
                "location": "44 Shirley Ave. West Chicago, IL",
                "imagepath": require("../assets/images/davidrodriguez.jpg"),
                "card":{
                    "position":"Head of Product Development",
                    "website":"zatri.net",
                    "buisname":"Zatri Co.",
                    "phonenum":"(338)1459857",
                    "name":"David Rodriguez",
                    "email":"djrodriguez@zatri.net",
                    "address":"44 Shirley Ave. West Chicago, IL",
                    "cardnum": 4
                }
            },
            {
                "name": "Frank Barnes",
                "location": "530 Winding Way Reynoldsburg, OH",
                "imagepath": require("../assets/images/frankbarnes.jpg"),
                "card":{
                    "position":"Sales Director",
                    "website":"shop.vindu.com",
                    "buisname":"Vindu",
                    "phonenum":"(330)2523647",
                    "name":"Frank Barnes",
                    "email":"barnes2@gmail.com",
                    "address":"530 Winding Way Reynoldsburg, OH",
                    "cardnum": 5
                }
            }
        ],
        activity:
        [
            {
                connector: "Brian Amin",
                connectee: "Software Developer",
                connectorpath: require("../assets/images/brianamin.jpg"),
                time: "21m"
            },
            {
                connector: "Mark Brown",
                connectee: "Marketing Supervisor",
                connectorpath: require("../assets/images/markbrown.jpg"),
                time: "3h"
            },
            {
                connector: "Frank Barnes",
                connectee: "Social Media Manager",
                connectorpath: require("../assets/images/frankbarnes.jpg"),
                time: "8h"
            }
        ]
    }

    popupRelatedConnect = null

    onPressHandle(key) {
        this.popupRelatedConnect = key
        this.popupDialog.show()
    }

    initiate = false

    _handleCheck(val, item) {
        if (!this.initiate) {
            for (let index = 0; index < this.state.people.length; index++) {
                this.trackContactChecks[index] = false
            }
            this.initiate = true
        }
        this.trackContactChecks[item.index] = val
        isCheck = false
        for (let index = 0; index < this.state.people.length; index++) {
            if (this.trackContactChecks[index]) {
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

    _handleRecommendation() {
        numberOfRecs = 0
        for (let index = 0; index < this.state.people.length; index++) {
            if (this.trackContactChecks[index])
                numberOfRecs += 1
        }
        descriptor = " people"
        if (numberOfRecs == 1) {
            descriptor = " person"
        }
        this[this.popupRelatedConnect].addActivity("You recommended " + numberOfRecs + descriptor + "!")
        this.popupDialog.dismiss()
        MessageBarManager.showAlert({
            title: 'Recommended!',
            message: 'You recommended ' + numberOfRecs + descriptor + " to " + this[this.popupRelatedConnect].props.connector + " for a " + this[this.popupRelatedConnect].props.connectee,
            alertType: 'info',
            viewTopOffset : 35
            // See Properties section for full customization
            // Or check `index.ios.js` or `index.android.js` for a complete example
        });
    }

    trackContactChecks = {

    }

    _renderItem = (item) => (
        <Grid>
            <Col size={75}>
                <PersonCard
                    name={item.item.name}
                    card={item.item.card}
                    location={item.item.location}
                    imagepath={item.item.imagepath}
                />
            </Col>
            <Col size={25}>
                <CheckBox
                    style={{left: '45%', flex: 1, top: '15%'}}
                    onChange={(val) => this._handleCheck(val, item)}
                    checked={false}
                    checkedColor={$primaryBlue}
                    uncheckedColor={$lightGray}
                    iconName='matMix'
                />
            </Col>
        </Grid>
        
    )

    _keyExtractor = (item, index) => index;

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <Header title={'Activity'}/>
                <View style={{
                    borderBottomColor: '#003E5B',
                    borderBottomWidth: 4,
                    shadowOffset: { width: 0, height:2.8 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1}}/>
                <ScrollView style={{ flex: 1, marginTop: 6 }}>
                    {this.state.activity.map((ref, key) =>
                        <ActivityCard
                        key={key}
                        ref={(card) => {this[key] = card}}
                        connector={ref.connector}
                        connectee={ref.connectee}
                        connectorpath={ref.connectorpath}
                        time={ref.time}
                        navigate={this.onPressHandle.bind(this, key)}/>
                    )}
                </ScrollView>
                <PopupDialog
                    dialogTitle={<DialogTitle title="Recommend a Contact" />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    height={0.65}
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
                                    text="Recommend"
                                    onPress={() => {
                                        this._handleRecommendation();
                                    }}
                                    key="button-2"
                                />
                            </Row>
                        </Grid>]
                    }
                    >
                    <View>
                        <FlatList
                            height={'78%'}
                            data={this.state.people}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </View>
                </PopupDialog>
                <MessageBarAlert ref="alert" />
            </Container>
        )
    }
}