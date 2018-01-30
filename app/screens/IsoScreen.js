import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, Dimensions, TouchableOpacity, Modal, KeyboardAvoidingView} from 'react-native';
import { SearchBar } from 'react-native-elements'
import { Fab, Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createFilter } from 'react-native-search-filter';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { PersonCard } from '../components/PersonCard';

const myWidth = Dimensions.get('window').width;
const KEYS_TO_FILTERS = ['name', 'location', 'card.position', 'card.website', 'card.buisname', 'card.phonenum', 'card.email', 'card.cardnum'];

export default class IsoScreen extends React.Component {

    _showModal = () => { this.setState({ isModalVisible: true }) }
    _hideModal = () => { this.setState({ isModalVisible: false }) }

    constructor(){
        super();

        this.state = {
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
            active: true,
            isModalVisible:false,
            searchTerm: '',
        };
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    render() {
        const { navigate } = this.props.navigation;
        const filteredPeople = this.state.people.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        return (
            <Container>

                <Header title={'Connect'} />
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
                        backgroundColor: $primaryBlue}}
                    placeholder="Type anything to search"
                />

                <ScrollView style={{ flex: 1, marginTop: 6 }}>
                    {filteredPeople.map((person, key) =>
                        <PersonCard
                        key={key}
                        name={person.name}
                        card={person.card}
                        location={person.location}
                        imagepath={person.imagepath}/>
                    )}
                </ScrollView>
                

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
