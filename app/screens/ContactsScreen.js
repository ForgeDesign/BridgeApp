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
            {
                'C': [
                    {
                        "person": "uFMPJdt0hidaQN458StwnKx3NP32",
                        "location": "1001 Bridge Card Lane, OH",
                        "card":"-L82ptyd00cxneD_vabR",                        
                    }
                ],
            },
            active: true,
            isModalVisible:false,
            searchTerm: '',
            promptVisible: false,    
            alertVisible: false,
            contactName: 'fox-hunter5',
            ready: false,
            peopleFound: {
                'A': [],
                'B': [],
                'C': [],
                'D': [],
                'E': [],
                'F': [],
                'G': [],
                'H': [],
                'I': [],
                'J': [],
                'K': [],
                'L': [],
                'M': [],
                'N': [],
                'O': [],
                'P': [],
                'Q': [],
                'R': [],
                'S': [],
                'T': [],
                'U': [],
                'V': [],
                'W': [],
                'X': [],
                'Y': [],
                'Z': [],
            }
        };
    }

    componentDidMount() {
        foundPeople = {
            'A': [],
            'B': [],
            'C': [],
            'D': [],
            'E': [],
            'F': [],
            'G': [],
            'H': [],
            'I': [],
            'J': [],
            'K': [],
            'L': [],
            'M': [],
            'N': [],
            'O': [],
            'P': [],
            'Q': [],
            'R': [],
            'S': [],
            'T': [],
            'U': [],
            'V': [],
            'W': [],
            'X': [],
            'Y': [],
            'Z': [],
        }
        var peopleObj = {}
        rootRef.child(firebase.auth().currentUser.uid + "people").once().then(val => {
            val.forEach(child => {
                peopleObj[child.key] = child.val()
            })
            if(Object.keys(peopleObj).length == 0) {
                rootRef.child(firebase.auth().currentUser.uid + "people").update(this.state.peopleFound)
                return
            }

            for (let index = 0; index < Object.keys(peopleObj).length; index++) {
                const sectionKey = Object.keys(peopleObj)[index]
                const section = peopleObj[Object.keys(peopleObj)[index]];
                for (let index2 = 0; index2 < section.length; index2++) {
                    const person = section[index2];
                    var pathPerson = person.person + "person/"
                    var pathCard = person.person + "cards/" + person.card
                    rootRef.child(pathCard).once().then(val => {
                        var card = val._value
                        rootRef.child(pathPerson).once().then(val => {
                            var personFound = val._value
                            obj = {
                                card: card,
                                name: personFound.displayName,
                                location: person.location,
                                imagepath: personFound.photoURL
                            }
                            foundPeople[sectionKey].push(obj)
                        })
                    })
                }
            }

           
        }).then(() => {
            this.setState({people: peopleObj, peopleFound: foundPeople, filteredPeople: foundPeople, ready: true}, () => {
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
                    this.forceUpdate()
            
                }.bind(this), 400);
                   
            });
        })
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
                        && person.card.position.toLowerCase().indexOf(term.toLowerCase()) == -1
                        && person.card.website.toLowerCase().indexOf(term.toLowerCase()) == -1
                        && person.card.businame.toLowerCase().indexOf(term.toLowerCase()) == -1
                        && person.card.phonenum.toLowerCase().indexOf(term.toLowerCase()) == -1
                        && person.card.email.toLowerCase().indexOf(term.toLowerCase()) == -1
                    ) {
                        filteredPeople[key][index] = undefined
                    }
                }, this)
            }
        }, this)

        this.setState({ searchTerm: term, filteredPeople: filteredPeople })
    }

    renderRow = (person, sectionId, index) => {
        console.log(person, sectionId, index)
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
        return (
            <Text style={{fontSize: 16, fontWeight: 'bold', color: $primaryBlue, marginRight: 15, marginBottom: 3}}> 
                {test.sectionId}
            </Text>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            // here we are in screen
            // rootRef.child(firebase.auth().currentUser.uid + "people").once().then(val => {
            //     var peopleObj = {}
            //     val.forEach(child => {
            //         peopleObj[child.key] = child.val()
            //     })
            //     this.setState({people: peopleObj});
            // })
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
                </Container>
            )
        }

        console.log(this.state.filteredPeople)

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
                    data={this.state.filteredPeople}       // required array|object
                    renderRow={this.renderRow}  // required func
                    rowHeight={150}              // required number
                    sectionHeaderHeight={5}    // required number
                    sectionHeader={this.sectionHeader}
                    removeClippedSubviews={false}
                    sectionListStyle={{backgroundColor: 'rgba(255, 255, 255, 0.0)'}}
                    sectionListItem={this.sectionListItem}
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
