import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, Dimensions, TouchableOpacity, Modal, KeyboardAvoidingView} from 'react-native';
import { SearchBar } from 'react-native-elements'
import { Fab, Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createFilter } from 'react-native-search-filter';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { PersonCard } from '../components/PersonCard';
import AtoZListView from 'react-native-atoz-listview';

const myWidth = Dimensions.get('window').width;

export default class ContactsScreen extends React.Component {

    _showModal = () => { this.setState({ isModalVisible: true }) }
    _hideModal = () => { this.setState({ isModalVisible: false }) }

    constructor(){
        super();

        this.state = {
            people: 
            {
                'B': [
                    {
                        "name": "Brian Amin",
                        "location": "3052 Parker Dr. Akron, OH",
                        "imagepath": require("../assets/images/brianamin.jpg"),
                        "card":{
                            "position":"Project Manager",
                            "website":"polyend.com",
                            "businame":"Polyend Design",
                            "phonenum":"(330)6510981",
                            "name":"Brian Amin",
                            "email":"brian.amin@gmail.com",
                            "address":"3052 Parker Dr. Akron, OH",
                            "cardnum": 2
                        }
                    }
                ],
                'D': [
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
                    }
                ],
                'F': [
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
                'M': [
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
                    }
                ],
            },
            active: true,
            isModalVisible:false,
            searchTerm: '',
        };
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

                <Header title={'Contacts'} />
                <View style={{
                borderBottomColor: '#003E5B',
                borderBottomWidth: 4,
                shadowOffset: { width: 0, height:2.8 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1}}/>

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
                onPress={() => this.setState({active: !this.state.active})}>
                <Icon name="md-add"/>
                </Fab>
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
