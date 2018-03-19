import { StackNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import React from 'react';
import Navigator from './routes'
import LoginScreen from '../screens/LoginScreen'
import { updateFocus } from 'react-navigation-is-focused-hoc'
import { Linking } from 'react-native'

import firebase from 'react-native-firebase';

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

export default class App extends React.Component {

    state = {
        loading: true,
        authenticated: false,
    };

    componentDidMount() {
        Linking.addEventListener('url', this.handleOpenURL);
    }
    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL(event) {
        console.log(event)
        console.log(event.url);
        // do something with the url, in our case navigate(route)
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