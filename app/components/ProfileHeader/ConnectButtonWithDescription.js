import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, Alert, TouchableOpacity, Text } from 'react-native';
import styles from './styles';



const showAlert = () => {
    Alert.alert(
        'Share Your Profile',
        'share.bridgeapp.io/johndoe23'
    )
}


const ConnectButtonWithDescription = ({pictureName, description}) => (
    <TouchableOpacity onPress={showAlert}>
        <View style={{flexDirection:'column', alignItems:'center'}}>
            <View style={styles.icon}>
                <Icon name={pictureName} style={{ color: '#fff' }}/>
            </View>
            <Text style={{color:'#668b9d'}}>
                {description}
            </Text>
        </View>

    </TouchableOpacity>
        
    
);

export default ConnectButtonWithDescription;