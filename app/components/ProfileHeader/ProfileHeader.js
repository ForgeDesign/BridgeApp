import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import ButtonWithDescription from './ButtonWithDescription';

const ProfileHeader = () => (
    <View style={styles.background}>
        <ButtonWithDescription/>
    </View>
);

export default ProfileHeader;