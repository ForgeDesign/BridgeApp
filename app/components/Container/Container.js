import React from 'react';
import PropTypes from 'prop-types'; // ES6

import { View } from 'react-native';
import styles from './styles';

const Container = ({ children }) => (
    <View style={styles.container}>
        {children}
    </View>
);

Container.PropTypes = {
    children: PropTypes.any,
}

export default Container;
