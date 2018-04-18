import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, FlatList, RefreshControl } from 'react-native';
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

import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

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
            refreshing: false,
            contactName: 'fox-hunter5',   
            people: [ ],
            foundISO: [],
            yourISO: [],
            activity:
            [
            ]
        }
    }

    componentWillMount() {

        foundISO = []
        rootRef.child(firebase.auth().currentUser.uid + "iso").once().then(val => {
            var iso = []
            val.forEach(child => {
                iso.push(child.val())
            })

            rootRef.child(firebase.auth().currentUser.uid + "people").once().then(val => {
                var people = []
                val.forEach(child => {
                    if(child.val().person != firebase.auth().currentUser.uid)
                        people.push(child.val())
                })

                var promises = []
                for (let index = 0; index < people.length; index++) {
                    const element = people[index];
                    promises.push(
                        rootRef.child(element.person + "iso").once()
                    )
                }
                Promise.all(promises).then( (val) => {
                    val.forEach((child) => {
                        if(child.val() != null) {
                            const personUID = child.key.substring(0, child.key.length - 3)
                            
                            rootRef.child(personUID + "person").once().then(person => {
                                for (let pIndex = 0; pIndex < Object.keys(child.val()).length; pIndex++) {
                                    var personISO = child.val()[Object.keys(child.val())[pIndex]]
                                    personISO.connector = person.val().displayName
                                    personISO.text = "is looking for"
                                    personISO.image = person.val().photoURL
                                    foundISO.push(personISO)
                                }
                                this.setState({activity: iso.concat(foundISO), yourISO: iso, foundISO: foundISO})
                                this._onRefresh()
                            })
                        }
                    })
                })

            })
        })
    }

    getPersonFromArray(array, uid) {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element.person == uid)
                return index
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
        rootRef.child(firebase.auth().currentUser.uid + "activity").push(obj)

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
                    section={item.item.section}
                    index={item.item.index}
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

    activityExtractor = (item, index) => index;

    activityRendererererer(ref, key) {
        return(
            <ProfileActivity
            key={ref.index}
            ref={(card) => {this[ref.index] = card}}
            connector={ref.item.connector}
            text={ref.item.text}
            connectee={ref.item.connectee}
            image={ref.item.image}
            iso={true}
            recommend={true}
            time={ref.item.time}
            navigate={this.onPressHandle.bind(this, ref.index)}/>
        )
    }

    _onRefresh() {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false});
        },300);
    }

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
                <Header title={'Search Board'} plus={() => this.setState({ promptVisible: true })}/>
                <View style={{
                    borderBottomColor: '#003E5B',
                    borderBottomWidth: 4,
                    shadowOffset: { width: 0, height:2.8 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1}}/>

                <FlatList
                style={{ flex: 1, marginTop: 6 }}
                data={this.state.activity}
                keyExtractor={this.activityExtractor}
                renderItem={this.activityRendererererer.bind(this)}
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh.bind(this)}
                    />
                  }
                />

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
                            imageSrc = firebase.auth().currentUser.photoURL
                            var d = new Date();
                            obj = {}
                            if (imageSrc != null){
                                obj = {
                                    connector: "You",
                                    text: "are looking for",
                                    connectee: value.toLowerCase(),
                                    icon: "",
                                    image: imageSrc,
                                    time: d.toString()
                                }
                            }
                            else {
                                obj = {
                                    connector: "You",
                                    text: "are looking for",
                                    connectee: value.toLowerCase(),
                                    icon: "md-person",
                                    image: "",
                                    time: d.toString()
                                }
                            }

                            // MARK - HAVE TO INCLUDE LOGIC TO IMPLEMENT ISO IN DATABSE
                            //
                            //
                            //
                            //
                            //
                            //
                            //
                            rootRef.child(firebase.auth().currentUser.uid + "activity").push(obj)
                            rootRef.child(firebase.auth().currentUser.uid + "iso").push(obj)
                            this.state.activity.unshift(obj)
                            this.makeAlertAppear("Successfully posted your search request!"); setTimeout(() => { this.makeAlertDisappear() }, 2000) 
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