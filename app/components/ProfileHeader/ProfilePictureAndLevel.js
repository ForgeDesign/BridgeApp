import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hero from 'react-native-hero';
import { Icon } from 'native-base';
import { View, TouchableOpacity, AppRegistry, Text, Picker, AsyncStorage, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';
import store from 'react-native-simple-store';
import { Dimensions } from 'react-native';



const circleWidth = Dimensions.get('window').width / 6;


export default class ProfilePictureAndLevel extends React.Component 
{
    
    constructor(props) {
        super(props)

        this.state = 
        {
            profilePic: "../../assets/images/black.jpg"
        };
        this.addProfilePic = this.addProfilePic.bind(this);
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


                this.setState({profilePic: source});

                let obj = {
                    profilePic: this.state.profilePic
                }
                store.push('profilePic', obj);
            }
        })
    }

    _onRefresh() {
        this.setState({refreshing: true});
        store.get('profilePic').then((value) => {
          if (value!==null){
            this.setState({profilePic: value});
            this.forceUpdate();
          }
          this.setState({refreshing: false});
        });
      }

    render(){
        
        return(
                <TouchableOpacity  onPress={this.addProfilePic} style={{alignItems:'center', justifyContent: 'center', flexDirection:'column'}}>
                    
                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:circleWidth *2, height:circleWidth*2, borderRadius:circleWidth, backgroundColor:'black'}}>

                        <View>
                            <Image source={{uri:this.state.profilePic}} style={styles.profileIcon}/>
                        </View>


                        </View>
                        <View style={styles.oval}>
                            <Text style={{fontSize:10}}>Level Here</Text>
                        </View>
                    
                    
                </TouchableOpacity> 
        )

    }
}