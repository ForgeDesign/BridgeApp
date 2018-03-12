import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, Dimensions, TouchableOpacity, Modal, KeyboardAvoidingView} from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { SearchBar } from 'react-native-elements'
import { Fab, Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { PersonCard } from '../components/PersonCard';
import AtoZListView from 'react-native-atoz-listview';
import Prompt from 'rn-prompt';
import store from 'react-native-simple-store';
import StatusBarAlert from 'react-native-statusbar-alert';
const myWidth = Dimensions.get('window').width;
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

export default class ContactsScreen extends React.Component {

    _showModal = () => { this.setState({ isModalVisible: true }) }
    _hideModal = () => { this.setState({ isModalVisible: false }) }

    constructor(){
        super();

        this.state = {
            people: 
            {
                'C': [
                    {
                        "name": "Ryan Camardo",
                        "location": "1001 Bridge Card Lane, OH",
                        "imagepath": require("../assets/images/ryan.jpg"),
                        "card":{
                            "position":"Founder",
                            "website":"bridgecardapp.com",
                            "businame":"Bridge Card",
                            "phonenum":"+1 (330) 423-5511",
                            "name":"Ryan Camardo",
                            "email":"ryan@bridgecardapp.com",
                            "address":"1001 Bridge Card Lane",
                            "city":"Bridge",
                            "founder": true,
                            "zip":"44408",
                            "stateabb":"OH",
                            "notes":"",
                            "socialMedia": {
                                linkedin: "rrcamardo",
                                instagram: "bridge_card"
                            },
                            "cardnum": 3,
                            "avatarSource": require('../assets/images/bridgelogo.jpg')
                        }
                    }
                ],
            },
            active: true,
            isModalVisible:false,
            searchTerm: '',
            promptVisible: false,    
            alertVisible: false,
            contactName: 'fox-hunter5',
        };
        // store.save('people', this.state.people)
        store.get('people').then(value => {
            console.log(value)
            if (value !== null)
                this.setState({people: value})
            else
                store.save('people', this.state.people)
        })
    }

    makeAlertAppear() {
        this.setState({alertVisible: true})
    }
    makeAlertDisappear() {
        this.setState({alertVisible: false})
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    renderRow = (person, sectionId, index) => {
        if (person == undefined)
            return(<View/>)
        return (
            <PersonCard
                containerStyle={{width: 10}}
                key={sectionId + '' + index}
                section={sectionId}
                index={index}
                name={person.name}
                card={person.card}
                location={person.location}
                imagepath={person.imagepath}
            />
        )
    }

    sectionHeader(test) {
        return (
            <Text containerStyle={{backgroundColor: 'rgba(255, 255, 255, 0.0)'}} style={{textAlign: "center", color: $inputText}}> {test.title} </Text>
        )
    }

    sectionListItem(test) {
        console.log(test)
        return (
            <Text style={{fontSize: 16, fontWeight: 'bold', color: $primaryBlue, marginRight: 15, marginBottom: 3}}> 
                {test.sectionId}
            </Text>
        )
    }

    render() {
        const { navigate } = this.props.navigation;        
        const filteredPeople = JSON.parse(JSON.stringify(this.state.people))
        Object.keys(this.state.people).filter(key => 
            this.state.people[key].map((person, index) => {
                if (
                    person.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) == -1 
                    && person.location.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) == -1
                    && person.card.position.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) == -1
                    && person.card.website.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) == -1
                    && person.card.businame.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) == -1
                    && person.card.phonenum.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) == -1
                    && person.card.email.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) == -1
                ) {
                    filteredPeople[key][index] = undefined
                }
            })
        )
        return (
            <Container>
                <StatusBarAlert
                    visible={this.state.alertVisible}
                    message="Bridge Card Added!"
                    backgroundColor={$alertSuccess}
                    color="white"
                    height={35}
                />
        
                <Header title={'Contacts'} />   

                <SearchBar
                    round
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
                        bottom: 30,
                        backgroundColor: $primaryBlue}}
                    placeholder="Type anything to search"
                />

                <View style={{
                bottom: 30,
                borderBottomColor: '#003E5B',
                borderBottomWidth: 4,
                shadowOffset: { width: 0, height:2.8 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1}}/>

                <AtoZListView
                    style={{ marginTop: 6, bottom: 30 }}
                    data={filteredPeople}       // required array|object
                    renderRow={this.renderRow}  // required func
                    rowHeight={150}              // required number
                    sectionHeaderHeight={5}    // required number
                    sectionHeader={this.sectionHeader}
                    removeClippedSubviews={false}
                    sectionListStyle={{backgroundColor: 'rgba(255, 255, 255, 0.0)'}}
                    sectionListItem={this.sectionListItem}
                />

                <Fab
                active={this.state.active}
                direction='up'
                style={styles.fab}
                position='bottomRight'
                onPress={() => this.setState({ promptVisible: true }) }>
                <Icon name="md-add"/>
                </Fab>
                <Prompt
                title="Type in the BridgeCard code. "
                placeholder="fox-hunter5"
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
                            var d = new Date();
                            obj = {
                                connector: "You",
                                text: "bridged with",
                                connectee: "Anew Person",
                                icon: "",
                                image: "jamessmith",
                                time: d.toString()
                            }
                            store.push('activity', obj)
                            this.makeAlertAppear(); setTimeout(() => { this.makeAlertDisappear() }, 2000) 
                        }
                    }
                }
                } />
            </Container>
        )
    }
}

const styles = EStyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '$offwhite',
    },
    fab: {
        backgroundColor: '$primaryBlue',
    },
});
