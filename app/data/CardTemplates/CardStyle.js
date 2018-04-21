import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, AsyncStorage } from 'react-native';
var {height, width} = Dimensions.get('window');

var widthRatio = (1050 / 355) * 1.0009
var heightRatio = (600 / 202.35) * 1.0009

import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

export default class CardStyle {

    async getTemplates() {
        templates = Array()
        await rootRef.child("templateCards").once().then(val => {
            val.forEach(child => {
                templates.push(child.val())
            })
        })
        return templates
    }

    async getCardStyle(cardnum, fontFamily) {

        if (fontFamily == undefined || fontFamily == '') {
            fontFamily = 'system font'
        }
        block = false
        if (typeof cardnum === 'string') {
            obj = await this.getStylingOf(cardnum, fontFamily)
            return obj
        }
        else {
            switch (cardnum) {
                case 1:
                    cardnum = "Black and Yellow"
                    break;
                case 2:
                    cardnum = "Blue and White"
                    break;
                case 3:
                    cardnum = "Minimalistic"
                    break;
                case 4:
                    cardnum = "Carbon"
                    break;
                case 5:
                    cardnum = "Red and White"
                    break;
                default:
                    cardnum = "IMAGE"
                    break;
            }
            obj = await this.getStylingOf(cardnum, fontFamily)
            return obj
        }
    }

