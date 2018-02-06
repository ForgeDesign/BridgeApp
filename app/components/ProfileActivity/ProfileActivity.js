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
                    <Image
                    source={this.props.connectorpath}
                    style={styles.image}/>
                </View>
                <View style={styles.textcontainer}>
                    <Text style={styles.name}>{this.props.connector} bridged with {this.props.connectee}!</Text>
                    <Text style={styles.activity}>{this.props.time}</Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        {button}
                    </View>
                </View>
            </View>
        )
    }
}

export default ProfileActivity;
