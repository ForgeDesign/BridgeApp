import React from 'react';

import { View, Text } from 'react-native';
import styles from './styles';

const HeaderSmall = ({title}) => (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default HeaderSmall;