    async getStylingOf(cardnum, fontFamily) {
        
        templates = await this.getTemplates()
        var obj
        if(cardnum == "IMAGE") {
            obj = {
                style: EStyleSheet.create({
                    androidAdjust: {
                        left: '4.5%'
                    },
                    normalscaped: {
                        marginBottom: 10,
                        zIndex: 2000
                    },
                    cardLandscapedIos: {
                        width: '100%',
                        height: '100%',
                        transform: [
                            { rotate: '90deg'}, 
                            { scaleX: 1.85 }, 
                            { scaleY: 1.85 }
                        ], 
                        borderWidth: 0,
                        top: '135%',
                        left: '-5%', 
                    },
                    cardLandscapedAndroid: {
                        padding: 0,
                        width: 355,
                        height: 202.35,
                        transform: [
                            { rotate: '90deg'}, 
                            { scaleX: 1.55 }, 
                            { scaleY: 1.55 }
                        ], 
                        borderWidth: 0,
                        left: '-5%', 
                        top: '83%'
                    },
                    card: {
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#d6d7da',
                        overflow: 'hidden',
                    },
                    cardBack: {
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#d6d7da',
                        overflow: 'hidden',
                        backgroundColor: '#FFFFFF',
                    },
                    notes: {
                        position: 'absolute',
                        top: '5%',
                        right: '25%',
                        width: '70%',
                        textAlign:'center',
                        zIndex: 100
                    },
                    inputs: {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: 100
                    },
                    container: {
                        width: 355,
                        height: 202.35,
                        left: 10,
                        marginTop: 10
                    },
                    image: {
                        width: '100%',
                        height: '100%',
                        zIndex: 1
                    },
                }),
            }
        }
        for (let index = 0; index < templates.length; index++) {
            const element = templates[index];
            if(element.template_name != cardnum)
                continue
            
            var logo, businame, website, position, phonenum, name, email, address, address2
            for (let index2 = 0; index2 < element.stylings.length; index2++) {
                const style = element.stylings[index2];
                if (style.type == "image")
                    logo = style
                if (style.text == "ryan@bridgeapp.com")
                    email = style
                else if (style.text == "https://bridgeapp.com")
                    website = style
                else if (style.text == "3301849102")
                    phonenum = style
                else if (style.text == "BridgeApp")
                    businame = style
                else if (style.text == "1849 Address Lane")
                    address = style
                else if (style.text == "Stow, Ohio 44224")
                    address2 = style
                else if (style.text == "CEO")
                    position = style
                else if (style.text == "Ryan Camardo")
                    name = style                         
            }

            obj = {
                style: EStyleSheet.create({
                    androidAdjust: {
                        left: '4.5%'
                    },
                    normalscaped: {
                        marginBottom: 10,
                        zIndex: 2000
                    },
                    cardLandscapedIos: {
                        width: '100%',
                        height: '100%',
                        transform: [
                            { rotate: '90deg'}, 
                            { scaleX: 1.85 }, 
                            { scaleY: 1.85 }
                        ], 
                        borderWidth: 0,
                        top: '135%',
                        left: '-5%', 
                    },
                    cardLandscapedAndroid: {
                        padding: 0,
                        width: 355,
                        height: 202.35,
                        transform: [
                            { rotate: '90deg'}, 
                            { scaleX: 1.55 }, 
                            { scaleY: 1.55 }
                        ], 
                        borderWidth: 0,
                        left: '-5%', 
                        top: '83%'
                    },
                    card: {
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#d6d7da',
                        overflow: 'hidden',
                    },
                    cardBack: {
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#d6d7da',
                        overflow: 'hidden',
                        backgroundColor: '#FFFFFF',
                    },
                    notes: {
                        position: 'absolute',
                        top: '5%',
                        right: '25%',
                        width: '70%',
                        textAlign:'center',
                        zIndex: 100
                    },
                    inputs: {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: 100
                    },
                    logo: {
                        zIndex: 100,
                        width: 50,
                        height: 50,
                        borderRadius: 50/2,
                        position: 'absolute',
                        top: logo.top / heightRatio,
                        bottom: logo.bottom / heightRatio,
                        right: logo.right / widthRatio,
                        left: logo.left / widthRatio
                    },
                    container: {
                        width: 355,
                        height: 202.35,
                        left: 10,
                        marginTop: 10
                    },
                    image: {
                        width: '100%',
                        height: '100%',
                        zIndex: 1
                    },
                    businameInput: {
                        textAlign: businame.textAlign,
                        color: businame.fill,
                        fontSize: businame.fontSize / 3.45,
                        fontFamily: fontFamily,
                        backgroundColor: "transparent",
                    },
                    businameTouch: {
                        zIndex: 100,
                        position: "absolute", 
                        top: businame.top / heightRatio,
                        bottom: businame.bottom / heightRatio,
                        right: businame.right / widthRatio,
                        left: businame.left / widthRatio,
                        height: businame.height / heightRatio,
                        width: 1.4 * businame.width / widthRatio,
                    },
                    websiteInput: {
                        textAlign: website.textAlign,
                        color: website.fill,
                        fontSize: website.fontSize / 3.45,
                        fontFamily: fontFamily,
                        backgroundColor: "transparent",
                    },
                    websiteTouch: {
                        zIndex: 100,
                        position: "absolute", 
                        top: website.top / heightRatio,
                        bottom: website.bottom / heightRatio,
                        right: website.right / widthRatio,
                        left: website.left / widthRatio,
                        height: website.height / heightRatio,
                        width: 1.4 * website.width / widthRatio,
                    },
                    positionInput: {
                        textAlign: position.textAlign,
                        color: position.fill,
                        fontSize: position.fontSize / 3.45,
                        fontFamily: fontFamily,
                        backgroundColor: "transparent",
                    },
                    positionTouch: {
                        zIndex: 100,
                        position: "absolute", 
                        top: position.top / heightRatio,
                        bottom: position.bottom / heightRatio,
                        right: position.right / widthRatio,
                        left: position.left / widthRatio,
                        height: position.height / heightRatio,
                        width: 2 * position.width / widthRatio,
                    },
                    phonenumInput: {
                        textAlign: phonenum.textAlign,
                        color: phonenum.fill,
                        fontSize: phonenum.fontSize / 3.45,
                        fontFamily: fontFamily,
                        backgroundColor: "transparent",
                    },
                    phonenumTouch: {
                        zIndex: 100,
                        position: "absolute", 
                        top: phonenum.top / heightRatio,
                        bottom: phonenum.bottom / heightRatio,
                        right: phonenum.right / widthRatio,
                        left: phonenum.left / widthRatio,
                        height: phonenum.height / heightRatio,
                        width: 1.4 * phonenum.width / widthRatio,
                    },
                    nameInput: {
                        textAlign: name.textAlign,
                        color: name.fill,
                        fontSize: name.fontSize / 3.45,
                        fontFamily: fontFamily,
                        backgroundColor: "transparent",
                    },
                    nameTouch: {
                        zIndex: 100,
                        position: "absolute", 
                        top: name.top / heightRatio,
                        bottom: name.bottom / heightRatio,
                        right: name.right / widthRatio,
                        left: name.left / widthRatio,
                        height: name.height / heightRatio,
                        width: 1.4 * name.width / widthRatio,
                    },
                    emailInput: {
                        textAlign: email.textAlign,
                        color: email.fill,
                        fontSize: email.fontSize / 3.45,
                        fontFamily: fontFamily,
                        backgroundColor: "transparent",
                    },
                    emailTouch: {
                        zIndex: 100,
                        position: "absolute", 
                        top: email.top / heightRatio,
                        bottom: email.bottom / heightRatio,
                        right: email.right / widthRatio,
                        left: email.left / widthRatio,
                        height: email.height / heightRatio,
                        width: 1.4 * email.width / widthRatio,
                    },
                    addressInput: {
                        textAlign: address.textAlign,
                        color: address.fill,
                        fontSize: address.fontSize / 3.45,
                        fontFamily: fontFamily,
                        backgroundColor: "transparent",
                    },
                    addressTouch: {
                        zIndex: 100,
                        position: "absolute", 
                        top: address.top / heightRatio,
                        bottom: address.bottom / heightRatio,
                        right: address.right / widthRatio,
                        left: address.left / widthRatio,
                        height: address.height / heightRatio,
                        width: 1.4 * address.width / widthRatio,
                    },
                    address2Input: {
                        textAlign: address2.textAlign,
                        color: address2.fill,
                        fontSize: address2.fontSize / 3.45,
                        fontFamily: fontFamily,
                        backgroundColor: "transparent",
                    },
                    address2Touch: {
                        zIndex: 100,
                        position: "absolute", 
                        top: address2.top / heightRatio,
                        bottom: address2.bottom / heightRatio,
                        right: address2.right / widthRatio,
                        left: address2.left / widthRatio,
                        height: address2.height / heightRatio,
                        width: 1.4 * address2.width / widthRatio,
                    },
                }),
                image: element.card_schemes[0]
            }
            break
        }
        return obj
    }
}