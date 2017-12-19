import React from 'react';
import PropTypes from 'prop-types'; // ES6

import { View, Text } from 'react-native';
import styles from './styles';

const Header = ({title}) => (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

Header.PropTypes = {
    children: PropTypes.any,
}

export default Header;
