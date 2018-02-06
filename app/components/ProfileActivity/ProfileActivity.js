import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, KeyboardAvoidingView, } from 'react-native';
import styles from './styles';
import { Icon } from 'native-base';

class ProfileActivity extends React.Component {

    state = {
        heart: false,
    }
    
    heart = () => { this.setState({heart: true})}
    unheart = () => { this.setState({heart: false})}
    
    render() {
        const heart = this.state.heart;
        time = this.props.time
        console.log(time)
        var now = new Date();
        var then = new Date(time)
        nowStr = ''
        var diffMs = (now - then)
        var diffDays = Math.floor(diffMs / 86400000)
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000)
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
        if (diffDays == 0)
            diffDays = ''
        else 
            diffDays = diffDays + 'd '
        if (diffHrs == 0)
            diffHrs = ''
        else 
            diffHrs = diffHrs + 'h '
        if (diffMins == 0)
            diffMins = ''
        else 
            diffMins = diffMins + 'm '
        if(diffDays == '' && diffHrs == '' && diffMins == '')
            nowStr = 'Just now'
        isIcon = true
        if (this.props.icon == undefined) {
            isIcon = false
        }
        let button = null;
        if (heart) {
            button =
            <TouchableOpacity
                style={{alignSelf: 'flex-end', marginRight: 15, justifyContent: 'center', alignItems: 'center'}}
                onPress={this.unheart}>
                <Icon name="ios-heart" style={{fontSize: 24, color: 'pink'}}/>
            </TouchableOpacity>;
        } else {
            button =
            <TouchableOpacity
                style={{alignSelf: 'flex-end', marginRight: 15, justifyContent: 'center', alignItems: 'center'}}
                onPress={this.heart}>
                <Icon name="ios-heart-outline" style={{fontSize: 24}}/>
            </TouchableOpacity>;
        }
        return(
            <View style={styles.container}>
                <View style={styles.piccontainer}>
                    {isIcon ? (
                        <Icon
                        name={this.props.icon}
                        style={styles.icon}
                        />
                    ) : (
                        <Image
                        source={$defaultAssets[this.props.image]}
                        style={styles.image}/>
                    )}
                </View>
                <View style={styles.textcontainer}>
                    <Text style={styles.name}>{this.props.connector} {this.props.text} {this.props.connectee}!</Text>
                    <Text style={styles.activity}>{nowStr}{diffDays}{diffHrs}{diffMins}</Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        {button}
                    </View>
                </View>
            </View>
        )
    }
}

export default ProfileActivity;
