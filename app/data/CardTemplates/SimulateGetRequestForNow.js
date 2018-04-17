import React from 'react';

export default class SimulateGetRequestForNow {

    card(cardnum) {
        switch (cardnum) {
            case 1:
                return this.card1()
                break;
            case 2:
                return this.card2()
                break;
            case 3:
                return this.card3()
                break;
            case 4:
                return this.card4()
                break;
            case 5:
                return this.card5()
                break;
            default:
                break;
        }
    }

    // black and yellow
    card1() {
        return {
            imageName: require('./card1.png'),
            logo: {
                width: 50,
                height: 50,
                borderRadius: 50/2,
                position: 'absolute',
                top: 50,
                bottom: undefined,
                right: undefined,
                left: 850
            },
            businame: {
                color: 'black',
                fontSize: 48.3,
                position: 'absolute',
                top: 202.99998952229924,
                bottom: undefined,
                right: undefined,
                left: 759,
                align: 'right',
                width: 213.3046875,
                height: 54.57899999999999
            },
            position: {
                color: 'white',
                fontSize: 48.3,
                position: 'absolute',
                top: 73.00000274658174,
                bottom: undefined,
                right: undefined,
                left: 35,
                width: 96,
                height: 54.57899999999999
            },
            phonenum: {
                color: '$darkText',
                fontSize: 34.5,
                position: 'absolute',
                top: 441.99996520996444,
                bottom: undefined,
                right: undefined,
                left: 747,
                align: 'right',
                width: 175,
                height: 38.985,
                lineHeight: 1.16
            },
            website: {
                color: '$darkText',
                fontSize: 34.5,
                position: 'absolute',
                top: 483.99996093750394,
                bottom: undefined,
                right: undefined,
                left: 617,
                align: 'right',
                width: 306.19873046875,
                height: 38.985,
                lineHeight: 1.16
            },
            email: {
                color: '$darkText',
                fontSize: 34.5,
                position: 'absolute',
                top: 530.9999561564172,
                bottom: undefined,
                right: undefined,
                left: 620,
                align: 'right',
                width: 303.37890625,
                height: 38.985,
                lineHeight: 1.16,
            },
            name: {
                color: 'white',
                fontSize: 48.3,
                position: 'absolute',
                top: 19.000008239745263,
                bottom: undefined,
                right: undefined,
                left: 35,
                width: 287.34375,
                height: 54.57899999999999
            },
            address: {
                color: 'white',
                fontSize: 34.5,
                position: 'absolute',
                top: 165.99999328613347,
                bottom: undefined,
                right: undefined,
                left: 35,
                width: 272.15576171875,
                height: 38.985
            },
            address2: {
                color: 'white',
                fontSize: 34.5,
                position: 'absolute',
                top: 216.99998809814574,
                bottom: undefined,
                right: undefined,
                left: 35,
                width: 253.4423828125,
                height: 38.985
            },
        }
    }

    // blue and white
    card2() {
        return {
            imageName: require('./card2.png'),
            logo: {
                width: 50,
                height: 50,
                borderRadius: 50/2,
                position: 'absolute',
                top: '35%',
                bottom: undefined,
                right: undefined,
                left: '8%'
            },
            businame: {
                color: 'black',
                fontSize: 55.2,
                position: 'absolute',
                top: 50,
                bottom: undefined,
                right: undefined,
                left: 750,
                align: 'right',
                width: 244.41162109375,
                height: 62.376
            },
            website: {
                color: 'black',
                fontSize: 34.5,
                position: 'absolute',
                top: '21.5%',
                bottom: undefined,
                right: '16%',
                left: undefined,
                align: 'right',
                width: 62.376,
                height: 62.376
            },
            position: {
                color: 'white',
                fontSize: 34.5,
                position: 'absolute',
                top: 108,
                bottom: undefined,
                right: undefined,
                left: 13,
                width: 70,
                height: 38.985
            },
            phonenum: {
                color: 'black',
                fontSize: 34.5,
                position: 'absolute',
                top: '13%',
                bottom: undefined,
                right: '16%',
                left: undefined,
                align: 'right',
                width: 62.376,
                height: 62.376
            },
            name: {
                color: 'white',
                fontSize: 41.4,
                position: 'absolute',
                top: 50,
                bottom: undefined,
                right: undefined,
                left: 14,
                width: 245.439453125,
                height: 46.782
            },
            email: {
                color: 'black',
                fontSize: 34.5,
                position: 'absolute',
                top: '30%',
                bottom: undefined,
                right: '16%',
                left: undefined,
                align: 'right',
                width: 62.376,
                height: 62.376
            },
            address: {
                color: 'white',
                fontSize: 34.5,
                position: 'absolute',
                top: undefined,
                bottom: '-9%',
                right: undefined,
                left: '5%',
                width: 62.376,
                height: 62.376
            },
            address2: {
                color: 'white',
                fontSize: 34.5,
                position: 'absolute',
                top: undefined,
                bottom: '-16%',
                right: undefined,
                left: '5%',
                width: 62.376,
                height: 62.376
            },
        }
    }

