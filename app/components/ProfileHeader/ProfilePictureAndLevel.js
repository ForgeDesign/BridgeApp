import React from 'react';
import PropTypes from 'prop-types';
import Hero from 'react-native-hero';
import { Icon } from 'native-base';
import { View, TouchableOpacity, AppRegistry, Text, Picker, AsyncStorage, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';






export default class ProfilePictureAndLevel extends React.Component 
{
    state = 
    {
        profilePic: require("../../assets/images/black.jpg")
    }

    options = 
    {
        title: 'Select Profile Picture',
        noData: true,
        storageOptions:
        {
            skipBackup: true,
            path: 'images',
            waitUntilSaved: true
        }
    };

    async addProfilePic() {
        await ImagePicker.showImagePicker(this.options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {

                // You can also display the image using data:
                let source = response.uri;

                this.setState({
                    profilePic: source
                });
            }
        })
    }

    render(){
        return(
                // <View style={styles.profileIcon}>
                //     <TouchableOpacity onPress={this.addProfilePic} > 
                //         <Hero source={this.state.profilePic}
                //         renderOverlay={() => (
                            
                //                 <View style={styles.oval}>
                //                     <Text style={{fontSize:10}}>Level Here</Text>
                //                 </View>
                            
                //         )}
                //         />
                //     </TouchableOpacity>
                // </View>

                // <Image source={this.state.profilePic} style={styles.profileIcon}>
                // </Image>

                <Hero source={this.state.profilePic}
                    renderOverlay={() => (
                        <View style={styles.oval}>
                            <Text style={{fontSize:10}}>Level Here</Text>
                        </View>
                    )}
                />
        )

    }
}