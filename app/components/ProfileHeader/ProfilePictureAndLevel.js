import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hero from 'react-native-hero';
import { Icon } from 'native-base';
import { View, TouchableOpacity, AppRegistry, Text, Picker, AsyncStorage, Image, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageCropper from 'react-native-image-crop-picker';

import styles from './styles';
import { Dimensions } from 'react-native';

import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

const circleWidth = Dimensions.get('window').width / 6;

Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () { 
    return Date.isLeapYear(this.getFullYear()); 
};

Date.prototype.getDaysInMonth = function () { 
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

const {height, width} = Dimensions.get('window'); 
const aspectRatio = height/width;

export default class ProfilePictureAndLevel extends React.Component
{

    constructor(props) {
        super(props)

        this.fontSize = 13
        if (aspectRatio < 1.6)
            this.fontSize = 10


        this.state =
        {
            profilePic: undefined,
            level: ""
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
        value = firebase.auth().currentUser.photoURL
        console.log(firebase.auth().currentUser)
        if (value !== null) {
            this.setState({ profilePic: value });
        }
        else {
            this.setState({ profilePic: undefined })
        }

        rootRef.child(firebase.auth().currentUser.uid + "person").once().then((val) => {
            this.setState({ profilePic: val.val().photoURL, level: val.val().level })
        })

        var pathPerson = firebase.auth().currentUser.uid + "person"
        rootRef.child(pathPerson).once().then(val => {
            var person = val._value
            if (person == null) {
                obj = JSON.parse(JSON.stringify( firebase.auth().currentUser._user ))
                obj.level = "Lite"
                delete obj.refreshToken
                delete obj.providerId
                delete obj.providerData
                delete obj.uid
                delete obj.metadata
                delete obj.phoneNumber
                delete obj.isAnonymous
                delete obj.emailVerified
                delete obj.email
                rootRef.child(pathPerson).set(obj).then(val => {
                    rootRef.child(firebase.auth().currentUser.uid + "person").once().then((val) => {
                        this.setState({ profilePic: val.val().photoURL, level: val.val().level })
                    })
                })
            }
        })
    }

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
                    compressImageQuality: 0.3,
                    includeBase64: true,
                    path: source,
                    width: 300,
                    height: 400,
                    cropperCircleOverlay: true
                  }).then(image => {
                      based64 = "data:" + image.mime + ";base64," + image.data
                    this.setState({profilePic: based64});
                    // firebase.auth().currentUser.updateProfile({photoURL: based64})
                    // firebase.auth().currentUser.reload()

                    var pathPerson = firebase.auth().currentUser.uid + "person/photoURL"
                    rootRef.child(pathPerson).set(based64)
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
                        <View style={this.state.level == "Pro" ? styles.oval : styles.oval2}>
                            <Text style={this.state.level == "Pro" ? {fontSize:this.fontSize, fontWeight:"bold", color:"black"} : {fontSize:10}}>{this.state.level}</Text>
                        </View>


                </TouchableOpacity>
        )
    }
}
