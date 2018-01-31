import { StackNavigator } from 'react-navigation';
import React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import AllCardsScreen from '../screens/AllCardsScreen';
import EditCardScreen from '../screens/EditCardScreen'

export default ProfileNavigator = StackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            header: null,
        },
    },
    Edit: {
        screen: EditCardScreen,
        navigationOptions: {
            header: null,
        }
    },
    AllCards: {
      screen: AllCardsScreen,
      navigationOptions: {
        header: null,
      }
    }
});
