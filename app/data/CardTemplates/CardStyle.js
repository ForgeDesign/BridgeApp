import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, AsyncStorage } from 'react-native';
import SimulateGetRequestForNow from './SimulateGetRequestForNow'
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

    async getTemplateNames() {
        templates = Array()
        await rootRef.child("templateCards").once().then(val => {
            val.forEach(child => {
                templates.push(child.val().template_name)
            })
        })
        return templates
    }

    async getStylingOf(cardnum, fontFamily) {
        templates = await this.getTemplates()
        var obj
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
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: businame.align,
                        color: businame.fill,
                        fontSize: businame.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: businame.top / heightRatio,
                        bottom: businame.bottom / heightRatio,
                        right: businame.right / widthRatio,
                        left: businame.left / widthRatio,
                        height: businame.height / heightRatio,
                        width: businame.width / widthRatio,
                        backgroundColor: "transparent"
                    },
                    websiteInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: website.align,
                        color: website.fill,
                        fontSize: website.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: website.top / heightRatio,
                        bottom: website.bottom / heightRatio,
                        right: website.right / widthRatio,
                        left: website.left / widthRatio,
                        height: website.height / heightRatio,
                        width: website.width / widthRatio,
                        backgroundColor: "transparent"
                    },
                    positionInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: position.align,
                        color: position.fill,
                        fontSize: position.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: position.top / heightRatio,
                        bottom: position.bottom / heightRatio,
                        right: position.right / widthRatio,
                        left: position.left / widthRatio,
                        height: position.height / heightRatio,
                        width: position.width / widthRatio,
                        backgroundColor: "transparent"
                    },
                    phonenumInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: phonenum.align,
                        color: phonenum.fill,
                        fontSize: phonenum.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: phonenum.top / heightRatio,
                        bottom: phonenum.bottom / heightRatio,
                        right: phonenum.right / widthRatio,
                        left: phonenum.left / widthRatio,
                        height: phonenum.height / heightRatio,
                        width: phonenum.width / widthRatio,
                        backgroundColor: "transparent"
                    },
                    nameInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: name.align,
                        color: name.fill,
                        fontSize: name.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: name.top / heightRatio,
                        bottom: name.bottom / heightRatio,
                        right: name.right / widthRatio,
                        left: name.left / widthRatio,
                        height: name.height / heightRatio,
                        width: name.width / widthRatio,
                        backgroundColor: "transparent"
                    },
                    emailInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: email.align,
                        color: email.fill,
                        fontSize: email.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: email.top / heightRatio,
                        bottom: email.bottom / heightRatio,
                        right: email.right / widthRatio,
                        left: email.left / widthRatio,
                        height: email.height / heightRatio,
                        width: email.width / widthRatio,
                        backgroundColor: "transparent"
                    },
                    addressInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: address.align,
                        color: address.fill,
                        fontSize: address.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: address.top / heightRatio,
                        bottom: address.bottom / heightRatio,
                        right: address.right / widthRatio,
                        left: address.left / widthRatio,
                        height: address.height / heightRatio,
                        width: address.width / widthRatio,
                        backgroundColor: "transparent"
                    },
                    address2Input: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: address2.align,
                        color: address2.fill,
                        fontSize: address2.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: address2.top / heightRatio,
                        bottom: address2.bottom / heightRatio,
                        right: address2.right / widthRatio,
                        left: address2.left / widthRatio,
                        height: address2.height / heightRatio,
                        width: address2.width / widthRatio,
                        backgroundColor: "transparent"
                    },
                }),
                image: element.card_schemes[0]
            }
            break
        }
        return obj
    }

    async getCardStyle(cardnum, fontFamily) {

        if (fontFamily == undefined || fontFamily == '') {
            fontFamily = 'system font'
        }
        block = false
        if (typeof cardnum === 'string') {
            block = true
            obj = await this.getStylingOf(cardnum, fontFamily)
            return obj
        }

        if(!block) {
            let cardStyleDetails = new SimulateGetRequestForNow().card(cardnum)
            return {
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
                        top: cardStyleDetails.logo.top / heightRatio,
                        bottom: cardStyleDetails.logo.bottom / heightRatio,
                        right: cardStyleDetails.logo.right / widthRatio,
                        left: cardStyleDetails.logo.left / widthRatio
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
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: cardStyleDetails.businame.textAlign,
                        color: cardStyleDetails.businame.color,
                        fontSize: cardStyleDetails.businame.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: cardStyleDetails.businame.top / heightRatio,
                        bottom: cardStyleDetails.businame.bottom / heightRatio,
                        right: cardStyleDetails.businame.right / widthRatio,
                        left: cardStyleDetails.businame.left / widthRatio,
                        height: cardStyleDetails.businame.height / heightRatio,
                        width: cardStyleDetails.businame.width / widthRatio,
                        backgroundColor: "transparent",
                        overflow: 'visible'
                    },
                    websiteInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: cardStyleDetails.website.textAlign,
                        color: cardStyleDetails.website.color,
                        fontSize: cardStyleDetails.website.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: cardStyleDetails.website.top / heightRatio,
                        bottom: cardStyleDetails.website.bottom / heightRatio,
                        right: cardStyleDetails.website.right / widthRatio,
                        left: cardStyleDetails.website.left / widthRatio,
                        height: cardStyleDetails.website.height / heightRatio,
                        width: cardStyleDetails.website.width / widthRatio,
                        backgroundColor: "transparent",
                        overflow: 'visible'
                    },
                    positionInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: cardStyleDetails.position.textAlign,
                        color: cardStyleDetails.position.color,
                        fontSize: cardStyleDetails.position.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: cardStyleDetails.position.top / heightRatio,
                        bottom: cardStyleDetails.position.bottom / heightRatio,
                        right: cardStyleDetails.position.right / widthRatio,
                        left: cardStyleDetails.position.left / widthRatio,
                        height: cardStyleDetails.position.height / heightRatio,
                        width: cardStyleDetails.position.width / widthRatio,
                        backgroundColor: "transparent",
                        overflow: 'visible'
                    },
                    phonenumInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: cardStyleDetails.phonenum.textAlign,
                        color: cardStyleDetails.phonenum.color,
                        fontSize: cardStyleDetails.phonenum.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: cardStyleDetails.phonenum.top / heightRatio,
                        bottom: cardStyleDetails.phonenum.bottom / heightRatio,
                        right: cardStyleDetails.phonenum.right / widthRatio,
                        left: cardStyleDetails.phonenum.left / widthRatio,
                        height: cardStyleDetails.phonenum.height / heightRatio,
                        width: cardStyleDetails.phonenum.width / widthRatio,
                        backgroundColor: "transparent",
                        overflow: 'visible'
                    },
                    nameInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: cardStyleDetails.name.textAlign,
                        color: cardStyleDetails.name.color,
                        fontSize: cardStyleDetails.name.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: cardStyleDetails.name.top / heightRatio,
                        bottom: cardStyleDetails.name.bottom / heightRatio,
                        right: cardStyleDetails.name.right / widthRatio,
                        left: cardStyleDetails.name.left / widthRatio,
                        height: cardStyleDetails.name.height / heightRatio,
                        width: cardStyleDetails.name.width / widthRatio,
                        backgroundColor: "transparent",
                        overflow: 'visible'
                    },
                    emailInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: cardStyleDetails.email.textAlign,
                        color: cardStyleDetails.email.color,
                        fontSize: cardStyleDetails.email.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: cardStyleDetails.email.top / heightRatio,
                        bottom: cardStyleDetails.email.bottom / heightRatio,
                        right: cardStyleDetails.email.right / widthRatio,
                        left: cardStyleDetails.email.left / widthRatio,
                        height: cardStyleDetails.email.height / heightRatio,
                        width: cardStyleDetails.email.width / widthRatio,
                        backgroundColor: "transparent",
                        overflow: 'visible'
                    },
                    addressInput: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: cardStyleDetails.address.textAlign,
                        color: cardStyleDetails.address.color,
                        fontSize: cardStyleDetails.address.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: cardStyleDetails.address.top / heightRatio,
                        bottom: cardStyleDetails.address.bottom / heightRatio,
                        right: cardStyleDetails.address.right / widthRatio,
                        left: cardStyleDetails.address.left / widthRatio,
                        height: cardStyleDetails.address.height / heightRatio,
                        width: cardStyleDetails.address.width / widthRatio,
                        backgroundColor: "transparent",
                        overflow: 'visible'
                    },
                    address2Input: {
                        zIndex: 100,
                        position: "absolute", 
                        textAlign: cardStyleDetails.address2.textAlign,
                        color: cardStyleDetails.address2.color,
                        fontSize: cardStyleDetails.address2.fontSize / 3.45,
                        fontFamily: fontFamily,
                        top: cardStyleDetails.address2.top / heightRatio,
                        bottom: cardStyleDetails.address2.bottom / heightRatio,
                        right: cardStyleDetails.address2.right / widthRatio,
                        left: cardStyleDetails.address2.left / widthRatio,
                        height: cardStyleDetails.address2.height / heightRatio,
                        width: cardStyleDetails.address2.width / widthRatio,
                        backgroundColor: "transparent",
                        overflow: 'visible'
                    },
                }),
                image: cardStyleDetails.imageName
            }
        }
    }
}