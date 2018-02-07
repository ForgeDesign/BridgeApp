import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, FlatList } from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { ProfileActivity } from '../components/ProfileActivity'
import { createFilter } from 'react-native-search-filter';
import { PersonCard } from '../components/PersonCard';
import { Col, Row, Grid } from "react-native-easy-grid";
import Checkbox from '../components/Checkbox'
import EStyleSheet from 'react-native-extended-stylesheet';
import Prompt from 'rn-prompt';
import StatusBarAlert from 'react-native-statusbar-alert';
import { SearchBar } from 'react-native-elements'
import { Fab, Icon } from 'native-base';
import store from 'react-native-simple-store';
const KEYS_TO_FILTERS = ['name', 'location', 'card.position', 'card.website', 'card.businame', 'card.phonenum', 'card.email', 'card.cardnum'];

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

export default class IsoScreen extends React.Component {

    constructor(props) {
        super(props)
        var a = new Date();
        a.setMinutes(a.getMinutes() - 43);
        var b = new Date();
        b.setHours(b.getHours() - 2);
        var c = new Date();
        c.setHours(c.getHours() - 5);
        this.state = {
            checked: false,
            disabled: true,
            alertMessage: "",
            alertVisible: false,
            promptVisible: false,
            searchTerm: '',
            contactName: 'fox-hunter5',   
            people:
            [
                {
                    "name": "Mark Brown",
                    "location": "71 Pilgrim Ave. Chevy Chase, MD",
                    "imagepath": require("../assets/images/markbrown.jpg"),
                    "card":{
                        "position":"Chief Operating Officer",
                        "website":"gsb.com",
                        "businame":"Global Secure Bank",
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
                        "businame":"Polyend Deseign",
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
                        "businame":"Ark Petrol",
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
                        "businame":"Zatri Co.",
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
                        "businame":"Vindu",
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
                    text: "is looking for a",
                    connectee: "Software Developer",
                    icon: "",
                    image: "brianamin",
                    time: a.toString()
                },
                {
                    connector: "Mark Brown",
                    text: "is looking for a",
                    connectee: "Marketing Supervisor",
                    icon: "",
                    image: "markbrown",
                    time: b.toString()
                },
                {
                    connector: "Frank Barnes",
                    text: "is looking for a",
                    connectee: "Social Media Manager",
                    icon: "",
                    image: "frankbarnes",
                    time: c.toString()
                }
            ]
        }
    }

    searchUpdated(term) {
        for (let index = 0; index < this.state.people.length; index++) {
            if(this["check" + index] != null)
                this["check" + index].uncheck()
        }
        this.setState({ searchTerm: term })
    }

    makeAlertAppear(message) {
        this.setState({alertVisible: true, alertMessage: message})
        this.setState({searchTerm: ''})
    }
    makeAlertDisappear() {
        this.setState({searchTerm: ''})
        this.setState({alertVisible: false})
    }

    popupRelatedConnect = null

    onPressHandle(key) {
        this.popupRelatedConnect = key
        console.log(key)
        console.log(this.trackContactChecks[key])
        if (this.trackContactChecks[key] == undefined) {
            this.trackContactChecks[key] = {}
            for (let index = 0; index < this.state.people.length; index++) {
                this.trackContactChecks[key][index] = false
            }
        }
        else {
            for (let index = 0; index < this.state.people.length; index++) {
                if (this.trackContactChecks[key][index]) {
                    if(this["check" + index] != null)
                        this["check" + index].check()
                }
                else {
                    if(this["check" + index] != null)
                        this["check" + index].uncheck()
                }
            }
        }

        this.setState({searchTerm: ''})
        this.popupDialog.show()
    }

    _handleCheck(val, item) {
        this.trackContactChecks[this.popupRelatedConnect][item.index] = val
        isCheck = false
        for (let index = 0; index < this.state.people.length; index++) {
            if (this.trackContactChecks[this.popupRelatedConnect][index]) {
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
            if (this.trackContactChecks[this.popupRelatedConnect][index])
                numberOfRecs += 1
        }
        descriptor = " people"
        if (numberOfRecs == 1) {
            descriptor = " person"
        }
        this[this.popupRelatedConnect].addActivity("You recommended " + numberOfRecs + descriptor + "!")
        
        for (let index = 0; index < this.state.people.length; index++) {
            if(this["check" + index] != null)
                this["check" + index].uncheck()
        }

        this.setState({searchTerm: ''})
        this.search.clearText();
        this.popupDialog.dismiss()
        this.makeAlertAppear("You recommended " + numberOfRecs + descriptor + " to " + this[this.popupRelatedConnect].props.connector + " for a " + this[this.popupRelatedConnect].props.connectee + "!")
        
        var d = new Date();
        obj = {
            connector: "You",
            text: "recommended " + numberOfRecs + descriptor + " to " + this[this.popupRelatedConnect].props.connector + " for a",
            connectee: this[this.popupRelatedConnect].props.connectee,
            icon: "md-time",
            image: "",
            time: d.toString()
        }
        store.push('activity', obj)
        
        setTimeout(() => {
            this.makeAlertDisappear()
        }, 2000)
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
                <Checkbox
                    style={{left: '45%', flex: 1, top: '15%'}}
                    onChange={(val) => this._handleCheck(val, item)}
                    checked={false}
                    ref={(check) => {this["check" + item.index] = check}}
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
        const filteredPeople = this.state.people.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        return (
            <Container>
                <StatusBarAlert
                    visible={this.state.alertVisible}
                    backgroundColor={$alertSuccess}
                    color="white"
                    height={60}
                    >
                    <Text style={{color: $offwhite, marginBottom: 10, marginLeft: 10, marginRight: 10, textAlign: 'center'}}> {this.state.alertMessage} </Text>
                </StatusBarAlert>
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
                        <ProfileActivity
                        key={key}
                        ref={(card) => {this[key] = card}}
                        connector={ref.connector}
                        text={ref.text}
                        connectee={ref.connectee}
                        image={ref.image}
                        recommend={true}
                        time={ref.time}
                        navigate={this.onPressHandle.bind(this, key)}/>
                    )}
                </ScrollView>

                <Fab
                active={this.state.active}
                direction='up'
                style={{backgroundColor: $primaryBlue}}
                position='bottomRight'
                onPress={() => this.setState({ promptVisible: true }) }>
                <Icon name="md-add"/>
                </Fab>
                <Prompt
                title="What are you looking for?"
                placeholder="a marketing director"
                visible={this.state.promptVisible}
                onCancel={() => {
                        this.setState({
                            promptVisible: false
                        });
                    }
                }
                onSubmit={(value) => {
                    if (value == ' ' || value == '    ' || value == '   ' || value == '  ' || value == '') {
                        this.setState({
                            promptVisible: false,
                        });
                    }
                    else {
                        this.setState({
                            promptVisible: false,
                            contactName: value
                        });
                        {
                            store.get('profileImage').then((imageSrc) => {
                                if (imageSrc!==null){
                                    var d = new Date();
                                    obj = {
                                        connector: "You",
                                        text: "are looking for",
                                        connectee: value.toLowerCase(),
                                        icon: "",
                                        image: imageSrc.profilePic,
                                        time: d.toString()
                                    }
                                    console.log(imageSrc.profilePic)
                                    store.push('activity', obj)
                                    this.state.activity.unshift(obj)
                                    this.makeAlertAppear("Successfully posted your search request!"); setTimeout(() => { this.makeAlertDisappear() }, 2000) 
                                }
                                else {
                                    var d = new Date();
                                    obj = {
                                        connector: "You",
                                        text: "are looking for",
                                        connectee: value.toLowerCase(),
                                        icon: "md-person",
                                        image: "",
                                        time: d.toString()
                                    }
                                    store.push('activity', obj)
                                    this.state.activity.unshift(obj)
                                    this.makeAlertAppear("Successfully posted your search request!"); setTimeout(() => { this.makeAlertDisappear() }, 2000) 
                                }
                            });
                        }
                    }
                }
                } />

                <PopupDialog
                    dialogTitle={<DialogTitle title="Recommend a Contact" />}
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
                                        isRecommendations = false
                                        for (let index = 0; index < this.state.people.length; index++) {
                                            if (this.trackContactChecks[this.popupRelatedConnect][index]) {
                                                isRecommendations = true
                                                break
                                            }
                                        }
                                        if (!isRecommendations) {
                                            this[this.popupRelatedConnect].addActivity("")
                                        }
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
                        <SearchBar
                            round
                            ref={search => this.search = search}
                            showLoading
                            clearIcon
                            cancelButtonTitle="Cancel"
                            icon={{ type: 'font-awesome', name: 'search' }}
                            onChangeText={(term) => { this.searchUpdated(term) }} 
                            onClearText={() => this.setState({searchTerm:''})}
                            inputStyle={{
                                backgroundColor: $offwhite
                            }}
                            containerStyle={{
                                borderRadius: 0,
                                borderWidth: 0,
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                                padding: 0,
                                margin: 0,
                                backgroundColor: 'white'}}
                            placeholder="Type anything to search"
                        />
                        <FlatList
                            height={'68%'}
                            data={filteredPeople}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </View>
                </PopupDialog>
            </Container>
        )
    }
}