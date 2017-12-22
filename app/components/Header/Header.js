import React from 'react';

import { View, Text, StatusBar } from 'react-native';
import styles from './styles';

const Header = ({title}) => (
    <View style={styles.container}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default Header;
