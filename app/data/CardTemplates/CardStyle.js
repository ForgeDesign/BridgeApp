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
                    width: (width-20),
                    height: ((width-20)*.57),
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
                notes: {
                    top: '-20%',
                    right: '-20%',
                    width: '70%',
                    textAlign:'center',
                    zIndex: 100
                },
                iosInputs: {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 100
                },
                androidInputs: {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 100,
                    top: 6
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
                    left: 10,
                    marginTop: 10
                },
                image: {
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                },
                backImageIos: {
                    width: '100%',
                    height: '100%',
                    top: '-58%',
                    left: '-3%',
                    zIndex: 1,
                },
                backImageAndroid: {
                    width: '100%',
                    height: '100%',
                    top: '-80%',
                    left: '-3%',
                    zIndex: 1,
                },
                businameInput: {
                    zIndex: 100,
                    position: "absolute", 
                    textAlign: cardStyleDetails.businame.align,
                    color: cardStyleDetails.businame.color,
                    fontSize: cardStyleDetails.businame.fontSize,
                    fontFamily: fontFamily,
                    top: cardStyleDetails.businame.top,
                    bottom: cardStyleDetails.businame.bottom,
                    right: cardStyleDetails.businame.right,
                    left: cardStyleDetails.businame.left,
                    backgroundColor: 'transparent',
                    height: 100,
                    width: 200
                },
                websiteInput: {
                    zIndex: 100,
                    position: "absolute", 
                    textAlign: cardStyleDetails.website.align,
                    color: cardStyleDetails.website.color,
                    fontSize: cardStyleDetails.website.fontSize,
                    fontFamily: fontFamily,
                    top: cardStyleDetails.website.top,
                    bottom: cardStyleDetails.website.bottom,
                    right: cardStyleDetails.website.right,
                    left: cardStyleDetails.website.left,
                    backgroundColor: 'transparent',
                    height: 100,
                    width: 200
                },
                positionInput: {
                    zIndex: 100,
                    position: "absolute", 
                    textAlign: cardStyleDetails.position.align,
                    color: cardStyleDetails.position.color,
                    fontSize: cardStyleDetails.position.fontSize,
                    fontFamily: fontFamily,
                    top: cardStyleDetails.position.top,
                    bottom: cardStyleDetails.position.bottom,
                    right: cardStyleDetails.position.right,
                    left: cardStyleDetails.position.left,
                    backgroundColor: 'transparent',
                    height: 100,
                    width: 200
                },
                phonenumInput: {
                    zIndex: 100,
                    position: "absolute", 
                    textAlign: cardStyleDetails.phonenum.align,
                    color: cardStyleDetails.phonenum.color,
                    fontSize: cardStyleDetails.phonenum.fontSize,
                    fontFamily: fontFamily,
                    top: cardStyleDetails.phonenum.top,
                    bottom: cardStyleDetails.phonenum.bottom,
                    right: cardStyleDetails.phonenum.right,
                    left: cardStyleDetails.phonenum.left,
                    backgroundColor: 'transparent',
                    height: 100,
                    width: 200
                },
                nameInput: {
                    zIndex: 100,
                    position: "absolute", 
                    textAlign: cardStyleDetails.name.align,
                    color: cardStyleDetails.name.color,
                    fontSize: cardStyleDetails.name.fontSize,
                    fontFamily: fontFamily,
                    top: cardStyleDetails.name.top,
                    bottom: cardStyleDetails.name.bottom,
                    right: cardStyleDetails.name.right,
                    left: cardStyleDetails.name.left,
                    backgroundColor: 'transparent',
                    height: 100,
                    width: 200
                },
                emailInput: {
                    zIndex: 100,
                    position: "absolute", 
                    textAlign: cardStyleDetails.email.align,
                    color: cardStyleDetails.email.color,
                    fontSize: cardStyleDetails.email.fontSize,
                    fontFamily: fontFamily,
                    top: cardStyleDetails.email.top,
                    bottom: cardStyleDetails.email.bottom,
                    right: cardStyleDetails.email.right,
                    left: cardStyleDetails.email.left,
                    backgroundColor: 'transparent',
                    height: 100,
                    width: 200
                },
                addressInput: {
                    zIndex: 100,
                    position: "absolute", 
                    textAlign: cardStyleDetails.address.align,
                    color: cardStyleDetails.address.color,
                    fontSize: cardStyleDetails.address.fontSize,
                    fontFamily: fontFamily,
                    top: cardStyleDetails.address.top,
                    bottom: cardStyleDetails.address.bottom,
                    right: cardStyleDetails.address.right,
                    left: cardStyleDetails.address.left,
                    backgroundColor: 'transparent',
                    height: 100,
                    width: 200
                },
                address2Input: {
                    zIndex: 100,
                    position: "absolute", 
                    textAlign: cardStyleDetails.address2.align,
                    color: cardStyleDetails.address2.color,
                    fontSize: cardStyleDetails.address2.fontSize,
                    fontFamily: fontFamily,
                    top: cardStyleDetails.address2.top,
                    bottom: cardStyleDetails.address2.bottom,
                    right: cardStyleDetails.address2.right,
                    left: cardStyleDetails.address2.left,
                    backgroundColor: 'transparent',
                    height: 100,
                    width: 200
                },
                // businameInputLandscaped: {
                //     zIndex: 100,
                //     position: "absolute", 
                //     textAlign: cardStyleDetails.businame.align,
                //     color: cardStyleDetails.businame.color,
                //     fontSize: cardStyleDetails.businame.fontSize,
                //     fontFamily: fontFamily,
                //     top: cardStyleDetails.businame.top,
                //     bottom: cardStyleDetails.businame.bottom,
                //     right: cardStyleDetails.businame.right,
                //     left: cardStyleDetails.businame.left,
                //     backgroundColor: 'transparent',
                //     height: 100,
                //     width: 200,
                //     transform: [
                //         { rotate: '90deg'}, 
                //         { scaleX: 1.85 }, 
                //         { scaleY: 1.85 }
                //     ], 
                // },
                // websiteInputLandscaped: {
                //     zIndex: 100,
                //     position: "absolute", 
                //     textAlign: cardStyleDetails.website.align,
                //     color: cardStyleDetails.website.color,
                //     fontSize: cardStyleDetails.website.fontSize,
                //     fontFamily: fontFamily,
                //     top: cardStyleDetails.website.top,
                //     bottom: cardStyleDetails.website.bottom,
                //     right: cardStyleDetails.website.right,
                //     left: cardStyleDetails.website.left,
                //     backgroundColor: 'transparent',
                //     height: 100,
                //     width: 200,
                //     transform: [
                //         { rotate: '90deg'}, 
                //         { scaleX: 1.85 }, 
                //         { scaleY: 1.85 }
                //     ], 
                // },
                // positionInputLandscaped: {
                //     zIndex: 100,
                //     position: "absolute", 
                //     textAlign: cardStyleDetails.position.align,
                //     color: cardStyleDetails.position.color,
                //     fontSize: cardStyleDetails.position.fontSize,
                //     fontFamily: fontFamily,
                //     top: cardStyleDetails.position.top,
                //     bottom: cardStyleDetails.position.bottom,
                //     right: cardStyleDetails.position.right,
                //     left: cardStyleDetails.position.left,
                //     backgroundColor: 'transparent',
                //     height: 100,
                //     width: 200,
                //     transform: [
                //         { rotate: '90deg'}, 
                //         { scaleX: 1.85 }, 
                //         { scaleY: 1.85 }
                //     ], 
                // },
                // phonenumInputLandscaped: {
                //     zIndex: 100,
                //     position: "absolute", 
                //     textAlign: cardStyleDetails.phonenum.align,
                //     color: cardStyleDetails.phonenum.color,
                //     fontSize: cardStyleDetails.phonenum.fontSize,
                //     fontFamily: fontFamily,
                //     top: cardStyleDetails.phonenum.top,
                //     bottom: cardStyleDetails.phonenum.bottom,
                //     right: cardStyleDetails.phonenum.right,
                //     left: cardStyleDetails.phonenum.left,
                //     backgroundColor: 'transparent',
                //     height: 100,
                //     width: 200,
                //     transform: [
                //         { rotate: '90deg'}, 
                //         { scaleX: 1.85 }, 
                //         { scaleY: 1.85 }
                //     ], 
                // },
                // nameInputLandscaped: {
                //     zIndex: 100,
                //     position: "absolute", 
                //     textAlign: cardStyleDetails.name.align,
                //     color: cardStyleDetails.name.color,
                //     fontSize: cardStyleDetails.name.fontSize,
                //     fontFamily: fontFamily,
                //     top: cardStyleDetails.name.top,
                //     bottom: cardStyleDetails.name.bottom,
                //     right: cardStyleDetails.name.right,
                //     left: cardStyleDetails.name.left,
                //     backgroundColor: 'transparent',
                //     height: 100,
                //     width: 200,
                //     transform: [
                //         { rotate: '90deg'}, 
                //         { scaleX: 1.85 }, 
                //         { scaleY: 1.85 }
                //     ], 
                // },
                // emailInputLandscaped: {
                //     zIndex: 100,
                //     position: "absolute", 
                //     textAlign: cardStyleDetails.email.align,
                //     color: cardStyleDetails.email.color,
                //     fontSize: cardStyleDetails.email.fontSize,
                //     fontFamily: fontFamily,
                //     top: cardStyleDetails.email.top,
                //     bottom: cardStyleDetails.email.bottom,
                //     right: cardStyleDetails.email.right,
                //     left: cardStyleDetails.email.left,
                //     backgroundColor: 'transparent',
                //     height: 100,
                //     width: 200,
                //     transform: [
                //         { rotate: '90deg'}, 
                //         { scaleX: 1.85 }, 
                //         { scaleY: 1.85 }
                //     ], 
                // },
                // addressInputLandscaped: {
                //     zIndex: 100,
                //     position: "absolute", 
                //     textAlign: cardStyleDetails.address.align,
                //     color: cardStyleDetails.address.color,
                //     fontSize: cardStyleDetails.address.fontSize,
                //     fontFamily: fontFamily,
                //     top: cardStyleDetails.address.top,
                //     bottom: cardStyleDetails.address.bottom,
                //     right: cardStyleDetails.address.right,
                //     left: cardStyleDetails.address.left,
                //     backgroundColor: 'transparent',
                //     height: 100,
                //     width: 200,
                //     transform: [
                //         { rotate: '90deg'}, 
                //         { scaleX: 1.85 }, 
                //         { scaleY: 1.85 }
                //     ], 
                // },
                // address2InputLandscaped: {
                //     zIndex: 100,
                //     position: "absolute", 
                //     textAlign: cardStyleDetails.address2.align,
                //     color: cardStyleDetails.address2.color,
                //     fontSize: cardStyleDetails.address2.fontSize,
                //     fontFamily: fontFamily,
                //     top: cardStyleDetails.address2.top,
                //     bottom: cardStyleDetails.address2.bottom,
                //     right: cardStyleDetails.address2.right,
                //     left: cardStyleDetails.address2.left,
                //     backgroundColor: 'transparent',
                //     height: 100,
                //     width: 200,
                //     transform: [
                //         { rotate: '90deg'}, 
                //         { scaleX: 1.85 }, 
                //         { scaleY: 1.85 }
                //     ], 
                // },
            }),
            image: cardStyleDetails.imageName
        }
    }
}