import React, { Component } from 'react';
import { View, Text, Alert, AppRegistry, ScrollView, Dimensions, TouchableOpacity, Modal, KeyboardAvoidingView, ActivityIndicator, TouchableHighlight } from 'react-native';
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
import ImagePicker from 'react-native-image-picker';
import ImageCropper from 'react-native-image-crop-picker';
import { CardInput } from '../components/CardInput';
import Swipeable from 'react-native-swipeable';

var {height, width} = Dimensions.get('window');
const myWidth = Dimensions.get('window').width;
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

class ContactsScreen extends React.Component {

    _showModal = () => { this.setState({ isModalVisible: true }) }
    _hideModal = () => { this.setState({ isModalVisible: false }) }

    constructor() {
        super();

        this.state = {
            peoplePositions: [

            ],
            people:
            [
                {
                    "person": "uFMPJdt0hidaQN458StwnKx3NP32",
                    "location": "1001 Bridge Card Lane, OH",
                    "card": [{ id: "-L82ptyd00cxneD_vabR", notes: "" }],
                }
            ],
            active: true,
            isModalVisible: false,
            searchTerm: '',
            modalVisible: false,
            alertVisible: false,
            contactName: 'fox-hunter5',
            ready: false,
            peopleFound: {},
            profilePic: undefined,
            createContact_Name: "John Doe",
            createContact_Address: "CTO",
            createContact_Business: "BridgeCard",
            createContact_Location: "Remote Connection",
            createContact_Business2: "",
            createContact_Address2: "",
            createContact_Name2: "",
            editKey: "",
            editSection: "",
            editIndex: "",
            modalVisible2: false
        };
        // this.addProfilePic = this.addProfilePic.bind(this);

    }
    options =
    {
        title: 'Select New Contact Business Card',
        noData: true,
        storageOptions:
        {
            skipBackup: true,
            path: 'images',
            waitUntilSaved: true
        }
    };

    async openFromLibrary() {
        ImageCropper.openPicker({
            compressImageQuality: 1.0,
            includeBase64: true,
            // path: source,
            width: 355,
            cropping: true,
            height: 202.35,
            cropperCircleOverlay: false
        }).then(image => {
            based64 = "data:" + image.mime + ";base64," + image.data
            this.setState({ profilePic: based64 });
            this.setState({ modalVisible: true });

            // firebase.auth().currentUser.updateProfile({photoURL: based64})
            // var pathPerson = firebase.auth().currentUser.uid + "person/photoURL"
            // rootRef.child(pathPerson).set(based64)
        });
    }

    async openFromCamera() {
        ImageCropper.openCamera({
            compressImageQuality: 1.0,
            includeBase64: true,
            // path: source,
            width: 355,
            cropping: true,
            height: 202.35,
            cropperCircleOverlay: false
        }).then(image => {
            based64 = "data:" + image.mime + ";base64," + image.data
            this.setState({ profilePic: based64 });
            this.setState({ modalVisible: true });

            // firebase.auth().currentUser.updateProfile({photoURL: based64})
            // var pathPerson = firebase.auth().currentUser.uid + "person/photoURL"
            // rootRef.child(pathPerson).set(based64)
        });
    }

