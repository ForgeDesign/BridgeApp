import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import ButtonWithDescription from './ButtonWithDescription';
import ConnectButtonWithDescription from './ConnectButtonWithDescription';
import ProfilePictureAndLevel from './ProfilePictureAndLevel';
import BigTextAndLowerText from './BigTextAndLowerText';
import Prompt from 'rn-prompt';
import store from 'react-native-simple-store';

export default class ProfileHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileName: 'Tap to add name',
            promptVisible: false
        };
    }
    componentWillMount() {
        store.get('profileName').then((value) => {
            if (value !== null) {
                this.setState({ profileName: value.profileName });
                this.forceUpdate();
            }
            else {
                this.setState({ profileName: 'Tap to add name' })
            }
        });
    }

    openConnect() {
        this.connect.openConnect()
    }

    render() {
        return (
            <View style={styles.background}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View>
                        <TouchableOpacity onPress={() => this.props.showPopup()}>
                            <ConnectButtonWithDescription ref={ref => this.connect = ref} pictureName='md-share' description='Connect' />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ProfilePictureAndLevel />
                    </View>

                    <View>
                        <ButtonWithDescription pictureName='md-card' description='Cards' navigation={this.props.navigation} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: '2%' }}>
                    <Text style={{ fontSize: 20, color: 'white' }} onPress={() => this.setState({ promptVisible: true })}>
                        {this.state.profileName}
                    </Text>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: '2%' }}>
                    <BigTextAndLowerText bigText='5' lowerText='Captured Cards' />
                    <View style={{ borderRightWidth: 1, height: '100%', borderRightColor: '#668b9d' }} />
                    <BigTextAndLowerText bigText='3' lowerText='Business Cards' />
                    <View style={{ borderRightWidth: 1, height: '100%', borderRightColor: '#668b9d' }} />
                    <BigTextAndLowerText bigText='11/17' lowerText='Member Since' />
                </View>
                <Prompt
                    title="What is your name? "
                    placeholder="John Doe"
                    visible={this.state.promptVisible}
                    onCancel={() => {

                            this.setState({
                                promptVisible: false
                            });
                        }
                    }
                    onSubmit={(value) => {
                        if (value == ' ' || value == '    ' || value == '   ' || value == '  ' || value == '') {
                            this.setState({
                                promptVisible: false,
                                profileName: 'Tap to add name'
                            });
                            store.update('profileName', {
                                profileName: 'Tap to add name'
                            });
                        }
                        else {
                            this.setState({
                                promptVisible: false,
                                profileName: value
                            });
                            store.update('profileName', {
                                profileName: value
                            });

                        }


                    }

                    } />

            </View>
        )
    }
}
