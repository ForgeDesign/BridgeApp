import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';


const ProfileHeader = () => (
    <View style={styles.background}>
        <View style={styles.threeIcons}>
            <View style={styles.icon}>
                <Icon name={'md-share'} size={26} style={{ color: '#fff' }}/>
            </View>

            <View style={styles.profileIcon}>

            </View>

            <View style={styles.icon}>
                <Icon name={'md-card'} size={26} style={{ color: '#fff' }}/>
            </View>
        </View>
    </View>
);

export default ProfileHeader;