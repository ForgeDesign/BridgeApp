import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const ProfilePictureAndLevel = () => (
    <TouchableOpacity>
            <View style={styles.profileIcon}>
                <View style={styles.oval}>
                    <Text style={{fontSize:10}}>Level Here</Text>
                </View>
        </View>
    </TouchableOpacity>
    
    
);

export default ProfilePictureAndLevel;