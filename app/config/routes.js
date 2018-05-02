import { TabNavigator, TabBarTop, NavigationActions } from 'react-navigation';
import { Dimensions } from 'react-native';
import { Icon } from 'native-base';
import React from 'react';

import ProfileNavigator from './homestack';
import ProfileScreen from '../screens/ProfileScreen';
import EcardScreen from '../screens/EcardScreen';
import IsoScreen from '../screens/IsoScreen';
import ContactsScreen from '../screens/ContactsScreen';

var {height, width} = Dimensions.get('window');

export default TabNavigator(
    {
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name={'md-home'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            }
        },
        Ecard: {
            screen: EcardScreen,
            navigationOptions: {
                tabBarLabel: 'Ecard',
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name={'md-add'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        },
        Contacts: {
            screen: ContactsScreen,
            navigationOptions: {
                tabBarLabel: 'Contacts',
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name={'md-contact'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        },
        Iso: {
            screen: IsoScreen,
            navigationOptions: {
                tabBarLabel: 'ISO',
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name={'md-time'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        },
    },
    {
        lazy: false,
        initialRouteName: 'Profile',
        tabBarPosition: 'bottom',
        tabBarComponent: TabBarTop,
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            activeTintColor: '#003E5B',
            inactiveTintColor: '#F0F0F0',
            allowFontScaling: false,
            style: {
                height: height*.08,
                backgroundColor: 'white',
            },
            labelStyle: {
                fontSize: 10,
            },
            indicatorStyle: {
                height: 0,
            }
        },
        navigationOptions: ({ navigation }) => ({
            tabBarOnPress: (scene) => {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: scene.scene.route.key})]
                });
                if(scene.scene.route.key == "Profile" && scene.previousScene.key == "Profile") {
                    if (scene.scene.route.routes.length > 1) {
                        navigation.dispatch(resetAction);
                    }
                    else {
                        scene.jumpToIndex(scene.scene.index)
                    }
                }
                else
                    scene.jumpToIndex(scene.scene.index)
            },
        }),
    }
);
