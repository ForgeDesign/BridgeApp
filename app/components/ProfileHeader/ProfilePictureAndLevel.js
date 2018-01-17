import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hero from 'react-native-hero';
import { Icon } from 'native-base';
import { View, TouchableOpacity, AppRegistry, Text, Picker, AsyncStorage, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageCropper from 'react-native-image-crop-picker';

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
            profilePic: '../../assets/images/black.jpg'
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

    componentWillMount() {
        store.get('profileImage').then((value) => {
          if (value!==null){
          this.setState({profilePic: value.profilePic});
          this.forceUpdate();
          }
          else{
              this.setState({profilePic: '../../assets/images/black.jpg'})
          }
        });
      }

      /*_onRefresh() {
        store.get('profilePic').then((value) => {
          if (value!==null){
            this.setState({profilePic: value.profilePic});
            this.forceUpdate();
          }
        });
      }*/

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

                let source = response.uri;
                ImageCropper.openCropper({
                    path: source,
                    width: 300,
                    height: 400,
                    cropperCircleOverlay: true
                  }).then(image => {
                    this.setState({profilePic: image.path});

                    let obj = {
                        profilePic: this.state.profilePic
                    }
                    store.update('profileImage', {
                      profilePic: obj.profilePic });
    
                  });
                  

            }
        })
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
