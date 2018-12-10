import { StackNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import React from 'react';
import Navigator from './routes'
import LoginScreen from '../screens/LoginScreen'
import { updateFocus } from 'react-navigation-is-focused-hoc'
import { Linking } from 'react-native'

import DeepLinking from 'react-native-deep-linking';

// import { createDeepLinkingHandler } from 'react-native-deep-link';

// const handleInvitationToChannel = function(response) {
//     console.log(response)
// }

// const schemes = [
//     {
//         name: 'bridgecard:',
//         routes: [
//             {
//                 expression: '/connectRemote/:uid/card/:id',
//                 callback: handleInvitationToChannel
//             }
//         ]
//     }
// ];

// const withDeepLinking = createDeepLinkingHandler(schemes);


import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

const AppNavigator = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        },
    },
    Main: {
        screen: Navigator,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    }
}, {
    initialRouteName: "Login"
});

const AppNavigator2 = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        },
    },
    Main: {
        screen: Navigator,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    }
}, {
    initialRouteName: "Main"
});

const handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  };

class App extends React.Component {

    state = {
        loading: true,
        authenticated: false,
    };    
    
    constructor(props) {
        super(props)

        this.handleActivateLink = this.handleActivateLink.bind(this)
        // handleInvitationToChannel = this.handleActivateLink
    }

    getPeople() {
        return new Promise((resolve, reject) => {
            peopleObj = []
            rootRef.child(firebase.auth().currentUser.uid + "people").once().then(val => {
                val.forEach(child => {
                    boo = child.val()
                    boo.key = child.key
                    peopleObj.push(boo)
                })
                if(peopleObj.length == 0) {
                    peopleObj = [
                        {
                            "person": "uFMPJdt0hidaQN458StwnKx3NP32",
                            "location": "1001 Bridge Card Lane, OH",
                            "card":[{id: "-L82ptyd00cxneD_vabR", notes: ""}],
                        }
                    ]
                    rootRef.child(firebase.auth().currentUser.uid + "people").set(peopleObj)
                }
            }).then(() => {
                resolve(peopleObj)
            })
        });
    }

    filter_array(test_array) {
        var index = -1,
            arr_length = test_array ? test_array.length : 0,
            resIndex = -1,
            result = [];
    
        while (++index < arr_length) {
            var value = test_array[index];
    
            if (value) {
                result[++resIndex] = value;
            }
        }
    
        return result;
    }

    handleActivateLink(response) {
        var cardid = response.id
        var location = "Remote connection"
        var uid = response.uid
        var person = {
            card: [{id: cardid, notes: ""}],
            location: location,
            person: uid,
            notes: ""
        }
        this.getPeople().then(people => {
            var found = false
            for (let index = 0; index < people.length; index++) {
                const contact = people[index];
                if (contact.person == person.person) {
                    contact.card = this.filter_array(contact.card)
                    for (let index2 = 0; index2 < contact.card.length; index2++) {
                        const card = contact.card[index2]
                        if (card.id != person.card[0].id) {
                            person.card.push(contact.card[index2])
                        }
                    }
                    
                    rootRef.child(uid + "person").once().then(firePerson => {

                        var d = new Date();
                        obj = {
                            connector: "You",
                            text: "bridged with",
                            connectee: firePerson._value.displayName,
                            icon: "md-person",
                            image: "",
                            time: d.toString()
                        }
                        rootRef.child(firebase.auth().currentUser.uid + "activity").push(obj)

                    })

                    rootRef.child(firebase.auth().currentUser.uid + "people/" + contact.key).update(person)
                    found = true
                    break
                }
            }
            if (!found) {
                rootRef.child(firebase.auth().currentUser.uid + "people").push(person)
                rootRef.child(uid + "person").once().then(firePerson => {
                    var d = new Date();
                    obj = {
                        connector: "You",
                        text: "bridged with",
                        connectee: firePerson._value.displayName,
                        icon: "",
                        image: "",
                        time: d.toString()
                    }
                    rootRef.child(firebase.auth().currentUser.uid + "activity").push(obj)
                })
            }
        })
    }

    componentDidMount() {
        DeepLinking.addScheme('bridgecard://');
        Linking.addEventListener('url', this.handleUrl);

        DeepLinking.addRoute('/connectRemote/:uid/card/:id', (response) => {
            this.handleActivateLink(response)
        });
    
        Linking.getInitialURL().then((url) => {
            if (url) {
                Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
    
    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleUrl);
    }
    
    handleUrl = ({ url }) => {
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                DeepLinking.evaluateUrl(url);
            }
        });
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loading: false, authenticated: true });
            } else {
                this.setState({ loading: false, authenticated: false });
            }
        })
    }

    render() {

        if (this.state.loading) return null; // Render loading/splash screen etc

        if (!this.state.authenticated) {
            return (
                <AppNavigator
                    onNavigationStateChange={(prevState, currentState) => {
                        updateFocus(currentState)
                    }}
                />
            )
        }

        return (
            <AppNavigator2
                onNavigationStateChange={(prevState, currentState) => {
                    updateFocus(currentState)
                }}
            />
        )
    }
}
export default App
// export default withDeepLinking(App)
