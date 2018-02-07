import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, KeyboardAvoidingView, } from 'react-native';
import styles from './styles';
import { Icon } from 'native-base';

class ProfileActivity extends React.Component {

    state = {
        heart: false,
        activity: ""
    }
    
    addActivity(activity) {
        this.setState({activity: activity})
    }

    heart = () => { this.setState({heart: true})}
    unheart = () => { this.setState({heart: false})}
    
    render() {
        style = styles.container
        addButton = <TouchableOpacity
                        style={{alignSelf: 'flex-end', marginRight: 15, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => this.props.navigate()}>
                        <Icon name="md-add" style={{fontSize: 24, color: $primaryBlue}}/>
                    </TouchableOpacity>;
        if(!this.props.recommend || this.props.recommend == undefined) {
            addButton = undefined
            style = styles.container2
        }
        const heart = this.state.heart;
        iconColor = '#003E5B'
        if (this.props.text == "are looking for") {
            iconColor = $alertSuccess
        }
        time = this.props.time
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
        if (this.props.icon == undefined || this.props.icon == "") {
            isIcon = false
        }
        imageSrc = $defaultAssets[this.props.image]
        if (this.props.text == "are looking for" && this.props.recommend) {
            iconColor = $alertSuccess
            style = styles.container3
            addButton = undefined
            if (this.props.image != undefined && this.props.image != "") {
                isIcon = false
                imageSrc = {uri:this.props.image}
            }
        }
        if (this.props.image.indexOf("react-native-image-crop-pick" != -1) && this.props.text != "bridged with" && this.props.text != "is looking for a") {
            imageSrc = {uri:this.props.image}
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
            <View style={style}>
                <View style={styles.piccontainer}>
                    {isIcon ? (
                        <Icon
                        name={this.props.icon}
                        style={{color: iconColor}}
                        />
                    ) : (
                        <Image
                        source={imageSrc}
                        style={styles.image}/>
                    )}
                </View>
                <View style={styles.textcontainer}>
                    <Text style={styles.name}>{this.props.connector} {this.props.text} {this.props.connectee}!</Text>
                    <Text style={styles.location}>{this.state.activity}</Text>
                    <Text style={styles.activity}>{nowStr}{diffDays}{diffHrs}{diffMins}</Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        {addButton}{button}
                    </View>
                </View>
            </View>
        )
    }
}

export default ProfileActivity;
