import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';



const BigTextAndLowerText = ({bigText, lowerText}) => (
    <View style={{flexDirection:'column', alignItems:'center'}}>
        <Text style={{fontSize:16, color:'#668b9d'}}>
            {bigText}
        </Text>
        <Text style={{fontSize:10, color:'#668b9d'}}>
            {lowerText}
        </Text>
    </View>
    
    
    
);

export default BigTextAndLowerText;