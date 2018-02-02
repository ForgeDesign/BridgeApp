import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, RefreshControl, FlatList, TouchableOpacity, Modal, Dimensions, AsyncStorage } from 'react-native';
import store from 'react-native-simple-store';

import styles from './ProfileStyles'

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { ProfileHeader } from '../components/ProfileHeader';
import { CardTwoDisplay } from '../components/CardTwoDisplay';
import { CardThreeDisplay } from '../components/CardThreeDisplay';
import { CardFourDisplay } from '../components/CardFourDisplay';
import { CardFiveDisplay } from '../components/CardFiveDisplay';
import { CardOneDisplay } from '../components/CardOneDisplay';

import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import Swipeable from 'react-native-swipeable';

var {height, width} = Dimensions.get('window');

class ProfileScreen extends Component {

    
    constructor(props) {
        super(props);
    }

    // this tells you if the profile screen is active
    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            // here we are in screen
            // this._onRefresh()
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // NOT HERE
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <Header title={'Profile'} />

                <ProfileHeader ref={ref => this.header = ref} navigation={this.props.navigation}/>

                <View style={{
                    borderBottomColor: '#003E5B',
                    borderBottomWidth: 4,
                    shadowOffset: { width: 0, height:2.8 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1,
                    bottom: 3
                }}/>

            </Container>
        )
    }
}

export default withNavigationFocus(ProfileScreen, 'Profile')
