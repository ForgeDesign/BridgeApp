import { TabNavigator, TabBarTop } from 'react-navigation';
import { Icon } from 'native-base';
import React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import EcardScreen from '../screens/EcardScreen';
import ContactsScreen from '../screens/ContactsScreen';
import IsoScreen from '../screens/IsoScreen';
import ImageCycleScreen from '../screens/ImageCycleScreen';
export default TabNavigator({
    Profile: {
      // ImageCycle: {
      // screen: ImageCycleScreen,
      screen: ProfileScreen,
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
             name={'ios-folder-open'}
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
             name={'md-add'}
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
             name={'md-contact'}
             size={26}
             style={{ color: tintColor }}
           />
         )
      }
    },
  },
    {
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
          height: '8%',
          backgroundColor: 'white',
        },
        labelStyle: {
          fontSize: 10,
        },
        indicatorStyle: {
          height: 0,
        }
      }
    }
);
