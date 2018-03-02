import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, AsyncStorage } from 'react-native';
import SimulateGetRequestForNow from './SimulateGetRequestForNow'
var {height, width} = Dimensions.get('window');

export default class CardStyle {

    getCardStyle(cardnum, fontFamily) {
        if (fontFamily == undefined || fontFamily == '') {
            fontFamily = 'system font'
        }
        let cardStyleDetails = new SimulateGetRequestForNow().card(cardnum)
        return {
            style: EStyleSheet.create({
                top: {
                    width: (width - 20),
                    height: ((width - 20) * .57),
                    borderRadius: 10,
                    marginTop: 10,
                    marginLeft: 10,
                    overflow: 'hidden',
                },
                logo: {
                    zIndex: 100,
                    width: 50,
                    height: 50,
                    borderRadius: 50/2,
                    position: 'absolute',
                    top: cardStyleDetails.logo.top,
                    bottom: cardStyleDetails.logo.bottom,
                    right: cardStyleDetails.logo.right,
                    left: cardStyleDetails.logo.left
                },
                container: {
                    width: (width-20),
                    height: ((width-20)*.57),
                },
                image: {
                    width: (width-20),
                    height: ((width-20)*.57),
                },
                businameInput: {
                    zIndex: 100,
                    textAlign: cardStyleDetails.businame.align,
                    color: cardStyleDetails.businame.color,
                    fontSize: cardStyleDetails.businame.fontSize,
                    fontFamily: fontFamily,
                    height: 15,
                    width: 200
                },
                businame: {
                    zIndex: 100,
                    color: cardStyleDetails.businame.color,
                    fontSize: cardStyleDetails.businame.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.businame.top,
                    bottom: cardStyleDetails.businame.bottom,
                    right: cardStyleDetails.businame.right,
                    left: cardStyleDetails.businame.left,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                websiteInput: {
                    zIndex: 100,
                    textAlign: cardStyleDetails.website.align,
                    color: cardStyleDetails.website.color,
                    fontSize: cardStyleDetails.website.fontSize,
                    fontFamily: fontFamily,
                    height: 15,
                    width: 200
                },
                website: {
                    zIndex: 100,
                    color: cardStyleDetails.website.color,
                    fontSize: cardStyleDetails.website.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.website.top,
                    bottom: cardStyleDetails.website.bottom,
                    right: cardStyleDetails.website.right,
                    left: cardStyleDetails.website.left,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                titleInput: {
                    zIndex: 100,
                    textAlign: cardStyleDetails.title.align,
                    color: cardStyleDetails.title.color,
                    fontSize: cardStyleDetails.title.fontSize,
                    fontFamily: fontFamily,
                    height: 15,
                    width: 200
                },
                title: {
                    zIndex: 100,
                    color: cardStyleDetails.title.color,
                    fontSize: cardStyleDetails.title.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.title.top,
                    bottom: cardStyleDetails.title.bottom,
                    right: cardStyleDetails.title.right,
                    left: cardStyleDetails.title.left,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                phonenumInput: {
                    zIndex: 100,
                    textAlign: cardStyleDetails.phonenum.align,
                    color: cardStyleDetails.phonenum.color,
                    fontSize: cardStyleDetails.phonenum.fontSize,
                    fontFamily: fontFamily,
                    height: 15,
                    width: 200
                },
                phonenum: {
                    zIndex: 100,
                    color: cardStyleDetails.phonenum.color,
                    fontSize: cardStyleDetails.phonenum.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.phonenum.top,
                    bottom: cardStyleDetails.phonenum.bottom,
                    right: cardStyleDetails.phonenum.right,
                    left: cardStyleDetails.phonenum.left,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                nameInput: {
                    zIndex: 100,
                    textAlign: cardStyleDetails.name.align,
                    color: cardStyleDetails.name.color,
                    fontSize: cardStyleDetails.name.fontSize,
                    fontFamily: fontFamily,
                    height: 15,
                    width: 200
                },
                name: {
                    zIndex: 100,
                    color: cardStyleDetails.name.color,
                    fontSize: cardStyleDetails.name.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.name.top,
                    bottom: cardStyleDetails.name.bottom,
                    right: cardStyleDetails.name.right,
                    left: cardStyleDetails.name.left,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                emailInput: {
                    zIndex: 100,
                    textAlign: cardStyleDetails.email.align,
                    color: cardStyleDetails.email.color,
                    fontSize: cardStyleDetails.email.fontSize,
                    fontFamily: fontFamily,
                    height: 15,
                    width: 200
                },
                email: {
                    zIndex: 100,
                    color: cardStyleDetails.email.color,
                    fontSize: cardStyleDetails.email.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.email.top,
                    bottom: cardStyleDetails.email.bottom,
                    right: cardStyleDetails.email.right,
                    left: cardStyleDetails.email.left,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                addressInput: {
                    zIndex: 100,
                    textAlign: cardStyleDetails.address.align,
                    color: cardStyleDetails.address.color,
                    fontSize: cardStyleDetails.address.fontSize,
                    fontFamily: fontFamily,
                    height: 15,
                    width: 200
                },
                address: {
                    zIndex: 100,
                    color: cardStyleDetails.address.color,
                    fontSize: cardStyleDetails.address.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.address.top,
                    bottom: cardStyleDetails.address.bottom,
                    right: cardStyleDetails.address.right,
                    left: cardStyleDetails.address.left,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                address2Input: {
                    zIndex: 100,
                    textAlign: cardStyleDetails.address2.align,
                    color: cardStyleDetails.address2.color,
                    fontSize: cardStyleDetails.address2.fontSize,
                    fontFamily: fontFamily,
                    height: 15,
                    width: 200
                },
                address2: {
                    zIndex: 100,
                    color: cardStyleDetails.address2.color,
                    fontSize: cardStyleDetails.address2.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.address2.top,
                    bottom: cardStyleDetails.address2.bottom,
                    right: cardStyleDetails.address2.right,
                    left: cardStyleDetails.address2.left,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
            }),
            image: cardStyleDetails.imageName
        }
    }
}