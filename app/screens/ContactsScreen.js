import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, FlatList } from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { ActivityCard } from '../components/ActivityCard'
import { PersonCard } from '../components/PersonCard';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

export default class ContactsScreen extends React.Component {

    state = {
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

    onPressHandle() {
        this.popupDialog.show()
    }

    _renderItem = ({item}) => (
        <PersonCard
            name={item.name}
            card={item.card}
            location={item.location}
            imagepath={item.imagepath}
        />
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
                        connector={ref.connector}
                        connectee={ref.connectee}
                        connectorpath={ref.connectorpath}
                        time={ref.time}
                        navigate={this.onPressHandle.bind(this)}/>
                    )}
                </ScrollView>
                <PopupDialog
                    dialogTitle={<DialogTitle title="Recommend a Contact" />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    actions={[
                        <DialogButton
                            style={{bottom: 0}}
                            text="Cancel"
                            onPress={() => {
                            this.popupDialog.dismiss();
                            }}
                            key="button-1"
                        />,
                    ]}
                    >
                    <View>
                        <FlatList
                            data={this.state.people}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </View>
                </PopupDialog>
            </Container>
        )
    }
}
