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
                    borderRadius: 10,
                    overflow: 'hidden',
                },
                logo: {
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
                businame: {
                    color: cardStyleDetails.businame.color,
                    fontSize: cardStyleDetails.businame.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.businame.top,
                    bottom: cardStyleDetails.businame.bottom,
                    right: cardStyleDetails.businame.right,
                    left: cardStyleDetails.businame.left
                },
                website: {
                    color: cardStyleDetails.website.color,
                    fontSize: cardStyleDetails.website.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.website.top,
                    bottom: cardStyleDetails.website.bottom,
                    right: cardStyleDetails.website.right,
                    left: cardStyleDetails.website.left
                },
                title: {
                    color: cardStyleDetails.title.color,
                    fontSize: cardStyleDetails.title.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.title.top,
                    bottom: cardStyleDetails.title.bottom,
                    right: cardStyleDetails.title.right,
                    left: cardStyleDetails.title.left
                },
                phonenum: {
                    color: cardStyleDetails.phonenum.color,
                    fontSize: cardStyleDetails.phonenum.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.phonenum.top,
                    bottom: cardStyleDetails.phonenum.bottom,
                    right: cardStyleDetails.phonenum.right,
                    left: cardStyleDetails.phonenum.left
                },
                name: {
                    color: cardStyleDetails.name.color,
                    fontSize: cardStyleDetails.name.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.name.top,
                    bottom: cardStyleDetails.name.bottom,
                    right: cardStyleDetails.name.right,
                    left: cardStyleDetails.name.left
                },
                email: {
                    color: cardStyleDetails.email.color,
                    fontSize: cardStyleDetails.email.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.email.top,
                    bottom: cardStyleDetails.email.bottom,
                    right: cardStyleDetails.email.right,
                    left: cardStyleDetails.email.left
                },
                address: {
                    color: cardStyleDetails.address.color,
                    fontSize: cardStyleDetails.address.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.address.top,
                    bottom: cardStyleDetails.address.bottom,
                    right: cardStyleDetails.address.right,
                    left: cardStyleDetails.address.left
                },
                address2: {
                    color: cardStyleDetails.address2.color,
                    fontSize: cardStyleDetails.address2.fontSize,
                    fontFamily: fontFamily,
                    position: 'absolute',
                    top: cardStyleDetails.address2.top,
                    bottom: cardStyleDetails.address2.bottom,
                    right: cardStyleDetails.address2.right,
                    left: cardStyleDetails.address2.left
                },
            }),
            image: cardStyleDetails.imageName
        }
    }
}