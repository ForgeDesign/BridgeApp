import { TabNavigator } from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen';
import EcardScreen from '../screens/EcardScreen';
import ContactsScreen from '../screens/ContactsScreen';
import IsoScreen from '../screens/IsoScreen';

export default TabNavigator({
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
          tabBarLabel: 'Home',
      }
    },
    Ecard: {
      screen: EcardScreen,
      navigationOptions: {
          tabBarLabel: 'Ecard',
      }
    },
    Contacts: {
      screen: ContactsScreen,
      navigationOptions: {
          tabBarLabel: 'Contacts',
      }
    },
    Iso: {
      screen: IsoScreen,
      navigationOptions: {
          tabBarLabel: 'ISO',
      }
    },
  },
    {
      tabBarPosition: 'bottom',
      animationEnabled: false,
      swipeEnabled: false,
      tabBarOptions: {
        activeTintColor: 'dimgray',
        inactiveTintColor: 'lightgray',
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
