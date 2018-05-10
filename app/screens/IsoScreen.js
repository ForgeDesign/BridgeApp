import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, FlatList, RefreshControl, Dimensions, TouchableOpacity } from 'react-native';
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
import Swipeable from 'react-native-swipeable';

import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

const KEYS_TO_FILTERS = ['name', 'location', 'card.position', 'card.website', 'card.businame', 'card.phonenum', 'card.email', 'card.cardnum'];


var {height, width} = Dimensions.get('window');
const myWidth = Dimensions.get('window').width;

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
            abstractPeople: [],
            foundISO: [],
            yourISO: [],
            activity:
            [
            ],
            recommendedPeopleStuff: []
        }
    }

    componentDidMount() {
        this.getPeople().then(peopleObj => {
            this.getCards(peopleObj).then(foundPeople => {
                this.setState({people: foundPeople, filteredPeople: foundPeople, ready: true, abstractPeople: peopleObj})
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
                resolve(allPeople)
            }).catch(test => {
                console.log(test)
            })
        });
    }

    // getCards(peopleObj) {
    //     return new Promise((resolve, reject) => {
    //         foundPeople = {
    //             "A": [], "B": [], "C": [], 'D': [], 'E': [], 'F': [], 'G': [],
    //             'H': [], 'I': [], 'J': [], 'K': [], 'L': [], 'M': [], 'N': [], 'O': [],
    //             'P': [], 'Q': [], 'R': [], 'S': [], 'T': [], 'U': [], 'V': [], 'W': [],
    //             'X': [], 'Y': [], 'Z': []
    //         }
    //         promises = []
    //         for (let index = 0; index < peopleObj.length; index++) {
    //             const person = peopleObj[index];
    //             var pathPerson = person.person + "person/"
    //             promises.push(this.getSinglePerson(pathPerson, person))
    //         }
    //         Promise.all(promises).then(data => {
    //             var allPeople = data
    //             for (let index = 0; index < data.length; index++) {
    //                 const person = data[index];
    //                 if (person.person != "IMAGE")
    //                     for (let index2 = 0; index2 < person.card.length; index2++) {
    //                         const card = person.card[index2];
    //                         Promise.resolve(card).then(val => {
    //                             allPeople[index].card[index2] = val
    //                         })
    //                     }
    //             }
    //             resolve(foundPeople)
    //         }).catch(test => {
    //             console.log(test)
    //         })
    //     });
    // }

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

    displayRecommendations(people) {
        this.getCards(people).then(foundPeople => {
            this.setState({recommendedPeopleStuff: foundPeople})
            this.popupDialogRecommendations.show()
        })
    }

    componentWillMount() {

        foundISO = []
        rootRef.child(firebase.auth().currentUser.uid + "iso").once().then(val => {
            var iso = []
            val.forEach(child => {
                shit = child.val()
                shit.key = child.key
                iso.push(shit)
            })
            // console.log(iso)

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
                    if(val.length == 0) {
                        this.setState({activity: iso.reverse(), yourISO: iso.reverse(), foundISO: []})
                        this._onRefresh()
                    }
                    val.forEach((child) => {
                        if(child.val() != null) {
                            const personUID = child.key.substring(0, child.key.length - 3)
                            
                            rootRef.child(personUID + "person").once().then(person => {
                                for (let pIndex = 0; pIndex < Object.keys(child.val()).length; pIndex++) {
                                    var personISO = child.val()[Object.keys(child.val())[pIndex]]
                                    personISO.connector = person.val().displayName
                                    personISO.text = "is looking for"
                                    personISO.image = person.val().photoURL
                                    personISO.fireUID = personUID
                                    personISO.fireKey = Object.keys(child.val())[pIndex]
                                    foundISO.push(personISO)
                                }
                                this.setState({activity: iso.reverse().concat(foundISO), yourISO: iso.reverse(), foundISO: foundISO})
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
        var peopleRecommended = []
        var fireUID = this[this.popupRelatedConnect].props.fireUID
        var fireISOKey = this[this.popupRelatedConnect].props.fireKey
        for (let index = 0; index < this.state.people.length; index++) {
            if (this.trackContactChecks[this.popupRelatedConnect][index]) {
                peopleRecommended.push(this.state.abstractPeople[index])
                numberOfRecs += 1
            }
                
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
            origin: firebase.auth().currentUser.uid,
            time: d.toString()
        }
        rootRef.child(firebase.auth().currentUser.uid + "activity").push(obj)

        rootRef.child(fireUID + "iso/" + fireISOKey).once().then(val => {
            obj = val.val()
            console.log(peopleRecommended, peopleRecommended.length)
            if(obj.recommended != undefined) {
                obj.recommended = obj.recommended.concat(peopleRecommended)
            }
            else {
                obj.recommended = peopleRecommended
            }
            rootRef.child(fireUID + "iso/" + fireISOKey).update(obj)
        })

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
                    imageFireKey={item.item.key}
                    index={item.item.index}
                    name={item.item.name ? item.item.name : item.item.displayName}
                    card={item.item.card}
                    location={item.item.location}
                    imagepath={item.item.imagepath ? item.item.imagepath : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAQCAwMDAgQDAwMEBAQEBQkGBQUFBQsICAYJDQsNDQ0LDAwOEBQRDg8TDwwMEhgSExUWFxcXDhEZGxkWGhQWFxb/2wBDAQQEBAUFBQoGBgoWDwwPFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhb/wAARCAHgAeADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7+ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooqrrGpadpNi97ql9bWVvGMtNcSiNB+JoAtUV4f8Qv2qvhb4cke3066utfuU426fF+7z7yNgflmvIvFP7aHiednTw94P02yQ/de9neZx+C7RQB9m0V+f9/+1b8ZrhyYtX0u1B6CHTEOP++s1Ti/ae+NiSbv+Esgf/ZbS7fH/oFAH6GUV8E6T+1t8XrWQG6m0W/UdVl0/Zn8UYV3XhX9tS7WRU8S+B4mT+KXTrwg/Xa4/rQB9eUV4/4A/aZ+E3id0gbXH0e5fAEOqReUM+gflf1r1qwu7W+tUubK5huYJBlJYZA6sPYjg0ATUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVDf3VtZWcl3eXEcEEKlpJZWCqgHck1jfEnxl4f8AAvhafXvEV8ltawj5QT88rdlUdya+DP2i/jv4m+J2oyWkcsmm6AjfubCN8GQdmkI6n26UAe7fHf8Aa10rR5JtH+HttHql4hKtqMwP2eM/7A6v/KvlL4g+OfFvjjUmvfFGu3eoOTlY3ciKP2VBwPyrnqKACiiigAooooAKKKKAAgEYIrqPhz8RPGngS+W58L+ILuyAOWt9++GT2aM8GuXooA+zPgl+11pOqSQ6X8QrFdLuWwo1C3ybdj6svVP1FfS2k39lqenxX2nXcN1bTKGjmhcMrj2Ir8na9H+A3xo8W/C/VE/s+5a80l2BuNNncmNh3K/3T9KAP0jorjvgv8S/DPxM8Mrq2gXQ8xABc2jnEtu3ow9PeuxoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKw/iN4t0XwR4Ru/EWu3Kw2lomcZ+aRuyqO5NbNzNFb27zzyLHFEpd3Y4CgDJJr8+v2wvi9cfEnxy9hp07L4e0qQx2iA8TuODKfXPb2oA5j4+/FLXvil4xk1TU5WisYWK2FirfJAnbjux7muEoooAKKKKACiiigAooooAKKKKACiiigAooooA6P4W+N/EHw/8WweIPDt20M8RxJGT+7nTujjuDX6HfAT4n6H8UfBcWs6WwiuowEvrJm+e3k7j3B7GvzOrtPgP8RtW+GXj6217T3Z7ckJfW2flniJ5GPUdRQB+m1FZfgvxBpninwtZa/o9ws9nfQiWJgemex9x0rUoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiio7ueK2tZLmdwkUKF5HPRVAyT+VAHz1/wAFA/ic/hjwPF4M0m42alrqk3DIfmithwfpuPH518PDgV2Px98aT+P/AIs6x4kkdjBNOYrNSfuQIdqAfgM/jXHUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB9Of8E8Pie+l+JJPh1q1x/oepEy6aXbiObug9mH6ivs6vye0XULvSdYtdUsJWiurKZZoXU4KspyK/Tv4O+Lbbxz8M9H8U2xGNQtlaVQfuSDh1/BgaAOmooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK8n/AG1/FbeE/wBnvWZYJfLutUC6fbkHBzIcMR/wANXrFfJX/BT7Wzt8KeG1bgtPfSD1wAi/zagD5KAwAB2ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr7D/4JmeLWuPD+veCriUk2Mq31qpPRH+VwP8AgQB/GvjyvYv2ENeOiftIaTCWxFq8M1k4z1JXcv8A48goA/QiiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr4S/wCCjmpG8+P8FjuyNN0eFMehdnc/zFfdtfnl+3VcG4/ah8Rc/wCpjtYh+Fuh/rQB5FRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXSfBzU20b4t+GNVRtptdYtmJ9jIoP6E1zdW9Bcx6/p8g6peQt+Ui0Afq/RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV+cv7aBLftPeK89p4R/5Ajr9Gq/On9tqIxftQeKQR957dx+NvHQB5XRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABVvw8nmeItOj/v3sC/nItVK3vhZZHUfif4bsFG43GsWqY9f3q0AfqZRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV+f/APwUCs2tv2mdSmK4W8sLSVffEew/qlfoBXxX/wAFNtMMHxO8O6sqYW80p4Wb1aOUn+TigD5pooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr0T9kyxOo/tI+D4du4R6iJz9I0Z/6CvO691/4J3aUb/9odb4puXS9Lnmz6M22Mf+hGgD71ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK+af+CmeiNd/DHQteRMnTNTMUjY6LKhH80FfS1ed/tXeHD4p/Z+8TabHHvnjszdQDvviIkGPwUj8aAPzZopFOVB9RS0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV9a/8ABMHRPl8V+JHTqYLGJsdcZdv5rXyVX6CfsF+HzoX7OWlzyIFl1iaW/fjkhm2r/wCOqPzoA9mooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKZcwx3FtJBMoeOVCjqehBGCKfRQB+W/xc8Ny+D/ifrvhqVcf2ffyRx8fejJyh/75Irna+mP+ClHg06f470rxrbRYg1eD7LdMBx50f3Sfqh/8dr5noAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigC1oenXGsa3ZaRaIXnv7mO3iUdSzsFH86/U/whpFvoHhXTdEtVCw6daR26ADjCKF/pXwj+wR4QPib492uozRbrTw9C17ISOPM+7GPzOfwr7/oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDzn9qvwOPH3wT1fSIYw99bR/bLE45EsfIA+oyPxr82yGVirqVZThgeoPcV+tR6V+eH7aPw+bwH8aLx7WHZpeuE3tmQPlUsfnT8Gz+BoA8kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK6f4M+D7rx78TdI8LWqti9uB9ocD/Vwry7H/AICDQB9k/wDBPjwSfDfwZ/t+7h2XviSb7R8w5EC/LGPx5P4171VfSLG20zSrbTrOIRW9pCsMKAcKqgAD8hVigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvJf2y/hyPiD8IbkWcIfVtHzeWJA5bA+dP8AgS/qBXrVBAIwRkGgD8lmDKxVlKspwQeoPpSV7d+3H8Lz4F+Jb63ptvt0XX3aaLaPlhm6unt6ivEaACiiigAooooAKKKKACiiigAooooAKKKKACvs7/gnP8ODpXhm6+IGp2+261YeRYBxykAPLD/eP6CvmX4BeAb34kfE2w8OWysLdnEt9MBxFCp+Y/j0H1r9LND06z0jR7XS9PhWG1s4VhhjUYCqowBQBaooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA4/wCOngLT/iP8OL/w1fKoklTfaTEcwzD7rD8eD7V+avivRNR8OeJL3QtWgaC8sJmimRhjkHqPY9a/Vqvlv/gof8LEvtFT4kaP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+F//AET3wz/4Kof/AImgD8xdy/3h+dG5f7w/Ov06/wCFTfC//onvhn/wVQ//ABNH/Cpvhf8A9E98M/8Agqh/+JoA/MXcv94fnRuX+8Pzr9Ov+FTfC/8A6J74Z/8ABVD/APE0f8Km+F//AET3wz/4Kof/AImgD8xdy/3h+dG5f7w/Ov06/wCFTfC//onvhn/wVQ//ABNH/Cpvhf8A9E98M/8Agqh/+JoA/MXcv94fnRuX+8Pzr9Ov+FTfC/8A6J74Z/8ABVD/APE0f8Km+F//AET3wz/4Kof/AImgD8xdy/3h+dG5f7w/Ov06/wCFTfC//onvhn/wVQ//ABNH/Cpvhf8A9E98M/8Agqh/+JoA/MXcv94fnSF0HV1H41+nf/Cpvhf/ANE98M/+CqH/AOJqxZ/DT4d2hzbeBPDkZ9V0qH/4mgD8wLaOS5kEdtFJO54CxIXJ/AV6V8LPgL8SvHF5F9m8P3Om2Dkb77UIzCir6gHlvwFfohpui6PpwA0/SbG0x08i2SPH5AVeoA4f4B/DLRfhb4ITQ9LJnnlbzb27cYa4kx19gOwruKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="}
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

    recommendedKeyExtractor = (item, index) => index

    activityExtractor = (item, index) => index;

    renderRecommended(item, key) {
        return(
            <PersonCard
                recommendation={true}
                section={item.item.section}
                imageFireKey={item.item.key}
                index={item.item.index}
                name={item.item.name ? item.item.name : item.item.displayName}
                card={item.item.card}
                location={item.item.location}
                imagepath={item.item.imagepath ? item.item.imagepath : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAQCAwMDAgQDAwMEBAQEBQkGBQUFBQsICAYJDQsNDQ0LDAwOEBQRDg8TDwwMEhgSExUWFxcXDhEZGxkWGhQWFxb/2wBDAQQEBAUFBQoGBgoWDwwPFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhb/wAARCAHgAeADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7+ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooqrrGpadpNi97ql9bWVvGMtNcSiNB+JoAtUV4f8Qv2qvhb4cke3066utfuU426fF+7z7yNgflmvIvFP7aHiednTw94P02yQ/de9neZx+C7RQB9m0V+f9/+1b8ZrhyYtX0u1B6CHTEOP++s1Ti/ae+NiSbv+Esgf/ZbS7fH/oFAH6GUV8E6T+1t8XrWQG6m0W/UdVl0/Zn8UYV3XhX9tS7WRU8S+B4mT+KXTrwg/Xa4/rQB9eUV4/4A/aZ+E3id0gbXH0e5fAEOqReUM+gflf1r1qwu7W+tUubK5huYJBlJYZA6sPYjg0ATUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVDf3VtZWcl3eXEcEEKlpJZWCqgHck1jfEnxl4f8AAvhafXvEV8ltawj5QT88rdlUdya+DP2i/jv4m+J2oyWkcsmm6AjfubCN8GQdmkI6n26UAe7fHf8Aa10rR5JtH+HttHql4hKtqMwP2eM/7A6v/KvlL4g+OfFvjjUmvfFGu3eoOTlY3ciKP2VBwPyrnqKACiiigAooooAKKKKAAgEYIrqPhz8RPGngS+W58L+ILuyAOWt9++GT2aM8GuXooA+zPgl+11pOqSQ6X8QrFdLuWwo1C3ybdj6svVP1FfS2k39lqenxX2nXcN1bTKGjmhcMrj2Ir8na9H+A3xo8W/C/VE/s+5a80l2BuNNncmNh3K/3T9KAP0jorjvgv8S/DPxM8Mrq2gXQ8xABc2jnEtu3ow9PeuxoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKw/iN4t0XwR4Ru/EWu3Kw2lomcZ+aRuyqO5NbNzNFb27zzyLHFEpd3Y4CgDJJr8+v2wvi9cfEnxy9hp07L4e0qQx2iA8TuODKfXPb2oA5j4+/FLXvil4xk1TU5WisYWK2FirfJAnbjux7muEoooAKKKKACiiigAooooAKKKKACiiigAooooA6P4W+N/EHw/8WweIPDt20M8RxJGT+7nTujjuDX6HfAT4n6H8UfBcWs6WwiuowEvrJm+e3k7j3B7GvzOrtPgP8RtW+GXj6217T3Z7ckJfW2flniJ5GPUdRQB+m1FZfgvxBpninwtZa/o9ws9nfQiWJgemex9x0rUoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiio7ueK2tZLmdwkUKF5HPRVAyT+VAHz1/wAFA/ic/hjwPF4M0m42alrqk3DIfmithwfpuPH518PDgV2Px98aT+P/AIs6x4kkdjBNOYrNSfuQIdqAfgM/jXHUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB9Of8E8Pie+l+JJPh1q1x/oepEy6aXbiObug9mH6ivs6vye0XULvSdYtdUsJWiurKZZoXU4KspyK/Tv4O+Lbbxz8M9H8U2xGNQtlaVQfuSDh1/BgaAOmooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK8n/AG1/FbeE/wBnvWZYJfLutUC6fbkHBzIcMR/wANXrFfJX/BT7Wzt8KeG1bgtPfSD1wAi/zagD5KAwAB2ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr7D/4JmeLWuPD+veCriUk2Mq31qpPRH+VwP8AgQB/GvjyvYv2ENeOiftIaTCWxFq8M1k4z1JXcv8A48goA/QiiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr4S/wCCjmpG8+P8FjuyNN0eFMehdnc/zFfdtfnl+3VcG4/ah8Rc/wCpjtYh+Fuh/rQB5FRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXSfBzU20b4t+GNVRtptdYtmJ9jIoP6E1zdW9Bcx6/p8g6peQt+Ui0Afq/RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV+cv7aBLftPeK89p4R/5Ajr9Gq/On9tqIxftQeKQR957dx+NvHQB5XRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABVvw8nmeItOj/v3sC/nItVK3vhZZHUfif4bsFG43GsWqY9f3q0AfqZRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV+f/APwUCs2tv2mdSmK4W8sLSVffEew/qlfoBXxX/wAFNtMMHxO8O6sqYW80p4Wb1aOUn+TigD5pooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr0T9kyxOo/tI+D4du4R6iJz9I0Z/6CvO691/4J3aUb/9odb4puXS9Lnmz6M22Mf+hGgD71ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK+af+CmeiNd/DHQteRMnTNTMUjY6LKhH80FfS1ed/tXeHD4p/Z+8TabHHvnjszdQDvviIkGPwUj8aAPzZopFOVB9RS0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV9a/8ABMHRPl8V+JHTqYLGJsdcZdv5rXyVX6CfsF+HzoX7OWlzyIFl1iaW/fjkhm2r/wCOqPzoA9mooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKZcwx3FtJBMoeOVCjqehBGCKfRQB+W/xc8Ny+D/ifrvhqVcf2ffyRx8fejJyh/75Irna+mP+ClHg06f470rxrbRYg1eD7LdMBx50f3Sfqh/8dr5noAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigC1oenXGsa3ZaRaIXnv7mO3iUdSzsFH86/U/whpFvoHhXTdEtVCw6daR26ADjCKF/pXwj+wR4QPib492uozRbrTw9C17ISOPM+7GPzOfwr7/oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDzn9qvwOPH3wT1fSIYw99bR/bLE45EsfIA+oyPxr82yGVirqVZThgeoPcV+tR6V+eH7aPw+bwH8aLx7WHZpeuE3tmQPlUsfnT8Gz+BoA8kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK6f4M+D7rx78TdI8LWqti9uB9ocD/Vwry7H/AICDQB9k/wDBPjwSfDfwZ/t+7h2XviSb7R8w5EC/LGPx5P4171VfSLG20zSrbTrOIRW9pCsMKAcKqgAD8hVigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvJf2y/hyPiD8IbkWcIfVtHzeWJA5bA+dP8AgS/qBXrVBAIwRkGgD8lmDKxVlKspwQeoPpSV7d+3H8Lz4F+Jb63ptvt0XX3aaLaPlhm6unt6ivEaACiiigAooooAKKKKACiiigAooooAKKKKACvs7/gnP8ODpXhm6+IGp2+261YeRYBxykAPLD/eP6CvmX4BeAb34kfE2w8OWysLdnEt9MBxFCp+Y/j0H1r9LND06z0jR7XS9PhWG1s4VhhjUYCqowBQBaooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA4/wCOngLT/iP8OL/w1fKoklTfaTEcwzD7rD8eD7V+avivRNR8OeJL3QtWgaC8sJmimRhjkHqPY9a/Vqvlv/gof8LEvtFT4kaP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+F//AET3wz/4Kof/AImgD8xdy/3h+dG5f7w/Ov06/wCFTfC//onvhn/wVQ//ABNH/Cpvhf8A9E98M/8Agqh/+JoA/MXcv94fnRuX+8Pzr9Ov+FTfC/8A6J74Z/8ABVD/APE0f8Km+F//AET3wz/4Kof/AImgD8xdy/3h+dG5f7w/Ov06/wCFTfC//onvhn/wVQ//ABNH/Cpvhf8A9E98M/8Agqh/+JoA/MXcv94fnRuX+8Pzr9Ov+FTfC/8A6J74Z/8ABVD/APE0f8Km+F//AET3wz/4Kof/AImgD8xdy/3h+dG5f7w/Ov06/wCFTfC//onvhn/wVQ//ABNH/Cpvhf8A9E98M/8Agqh/+JoA/MXcv94fnSF0HV1H41+nf/Cpvhf/ANE98M/+CqH/AOJqxZ/DT4d2hzbeBPDkZ9V0qH/4mgD8wLaOS5kEdtFJO54CxIXJ/AV6V8LPgL8SvHF5F9m8P3Om2Dkb77UIzCir6gHlvwFfohpui6PpwA0/SbG0x08i2SPH5AVeoA4f4B/DLRfhb4ITQ9LJnnlbzb27cYa4kx19gOwruKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="}
            />
        )
    }

    _deleteReccomendation(item) {
        copy1 = JSON.parse(JSON.stringify(this.state.activity))
        copy2 = JSON.parse(JSON.stringify(this.state.yourISO))
        index1 = undefined
        index2 = undefined
        for (let index = 0; index < copy1.length; index++) {
            const element = copy1[index];
            if(element.key == item.item.key)
            {
                index1 = index
                break
            }
        }
        for (let index = 0; index < copy2.length; index++) {
            const element = copy2[index];
            if(element.key == item.item.key)
            {
                index2 = index
                break
            }
        }
        copy1.splice(index1, 1)
        copy2.splice(index2, 1)
        this.setState({activity: copy1, yourISO: copy2}, () => {
            rootRef.child(firebase.auth().currentUser.uid + "iso/" + item.item.key).remove()
        })
    }

    activityRendererererer(ref, key) {
        if(ref.item.key != undefined)
        return(
            <Swipeable
                // swipeStartMinLeftEdgeClearance={50}
                rightButtons={[
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={() => this._deleteReccomendation(ref)}>
                                <Text style={styles.buttonText}>Delete Post</Text>
                        </TouchableOpacity>
                    </View>
                ]}
                rightButtonWidth={width*.4 + 30}
            >
            <ProfileActivity
            recommended={ref.item.recommended}
            key={ref.index}
            ref={(card) => {this[ref.index] = card}}
            recommendFunc={this.displayRecommendations.bind(this)}
            connector={ref.item.connector}
            text={ref.item.text}
            connectee={ref.item.connectee}
            image={ref.item.image}
            iso={true}
            recommend={true}
            fireKey={ref.item.fireKey}
            fireUID={ref.item.fireUID}
            time={ref.item.time}
            navigate={this.onPressHandle.bind(this, ref.index)}/>
            </Swipeable>
        )
        return(
            <ProfileActivity
            recommended={ref.item.recommended}
            key={ref.index}
            ref={(card) => {this[ref.index] = card}}
            recommendFunc={this.displayRecommendations.bind(this)}
            connector={ref.item.connector}
            text={ref.item.text}
            connectee={ref.item.connectee}
            image={ref.item.image}
            iso={true}
            recommend={true}
            fireKey={ref.item.fireKey}
            fireUID={ref.item.fireUID}
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
                title={firebase.auth().currentUser.displayName + " is looking for:"}
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
                            var boop = rootRef.child(firebase.auth().currentUser.uid + "iso").push(obj).key
                            obj.key = boop
                            this.state.yourISO.unshift(obj)
                            this.state.activity.unshift(obj)
                            this.forceUpdate()
                            this.makeAlertAppear("Successfully posted your search request!"); setTimeout(() => { this.makeAlertDisappear() }, 2000) 
                        }
                    }
                }
                } />

                <PopupDialog
                    dialogTitle={<DialogTitle title="Recommendations!" />}
                    ref={(popupDialog) => { this.popupDialogRecommendations = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    height={0.70}
                    actions={[
                        <Grid key="grid">
                            <Row style={{justifyContent: 'center'}}>
                                <DialogButton
                                    text="Done"
                                    onPress={() => {
                                        this.popupDialogRecommendations.dismiss();
                                    }}
                                    key="buttonDone-1"
                                />
                            </Row>
                        </Grid>]
                    }
                    >
                    <View>
                        <FlatList
                            height={'68%'}
                            data={this.state.recommendedPeopleStuff}
                            keyExtractor={this.recommendedKeyExtractor}
                            renderItem={this.renderRecommended}
                        />
                    </View>
                </PopupDialog>

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
    leftRow: {
        left: width*.55,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
});