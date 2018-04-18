import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, Dimensions, TouchableOpacity, Modal, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { SearchBar } from 'react-native-elements'
import { Fab, Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { PersonCard } from '../components/PersonCard';
import AtoZListView from 'react-native-atoz-listview';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import Prompt from 'rn-prompt';
import StatusBarAlert from 'react-native-statusbar-alert';
const myWidth = Dimensions.get('window').width;
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

class ContactsScreen extends React.Component {

    _showModal = () => { this.setState({ isModalVisible: true }) }
    _hideModal = () => { this.setState({ isModalVisible: false }) }

    constructor(){
        super();

        this.state = {
            people: 
            [
                {
                    "person": "uFMPJdt0hidaQN458StwnKx3NP32",
                    "location": "1001 Bridge Card Lane, OH",
                    "card":[{id: "-L82ptyd00cxneD_vabR", notes: ""}],
                }
            ],
            active: true,
            isModalVisible:false,
            searchTerm: '',
            promptVisible: false,    
            alertVisible: false,
            contactName: 'fox-hunter5',
            ready: false,
            peopleFound: { }
        };
    }

    componentDidMount() {
        this.getPeople().then(peopleObj => {
            this.getCards(peopleObj).then(foundPeople => {
                this.setState({people: peopleObj, peopleFound: foundPeople, filteredPeople: foundPeople, ready: true})
            })
        })
    }

    getCards(peopleObj) {
        return new Promise((resolve, reject) => {
            foundPeople = { "A": [], "B": [], "C": [], 'D': [], 'E': [], 'F': [], 'G': [], 
                            'H': [], 'I': [], 'J': [], 'K': [], 'L': [], 'M': [], 'N': [], 'O': [], 
                            'P': [], 'Q': [], 'R': [], 'S': [], 'T': [], 'U': [], 'V': [], 'W': [], 
                            'X': [], 'Y': [], 'Z': []}
            promises = []
            for (let index = 0; index < peopleObj.length; index++) {
                const person = peopleObj[index];
                var pathPerson = person.person + "person/"
                promises.push(this.getSinglePerson(pathPerson, person))
            }
            Promise.all(promises).then(data => {
                var allPeople = data
                for (let index = 0; index < data.length; index++) {
                    const person = data[index];
                    for (let index2 = 0; index2 < person.card.length; index2++) {
                        const card = person.card[index2];
                        Promise.resolve(card).then(val => {
                            allPeople[index].card[index2] = val
                        })
                    }
                }
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    if (foundPeople[element.sectionKey] == undefined)
                        foundPeople[element.sectionKey] = Array()
                    foundPeople[element.sectionKey].push(element)
                }
                resolve(foundPeople)
            }).catch(test => {
                console.log(test)
            })
        });
    }

    getSinglePerson(pathPerson, person) {
        return new Promise((resolve, reject) => {
            rootRef.child(pathPerson).once().then(val => {
                var personFound = val._value
                var firstLast = personFound.displayName.split(" ")
                var sectionKey = firstLast[firstLast.length - 1][0]
                obj = {
                    name: personFound.displayName,
                    location: person.location,
                    imagepath: personFound.photoURL,
                    sectionKey: sectionKey,
                    card: []
                }
                for (let index = 0; index < person.card.length; index++) {
                    const element = person.card[index];
                    var pathCard = person.person + "cards/" + element.id
                    obj.card.push(this.getSingleCard(pathCard))
                }
                resolve(obj)
            })
        });
    }

    getSingleCard(pathCard) {
        return new Promise((resolve, reject) => {
            rootRef.child(pathCard).once().then(val => {
                var card = val._value
                resolve(card)
            })
        });
    }

    getPeople() {
        return new Promise((resolve, reject) => {
            peopleObj = []
            rootRef.child(firebase.auth().currentUser.uid + "people").once().then(val => {
                val.forEach(child => {
                    peopleObj.push(child.val())
                })
                if(peopleObj.length == 0) {
                    rootRef.child(firebase.auth().currentUser.uid + "people").set(this.state.people)
                    peopleObj = JSON.parse(JSON.stringify(this.state.people))
                }
            }).then(() => {
                resolve(peopleObj)
            })
        });
    }

    makeAlertAppear() {
        this.setState({alertVisible: true})
    }
    makeAlertDisappear() {
        this.setState({alertVisible: false})
    }

    searchUpdated(term) {
        const filteredPeople = JSON.parse(JSON.stringify(this.state.peopleFound))
        peopleFound = this.state.peopleFound
        Object.keys(peopleFound).filter(key => {
            for (let index = 0; index < peopleFound[key].length; index++) {
                peopleFound[key].map((person, index) => {
                    if (
                        person.name.toLowerCase().indexOf(term.toLowerCase()) == -1 
                        && person.location.toLowerCase().indexOf(term.toLowerCase()) == -1
                    ) {
                        notFound = false
                        for (let cardIndex = 0; cardIndex < person.card.length; cardIndex++) {
                            const card = person.card[cardIndex]
                            if (card.position.toLowerCase().indexOf(term.toLowerCase()) == -1
                            && card.website.toLowerCase().indexOf(term.toLowerCase()) == -1
                            && card.businame.toLowerCase().indexOf(term.toLowerCase()) == -1
                            && card.phonenum.toLowerCase().indexOf(term.toLowerCase()) == -1
                            && card.email.toLowerCase().indexOf(term.toLowerCase()) == -1)
                            {
                                notFound = true
                            }
                            else {
                                notFound = false
                                break
                            }
                        }
                        if (notFound)
                            filteredPeople[key][index] = undefined
                    }
                }, this)
            }
        }, this)

        this.setState({ searchTerm: term, filteredPeople: filteredPeople })
    }

    renderRow = (person, sectionId, index) => {

        if (person == undefined)
            return(<View/>)

        return (
            <PersonCard
                containerStyle={{width: 10}}
                key={sectionId + '' + index}
                section={person.card.fireKey}
                index={index}
                name={person.name}
                card={person.card}
                location={person.location}
                imagepath={person.imagepath}
            />
        )
    }

    sectionHeader(test) {
        
        if (this.state.peopleFound[test.title].length == 0) {
            return <View/>
        }
        return (
            <Text containerStyle={{backgroundColor: 'rgba(255, 255, 255, 0.0)'}} style={{textAlign: "center", color: $inputText}}> {test.title} </Text>
        )
    }

    sectionListItem(test) {
        return (
            <Text style={{fontSize: 16, fontWeight: 'bold', color: $primaryBlue, marginRight: 15, marginBottom: 3}}> 
                {test.sectionId}
            </Text>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            // here we are in screen
            this.getPeople().then(peopleObj => {
                this.getCards(peopleObj).then(foundPeople => {
                    this.setState({people: peopleObj, peopleFound: foundPeople, filteredPeople: foundPeople, ready: true})
                })
            })
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // NOT HERE
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        if (!this.state.ready) {
            return (
                <Container>
                    <StatusBarAlert
                        visible={this.state.alertVisible}
                        message="Bridge Card Added!"
                        backgroundColor={$alertSuccess}
                        color="white"
                        height={35}
                    />
            
                    <Header title={'Bridges'} plus={() => this.setState({ promptVisible: true }) }/>   
    
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
                            bottom: 20,
                            backgroundColor: $primaryBlue}}
                        placeholder="Type anything to search"
                    />
    
                    <View style={{
                    bottom: 20,
                    borderBottomColor: '#003E5B',
                    borderBottomWidth: 4,
                    shadowOffset: { width: 0, height:2.8 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1}}/>

                    <ActivityIndicator size="small" color="#003E5B" />
                </Container>
            )
        }

        return (
            <Container>
                <StatusBarAlert
                    visible={this.state.alertVisible}
                    message="Bridge Card Added!"
                    backgroundColor={$alertSuccess}
                    color="white"
                    height={35}
                />
        
                <Header title={'Bridges'} plus={() => this.setState({ promptVisible: true }) }/>   

                <SearchBar
                    round
                    showLoading
                    clearIcon
                    cancelButtonTitle="Cancel"
                    icon={{ type: 'font-awesome', name: 'search' }}
                    onChangeText={(term) => { this.searchUpdated(term) }} 
                    onClearText={() => this.searchUpdated("") }
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
                        bottom: 20,
                        backgroundColor: $primaryBlue}}
                    placeholder="Type anything to search"
                />

                <View style={{
                bottom: 20,
                borderBottomColor: '#003E5B',
                borderBottomWidth: 4,
                shadowOffset: { width: 0, height:2.8 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1}}/>

                <AtoZListView
                    style={{ marginTop: 16, bottom: 30 }}
                    data={this.state.filteredPeople}        // required array|object
                    renderRow={this.renderRow}              // required func
                    rowHeight={150}                         // required number
                    sectionHeaderHeight={5}                 // required number
                    sectionHeader={this.sectionHeader.bind(this)}
                    removeClippedSubviews={false}
                    sectionListStyle={{backgroundColor: 'rgba(255, 255, 255, 0.0)'}}
                    sectionListItem={this.sectionListItem}
                    enableEmptySections={true}
                />

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
                            rootRef.child(firebase.auth().currentUser.uid + "activity").push(obj)
                            this.makeAlertAppear(); setTimeout(() => { this.makeAlertDisappear() }, 2000) 
                        }
                    }
                }
                } />
            </Container>
        )
    }
}

export default withNavigationFocus(ContactsScreen, 'Contacts')

const styles = EStyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '$offwhite',
    },
    fab: {
        backgroundColor: '$primaryBlue',
    },
});
