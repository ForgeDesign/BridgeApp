import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';



const ButtonWithDescription = ({pictureName, description}) => (
    <TouchableOpacity>
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

export default ButtonWithDescription;