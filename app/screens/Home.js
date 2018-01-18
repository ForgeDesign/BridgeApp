import React, { Component } from 'react';
import { Text, FlatList, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types'; // ES6

import { Container } from '../components/Container';
import questionsList from '../data/questionsList';
// import {IonIcons} from '@expo/vector-icons';

const SELECTED = 'What was the most rewarding part of being an MIT?';
class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    };
    handlePress = () => {
        this.props.navigation.navigate('RecordVideo');
    };

    render() {
        return (
        <Container>

            < View style={{ flex: 1 }}>
                <StatusBar translucent={false} barStyle="light-content" />
            </View>
        </Container>
        )
    };

}

export default Home;