import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';



const ButtonWithDescription = () => (
    <View style={styles.icon}>
        <Icon name={'md-share'} size={26} style={{ color: '#fff' }}/>
   </View>
);

export default ButtonWithDescription;