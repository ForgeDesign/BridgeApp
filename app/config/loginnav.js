import { StackNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import React from 'react';
import Navigator from './routes'
import LoginScreen from '../screens/LoginScreen'
import { updateFocus } from 'react-navigation-is-focused-hoc'
import { Linking } from 'react-native'

import DeepLinking from 'react-native-deep-linking';

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

const handleUrl = ({ url }) => {
    console.log(url)
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  };

export default class App extends React.Component {

    state = {
        loading: true,
        authenticated: false,
    };

    componentDidMount() {
        DeepLinking.addScheme('bridgecard://');
        Linking.addEventListener('url', this.handleUrl);
    
        DeepLinking.addRoute('/test', (response) => {
            // bridgecard://test
            console.log(response)
        });
    
        DeepLinking.addRoute('/test/:id', (response) => {
            // bridgecard://test/23
            console.log(response)
        });
    
        DeepLinking.addRoute('/test/:id/details', (response) => {
            // bridgecard://test/100/details
            console.log(response)
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