import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import ButtonWithDescription from './ButtonWithDescription';
import ProfilePictureAndLevel from './ProfilePictureAndLevel';
import BigTextAndLowerText from './BigTextAndLowerText';

const ProfileHeader = () => (
    <View style={styles.background}>
        <View style={{flexDirection: 'row', justifyContent:'space-around', alignItems:'center'}}>
            <View>
                <ButtonWithDescription pictureName='md-share' description='Connect'/>
            </View>

            <View>
                <ProfilePictureAndLevel/>
            </View>
            
            <View>
                <ButtonWithDescription pictureName='md-card' description='Cards' />
            </View>
        </View>
        
        <View style={{flexDirection: 'row',justifyContent:'space-around', paddingTop:'2%'}}>
            <Text style={{fontSize:20, color:'#fff' }}>
                John Doe, 23
            </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:'center', paddingTop:'2%'}}>
            <BigTextAndLowerText bigText='325' lowerText='Captured Cards'/>
            <View style={{borderRightWidth:1, height:'100%', borderRightColor:'#668b9d'}}/>
            <BigTextAndLowerText bigText='12' lowerText='Business Cards'/>
            <View style={{borderRightWidth:1, height:'100%', borderRightColor:'#668b9d'}}/>
            <BigTextAndLowerText bigText='11/17' lowerText='Member Since'/>
        </View>
    </View>
    
);

export default ProfileHeader;