    async addProfilePic() {
        console.log("accessing profile pic function")
        this.openFromCamera()
    }


    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            // here we are in screen
            this.getPeople().then(peopleObj => {
                this.getCards(peopleObj).then(foundPeople => {
                    this.setState({ people: peopleObj, peopleFound: foundPeople, filteredPeople: foundPeople, ready: true })
                })
            })
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // NOT HERE
        }
    }


    componentDidMount() {
        this.getPeople().then(peopleObj => {
            this.getCards(peopleObj).then(foundPeople => {
                for (let index = 0; index < Object.keys(foundPeople).length; index++) {
                    const section = foundPeople[Object.keys(foundPeople)[index]];
                    splitThis = []
                    for (let index2 = 0; index2 < section.length; index2++) {
                        const person = section[index2];
                        if(index2 % 2 == 0) {
                            if(section[index2 + 1].key == person.key) {
                                splitThis.push(index2 + 1)
                            }
                        }
                    }
                    for (let split = 0; split < splitThis.length; split++) {
                        const element = splitThis[split];
                        foundPeople[Object.keys(foundPeople)[index]].splice(element, 1)
                    }
                }
                this.setState({ people: peopleObj, peopleFound: foundPeople, filteredPeople: foundPeople, ready: true })
                this.forceUpdate()
            })
        })
    }

    getCards(peopleObj) {
        return new Promise((resolve, reject) => {
            foundPeople = {
                "A": [], "B": [], "C": [], 'D': [], 'E': [], 'F': [], 'G': [],
                'H': [], 'I': [], 'J': [], 'K': [], 'L': [], 'M': [], 'N': [], 'O': [],
                'P': [], 'Q': [], 'R': [], 'S': [], 'T': [], 'U': [], 'V': [], 'W': [],
                'X': [], 'Y': [], 'Z': []
            }
            promises = []
            for (let index = 0; index < peopleObj.length; index++) {
                const person = peopleObj[index];
                // console.log(person)
                var pathPerson = person.person + "person/"
                promises.push(this.getSinglePerson(pathPerson, person))
            }
            Promise.all(promises).then(data => {
                var allPeople = data
                for (let index = 0; index < data.length; index++) {
                    const person = data[index];
                    if (person.person != "IMAGE")
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
            
            if(pathPerson == "IMAGEperson/") {
                var firstLast = person.displayName.split(" ")
                var sectionKey = firstLast[firstLast.length - 1][0]
                person.sectionKey = sectionKey
                resolve(person)
            }
            else {
                rootRef.child(pathPerson).once().then(val => {
                    var personFound = val._value
                    var firstLast = personFound.displayName.split(" ")
                    var sectionKey = firstLast[firstLast.length - 1][0]
                    obj = {
                        name: personFound.displayName,
                        location: person.location,
                        imagepath: personFound.photoURL,
                        sectionKey: sectionKey,
                        key: person.key,
                        card: []
                    }
                    for (let index = 0; index < person.card.length; index++) {
                        const element = person.card[index];
                        var pathCard = person.person + "cards/" + element.id
                        obj.card.push(this.getSingleCard(pathCard))
                    }
                    resolve(obj)
                })
            }
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
                    obj = child.val()
                    obj.key = child.key
                    if(child.val().person == "IMAGE")
                        obj.card[0].fireKey = child.key
                    peopleObj.push(obj)
                })
                if (peopleObj.length == 0) {
                    rootRef.child(firebase.auth().currentUser.uid + "people").set(this.state.people)
                    peopleObj = JSON.parse(JSON.stringify(this.state.people))
                }
            }).then(() => {
                resolve(peopleObj)
            })
        });
    }

    makeAlertAppear() {
        this.setState({ alertVisible: true })
    }
    makeAlertDisappear() {
        this.setState({ alertVisible: false })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
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

        // stuff = ""
        // setTimeout(() => {
        //     if(this.state.peopleFound[sectionId][index] != undefined && this.state.peopleFound[sectionId][index].card[0] != undefined && this.state.peopleFound[sectionId][index].card[0].businame != undefined)
        //         stuff = this.state.peopleFound[sectionId][index].card[0].businame .concat( " : " ) . concat( this.state.peopleFound[sectionId][index].card[0].position )
        // }, 200);

        var editImage = <View/>
        if(person.person == "IMAGE")
            editImage = <TouchableOpacity
            style={styles.button}
            onPress={() => {
                this.setState({modalVisible2: true, createContact_Address2: person.position, createContact_Business2: person.business, createContact_Name2: person.displayName, editKey: person.key, editSection: sectionId, editIndex: index})
            }}>
                <Text style={styles.buttonText}>Edit Contact</Text>
        </TouchableOpacity>

        var stuff
        if(this.state.peoplePositions[index] == undefined) {
            var thething = JSON.parse(JSON.stringify(this.state.peoplePositions))
            thething[index] = " "
            this.setState({peoplePositions: thething})
        }
        if(person.position != undefined) {
            stuff = person.business + " : " + person.position
            var thething = JSON.parse(JSON.stringify(this.state.peoplePositions))
            thething[index] = stuff
            this.setState({peoplePositions: thething})
        }

        if (person == undefined)
            return (<View />)

        return (
            <Swipeable
                ref={ref => this["swipable" + index] = ref}
                // swipeStartMinLeftEdgeClearance={50}
                rightButtons={[
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                copy = JSON.parse(JSON.stringify(this.state.peopleFound))
                                copy2 = JSON.parse(JSON.stringify(this.state.filteredPeople))
                                copy3 = JSON.parse(JSON.stringify(this.state.people))
                                var indexTop
                                for (let index = 0; index < copy3.length; index++) {
                                    const element = copy3[index];
                                    // console.log(element.key, person.key)
                                    if (element.key == person.key) {
                                        // console.log("here i am")
                                        indexTop = index
                                        break
                                    }
                                }
                                Alert.alert(
                                    'Confirm',
                                    'Are you sure you want to delete this contact?',
                                    [
                                      {text: 'Yes', onPress: () => {
                                        copy3.splice(indexTop, 1);
                                        delete copy[sectionId][index]
                                        delete copy2[sectionId][index]
                                        rootRef.child(firebase.auth().currentUser.uid + "people/" + person.key).remove()
                                        this.setState({ people: copy3, peopleFound: copy, filteredPeople: copy2 })
                                      }},
                                      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    ],
                                    { cancelable: false }
                                  )
                            }}>
                                <Text style={styles.buttonText}>Delete Contact</Text>
                        </TouchableOpacity>
                        {editImage}
                    </View>
                ]}
                rightButtonWidth={width*.4 + 30}
            >
            <PersonCard
                containerStyle={{ width: 10 }}
                ref={(ref) => this[index + "personcard"] = ref}
                key={sectionId + '' + index}
                section={person.card.fireKey}
                index={index}
                name={person.name ? person.name : person.displayName}
                card={person.card}
                imageFireKey={person.key}
                // location={this.state.peoplePositions[index]}
                imagepath={person.imagepath ? person.imagepath : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAQCAwMDAgQDAwMEBAQEBQkGBQUFBQsICAYJDQsNDQ0LDAwOEBQRDg8TDwwMEhgSExUWFxcXDhEZGxkWGhQWFxb/2wBDAQQEBAUFBQoGBgoWDwwPFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhb/wAARCAHgAeADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7+ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooqrrGpadpNi97ql9bWVvGMtNcSiNB+JoAtUV4f8Qv2qvhb4cke3066utfuU426fF+7z7yNgflmvIvFP7aHiednTw94P02yQ/de9neZx+C7RQB9m0V+f9/+1b8ZrhyYtX0u1B6CHTEOP++s1Ti/ae+NiSbv+Esgf/ZbS7fH/oFAH6GUV8E6T+1t8XrWQG6m0W/UdVl0/Zn8UYV3XhX9tS7WRU8S+B4mT+KXTrwg/Xa4/rQB9eUV4/4A/aZ+E3id0gbXH0e5fAEOqReUM+gflf1r1qwu7W+tUubK5huYJBlJYZA6sPYjg0ATUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVDf3VtZWcl3eXEcEEKlpJZWCqgHck1jfEnxl4f8AAvhafXvEV8ltawj5QT88rdlUdya+DP2i/jv4m+J2oyWkcsmm6AjfubCN8GQdmkI6n26UAe7fHf8Aa10rR5JtH+HttHql4hKtqMwP2eM/7A6v/KvlL4g+OfFvjjUmvfFGu3eoOTlY3ciKP2VBwPyrnqKACiiigAooooAKKKKAAgEYIrqPhz8RPGngS+W58L+ILuyAOWt9++GT2aM8GuXooA+zPgl+11pOqSQ6X8QrFdLuWwo1C3ybdj6svVP1FfS2k39lqenxX2nXcN1bTKGjmhcMrj2Ir8na9H+A3xo8W/C/VE/s+5a80l2BuNNncmNh3K/3T9KAP0jorjvgv8S/DPxM8Mrq2gXQ8xABc2jnEtu3ow9PeuxoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKw/iN4t0XwR4Ru/EWu3Kw2lomcZ+aRuyqO5NbNzNFb27zzyLHFEpd3Y4CgDJJr8+v2wvi9cfEnxy9hp07L4e0qQx2iA8TuODKfXPb2oA5j4+/FLXvil4xk1TU5WisYWK2FirfJAnbjux7muEoooAKKKKACiiigAooooAKKKKACiiigAooooA6P4W+N/EHw/8WweIPDt20M8RxJGT+7nTujjuDX6HfAT4n6H8UfBcWs6WwiuowEvrJm+e3k7j3B7GvzOrtPgP8RtW+GXj6217T3Z7ckJfW2flniJ5GPUdRQB+m1FZfgvxBpninwtZa/o9ws9nfQiWJgemex9x0rUoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiio7ueK2tZLmdwkUKF5HPRVAyT+VAHz1/wAFA/ic/hjwPF4M0m42alrqk3DIfmithwfpuPH518PDgV2Px98aT+P/AIs6x4kkdjBNOYrNSfuQIdqAfgM/jXHUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB9Of8E8Pie+l+JJPh1q1x/oepEy6aXbiObug9mH6ivs6vye0XULvSdYtdUsJWiurKZZoXU4KspyK/Tv4O+Lbbxz8M9H8U2xGNQtlaVQfuSDh1/BgaAOmooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK8n/AG1/FbeE/wBnvWZYJfLutUC6fbkHBzIcMR/wANXrFfJX/BT7Wzt8KeG1bgtPfSD1wAi/zagD5KAwAB2ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr7D/4JmeLWuPD+veCriUk2Mq31qpPRH+VwP8AgQB/GvjyvYv2ENeOiftIaTCWxFq8M1k4z1JXcv8A48goA/QiiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr4S/wCCjmpG8+P8FjuyNN0eFMehdnc/zFfdtfnl+3VcG4/ah8Rc/wCpjtYh+Fuh/rQB5FRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXSfBzU20b4t+GNVRtptdYtmJ9jIoP6E1zdW9Bcx6/p8g6peQt+Ui0Afq/RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV+cv7aBLftPeK89p4R/5Ajr9Gq/On9tqIxftQeKQR957dx+NvHQB5XRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABVvw8nmeItOj/v3sC/nItVK3vhZZHUfif4bsFG43GsWqY9f3q0AfqZRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV+f/APwUCs2tv2mdSmK4W8sLSVffEew/qlfoBXxX/wAFNtMMHxO8O6sqYW80p4Wb1aOUn+TigD5pooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr0T9kyxOo/tI+D4du4R6iJz9I0Z/6CvO691/4J3aUb/9odb4puXS9Lnmz6M22Mf+hGgD71ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK+af+CmeiNd/DHQteRMnTNTMUjY6LKhH80FfS1ed/tXeHD4p/Z+8TabHHvnjszdQDvviIkGPwUj8aAPzZopFOVB9RS0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV9a/8ABMHRPl8V+JHTqYLGJsdcZdv5rXyVX6CfsF+HzoX7OWlzyIFl1iaW/fjkhm2r/wCOqPzoA9mooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKZcwx3FtJBMoeOVCjqehBGCKfRQB+W/xc8Ny+D/ifrvhqVcf2ffyRx8fejJyh/75Irna+mP+ClHg06f470rxrbRYg1eD7LdMBx50f3Sfqh/8dr5noAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigC1oenXGsa3ZaRaIXnv7mO3iUdSzsFH86/U/whpFvoHhXTdEtVCw6daR26ADjCKF/pXwj+wR4QPib492uozRbrTw9C17ISOPM+7GPzOfwr7/oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDzn9qvwOPH3wT1fSIYw99bR/bLE45EsfIA+oyPxr82yGVirqVZThgeoPcV+tR6V+eH7aPw+bwH8aLx7WHZpeuE3tmQPlUsfnT8Gz+BoA8kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK6f4M+D7rx78TdI8LWqti9uB9ocD/Vwry7H/AICDQB9k/wDBPjwSfDfwZ/t+7h2XviSb7R8w5EC/LGPx5P4171VfSLG20zSrbTrOIRW9pCsMKAcKqgAD8hVigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvJf2y/hyPiD8IbkWcIfVtHzeWJA5bA+dP8AgS/qBXrVBAIwRkGgD8lmDKxVlKspwQeoPpSV7d+3H8Lz4F+Jb63ptvt0XX3aaLaPlhm6unt6ivEaACiiigAooooAKKKKACiiigAooooAKKKKACvs7/gnP8ODpXhm6+IGp2+261YeRYBxykAPLD/eP6CvmX4BeAb34kfE2w8OWysLdnEt9MBxFCp+Y/j0H1r9LND06z0jR7XS9PhWG1s4VhhjUYCqowBQBaooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA4/wCOngLT/iP8OL/w1fKoklTfaTEcwzD7rD8eD7V+avivRNR8OeJL3QtWgaC8sJmimRhjkHqPY9a/Vqvlv/gof8LEvtFT4kaP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+F//AET3wz/4Kof/AImgD8xdy/3h+dG5f7w/Ov06/wCFTfC//onvhn/wVQ//ABNH/Cpvhf8A9E98M/8Agqh/+JoA/MXcv94fnRuX+8Pzr9Ov+FTfC/8A6J74Z/8ABVD/APE0f8Km+F//AET3wz/4Kof/AImgD8xdy/3h+dG5f7w/Ov06/wCFTfC//onvhn/wVQ//ABNH/Cpvhf8A9E98M/8Agqh/+JoA/MXcv94fnRuX+8Pzr9Ov+FTfC/8A6J74Z/8ABVD/APE0f8Km+F//AET3wz/4Kof/AImgD8xdy/3h+dG5f7w/Ov06/wCFTfC//onvhn/wVQ//ABNH/Cpvhf8A9E98M/8Agqh/+JoA/MXcv94fnSF0HV1H41+nf/Cpvhf/ANE98M/+CqH/AOJqxZ/DT4d2hzbeBPDkZ9V0qH/4mgD8wLaOS5kEdtFJO54CxIXJ/AV6V8LPgL8SvHF5F9m8P3Om2Dkb77UIzCir6gHlvwFfohpui6PpwA0/SbG0x08i2SPH5AVeoA4f4B/DLRfhb4ITQ9LJnnlbzb27cYa4kx19gOwruKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="}
            />
            </Swipeable>
        )
    }

    sectionHeader(test) {

        if (this.state.peopleFound[test.title].length == 0) {
            return <View />
        }
        return (
            <Text containerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }} style={{ textAlign: "center", color: $inputText }}> {test.title} </Text>
        )
    }

    sectionListItem(test) {
        return (
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: $primaryBlue, marginRight: 15, marginBottom: 3 }}>
                {test.sectionId}
            </Text>
        )
    }

    render() {
        const { navigate } = this.props.navigation;

        if (!this.state.ready) {
            return (
                <Container>
                    <StatusBarAlert
                        visible={this.state.alertVisible}
                        message="BridgeCard Added!"
                        backgroundColor={$alertSuccess}
                        color="white"
                        height={35}
                    />

                    <Header title={'Bridges'} plus={() => this.addProfilePic()} />

                    <SearchBar
                        round
                        showLoading
                        clearIcon
                        cancelButtonTitle="Cancel"
                        icon={{ type: 'font-awesome', name: 'search' }}
                        onChangeText={(term) => { this.searchUpdated(term) }}
                        onClearText={() => this.setState({ searchTerm: '' })}
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
                            backgroundColor: $primaryBlue
                        }}
                        placeholder="Type anything to search"
                    />

                    <View style={{
                        bottom: 20,
                        borderBottomColor: '#003E5B',
                        borderBottomWidth: 4,
                        shadowOffset: { width: 0, height: 2.8 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 1
                    }} />

                    <ActivityIndicator size="small" color="#003E5B" />
                </Container>
            )
        }

        return (
            <Container>
                <StatusBarAlert
                    visible={this.state.alertVisible}
                    message="BridgeCard Added!"
                    backgroundColor={$alertSuccess}
                    color="white"
                    height={35}
                />

                <Header title={'Bridges'} plus={() => this.addProfilePic()} />

                <SearchBar
                    round
                    showLoading
                    clearIcon
                    cancelButtonTitle="Cancel"
                    icon={{ type: 'font-awesome', name: 'search' }}
                    onChangeText={(term) => { this.searchUpdated(term) }}
                    onClearText={() => this.searchUpdated("")}
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
                        backgroundColor: $primaryBlue
                    }}
                    placeholder="Type anything to search"
                />

                <View style={{
                    bottom: 20,
                    borderBottomColor: '#003E5B',
                    borderBottomWidth: 4,
                    shadowOffset: { width: 0, height: 2.8 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1
                }} />

                <AtoZListView
                    style={{ marginTop: 16, bottom: 30 }}
                    data={this.state.filteredPeople}        // required array|object
                    renderRow={this.renderRow}              // required func
                    rowHeight={150}                         // required number
                    sectionHeaderHeight={5}                 // required number
                    sectionHeader={this.sectionHeader.bind(this)}
                    removeClippedSubviews={false}
                    sectionListStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }}
                    sectionListItem={this.sectionListItem}
                    enableEmptySections={true}
                />

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {

                    }}>
                    <View style={{ marginTop: 22, alignContent: 'center' }}>
                        <View style={{ marginTop: 50 }}>
                            <CardInput
                                name={'name'}
                                placeholder={'Name'}
                                withRef={true}
                                editable={true}
                                value={this.state.createContact_Name}
                                returnKeyType={"next"}
                                onChangeText={(value) => this.setState({ createContact_Name: value })}
                                isEnabled={true} />
                                <CardInput
                                name={'Position'}
                                placeholder={'Position'}
                                withRef={true}
                                editable={true}
                                value={this.state.createContact_Address}
                                returnKeyType={"next"}
                                onSubmitEditing={(event) => {
                                }}
                                onChangeText={(value) => this.setState({ createContact_Address: value })}
                                isEnabled={true} />
                                <CardInput
                                name={'Business'}
                                placeholder={'Business'}
                                withRef={true}
                                editable={true}
                                value={this.state.createContact_Business}
                                returnKeyType={"next"}
                                onSubmitEditing={(event) => {
                                }}
                                onChangeText={(value) => this.setState({ createContact_Business: value })}
                                isEnabled={true} />
                                {/* <CardInput
                                name={'name'}
                                placeholder={'Name'}
                                withRef={true}
                                ref={(ref) => this.NameInputRef = ref}
                                editable={true}
                                value={this.state.createContact_Name}
                                returnKeyType={"next"}
                                onSubmitEditing={(event) => {
                                    this.PositionInputRef.focus();
                                }}
                                onChangeText={(value) => this.setState({ createContact_Name: value })}
                                isEnabled={true} /> */}
                                <TouchableOpacity
                                onPress={() => {
                                    console.log(this.state.profilePic);
                                    console.log(this.state.createContact_Address);
                                    console.log(this.state.createContact_Name);
                                    {/* console.log(this.state.profilePic); */}
                                    obj = {
                                        card: [{id: "IMAGE", notes: "", image: this.state.profilePic}],
                                        position: this.state.createContact_Address,
                                        business: this.state.createContact_Business,
                                        person: "IMAGE",
                                        notes: "",
                                        displayName: this.state.createContact_Name,
                                    }
                                    rootRef.child(firebase.auth().currentUser.uid + "people").push(obj)
                                    // BOOOOOGA
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                                style={{
                                    marginRight: 40,
                                    marginLeft: 40,
                                    marginTop: 10,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    backgroundColor: $primaryBlue,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ color: 'white' }}>Create BridgeCard</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                                style={{
                                    marginRight: 40,
                                    marginLeft: 40,
                                    marginTop: 10,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    backgroundColor: $primaryBlue,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ color: 'white' }}>Exit</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible2}
                    onRequestClose={() => {

                    }}>
                    <View style={{ marginTop: 22, alignContent: 'center' }}>
                        <View style={{ marginTop: 50 }}>
                            <CardInput
                                name={'name'}
                                placeholder={'Name'}
                                withRef={true}
                                editable={true}
                                value={this.state.createContact_Name2}
                                returnKeyType={"next"}
                                onChangeText={(value) => this.setState({ createContact_Name2: value })}
                                isEnabled={true} />
                                <CardInput
                                name={'Position'}
                                placeholder={'Position'}
                                withRef={true}
                                editable={true}
                                value={this.state.createContact_Address2}
                                returnKeyType={"next"}
                                onSubmitEditing={(event) => {
                                }}
                                onChangeText={(value) => this.setState({ createContact_Address2: value })}
                                isEnabled={true} />
                                <CardInput
                                name={'Business'}
                                placeholder={'Business'}
                                withRef={true}
                                editable={true}
                                value={this.state.createContact_Business2}
                                returnKeyType={"next"}
                                onSubmitEditing={(event) => {
                                }}
                                onChangeText={(value) => this.setState({ createContact_Business2: value })}
                                isEnabled={true} />
                                {/* <CardInput
                                name={'name'}
                                placeholder={'Name'}
                                withRef={true}
                                ref={(ref) => this.NameInputRef = ref}
                                editable={true}
                                value={this.state.createContact_Name}
                                returnKeyType={"next"}
                                onSubmitEditing={(event) => {
                                    this.PositionInputRef.focus();
                                }}
                                onChangeText={(value) => this.setState({ createContact_Name: value })}
                                isEnabled={true} /> */}
                                <TouchableOpacity
                                onPress={() => {
                                    person = this.state.peopleFound[this.state.editSection][this.state.editIndex]
                                    person.displayName = this.state.createContact_Name2
                                    person.business = this.state.createContact_Business2
                                    person.position = this.state.createContact_Address2

                                    rootRef.child(firebase.auth().currentUser.uid + "people/" + this.state.editKey).update(person)

                                    this.setState({modalVisible2 : false})
                                    // BOOOOOGA
                                }}
                                style={{
                                    marginRight: 40,
                                    marginLeft: 40,
                                    marginTop: 10,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    backgroundColor: $primaryBlue,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ color: 'white' }}>Update BridgeCard</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({modalVisible2 : false})
                                }}
                                style={{
                                    marginRight: 40,
                                    marginLeft: 40,
                                    marginTop: 10,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    backgroundColor: $primaryBlue,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ color: 'white' }}>Exit</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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
    button2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    button3: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
    },
    button2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
    },
    leftRow: {
        left: width*.55,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
});
