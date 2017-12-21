import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import ButtonWithDescription from './ButtonWithDescription';
import ProfilePictureAndLevel from './ProfilePictureAndLevel';

const ProfileHeader = () => (
    <View style={styles.background}>
        <ButtonWithDescription pictureName='md-share' description='Connect'/>
        <ProfilePictureAndLevel/>
        <ButtonWithDescription pictureName='md-card' description='Cards' />

        <Text style={{fontSize:20, color:'#fff'}}>
            John Doe, 23
        </Text>

    </View>
    
);

export default ProfileHeader;