    // minimalistic
    card3() {
        return {
            imageName: require('./card3.png'),
            logo: {
                width: 50,
                height: 50,
                borderRadius: 50/2,
                position: 'absolute',
                top: '45%',
                bottom: undefined,
                right: undefined,
                left: '20%'
            },
            businame: {
                color: 'black',
                fontSize: 55.2,
                position: 'absolute',
                top: undefined,
                bottom: '-15%',
                right: undefined,
                left: '3%',
                width: 100,
                height: 100
            },
            website: {
                color: 'gray',
                fontSize: 34.5,
                position: 'absolute',
                top: '-19.5%',
                bottom: undefined,
                right: '5%',
                left: undefined,
                align: 'right',
                width: 100,
                height: 100
            },
            position: {
                color: 'black',
                fontSize: 34.5,
                position: 'absolute',
                top: '-11.5%',
                bottom: undefined,
                right: undefined,
                left: '3%',
                width: 100,
                height: 100
            },
            phonenum: {
                color: 'black',
                fontSize: 41.4,
                position: 'absolute',
                top: '26.75%',
                bottom: undefined,
                right: undefined,
                left: '58%',
                width: 100,
                height: 100
            },
            name: {
                color: 'gray',
                fontSize: 34.5,
                position: 'absolute',
                top: '-19.5%',
                bottom: undefined,
                right: undefined,
                left: '3%',
                width: 100,
                height: 100
            },
            email: {
                color: 'black',
                fontSize: 41.4,
                position: 'absolute',
                top: '36.75%',
                bottom: undefined,
                right: undefined,
                left: '58%',
                width: 100,
                height: 100
            },
            address: {
                color: 'black',
                fontSize: 34.5,
                position: 'absolute',
                top: '-3.5%',
                bottom: undefined,
                right: undefined,
                left: '3%',
                width: 100,
                height: 100
            },
            address2: {
                color: 'black',
                fontSize: 34.5,
                position: 'absolute',
                top: '4.5%',
                bottom: undefined,
                right: undefined,
                left: '3%',
                width: 100,
                height: 100
            },
        }
    }

    // carbon
    card4() {
        return {
            imageName: require('./card4.png'),
            logo: {
                width: 50,
                height: 50,
                borderRadius: 50/2,
                position: 'absolute',
                top: '5%',
                bottom: undefined,
                right: undefined,
                left: '4%'
            },
            businame: {
                color: 'white',
                fontSize: 41.4,
                position: 'absolute',
                top: '-9%',
                bottom: undefined,
                right: undefined,
                left: '20%'
            },
            website: {
                color: 'gray',
                fontSize: 37.95,
                position: 'absolute',
                top: '53.75%',
                bottom: undefined,
                right: undefined,
                left: '60%'
            },
            position: {
                color: 'white',
                fontSize: 41.4,
                position: 'absolute',
                top: '-6%',
                bottom: undefined,
                right: '3%',
                left: undefined,
                align: 'right'
            },
            phonenum: {
                color: 'gray',
                fontSize: 37.95,
                position: 'absolute',
                top: '43.5%',
                bottom: undefined,
                right: undefined,
                left: '60%'
            },
            name: {
                color: 'white',
                fontSize: 41.4,
                position: 'absolute',
                top: '-14%',
                bottom: undefined,
                right: '3%',
                left: undefined,
                align: 'right'
            },
            email: {
                color: 'gray',
                fontSize: 37.95,
                position: 'absolute',
                top: '64.75%',
                bottom: undefined,
                right: undefined,
                left: '60%'
            },
            address: {
                color: 'white',
                fontSize: 34.5,
                position: 'absolute',
                top: '13%',
                bottom: undefined,
                right: '3%',
                left: undefined,
                align: 'right'
            },
            address2: {
                color: 'white',
                fontSize: 34.5,
                position: 'absolute',
                top: '20%',
                bottom: undefined,
                right: '3%',
                left: undefined,
                align: 'right'
            },
        }
    }

    // red and white
    card5() {
        return {
            imageName: require('./card5.png'),
            logo: {
                width: 50,
                height: 50,
                borderRadius: 50/2,
                position: 'absolute',
                top: '6%',
                bottom: undefined,
                right: undefined,
                left: '14%'
            },
            businame: {
                color: 'white',
                fontSize: 48.3,
                position: 'absolute',
                top: '23%',
                bottom: undefined,
                right: undefined,
                left: '5%'
            },
            website: {
                color: 'white',
                fontSize: 37.95,
                position: 'absolute',
                top: undefined,
                bottom: '-16.5%',
                right: undefined,
                left: '13%'
            },
            position: {
                color: 'black',
                fontSize: 41.4,
                position: 'absolute',
                top: '-7%',
                bottom: undefined,
                right: undefined,
                left: '63%'
            },
            phonenum: {
                color: 'white',
                fontSize: 44.85,
                position: 'absolute',
                top: undefined,
                bottom: '7.5%',
                right: undefined,
                left: '13%'
            },
            name: {
                color: 'black',
                fontSize: 41.4,
                position: 'absolute',
                top: '-14%',
                bottom: undefined,
                right: undefined,
                left: '63%'
            },
            email: {
                color: 'white',
                fontSize: 44.85,
                position: 'absolute',
                top: undefined,
                bottom: '-4%',
                right: undefined,
                left: '13%'
            },
            address: {
                color: 'black',
                fontSize: 34.5,
                position: 'absolute',
                top: '7%',
                bottom: undefined,
                right: undefined,
                left: '63%'
            },
            address2: {
                color: 'black',
                fontSize: 34.5,
                position: 'absolute',
                top: '15%',
                bottom: undefined,
                right: undefined,
                left: '63%'
            },
        }
    }

}