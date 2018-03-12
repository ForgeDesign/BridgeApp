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

    card1() {
        return {
            imageName: require('./card1.png'),
            logo: {
                width: 50,
                height: 50,
                borderRadius: 50/2,
                position: 'absolute',
                top: '5%',
                bottom: undefined,
                right: undefined,
                left: '80%'
            },
            businame: {
                color: 'black',
                fontSize: 14,
                position: 'absolute',
                top: '6.5%',
                bottom: undefined,
                right: '4%',
                left: undefined,
                align: 'right'
            },
            website: {
                color: '$darkText',
                fontSize: 10,
                position: 'absolute',
                top: undefined,
                bottom: '-9.5%',
                right: '12%',
                left: undefined,
                align: 'right'
            },
            position: {
                color: 'white',
                fontSize: 14,
                position: 'absolute',
                top: '-8%',
                bottom: undefined,
                right: undefined,
                left: '5%'
            },
            phonenum: {
                color: '$darkText',
                fontSize: 10,
                position: 'absolute',
                top: undefined,
                bottom: '-2%',
                right: '12%',
                left: undefined,
                align: 'right'
            },
            name: {
                color: 'white',
                fontSize: 14,
                position: 'absolute',
                top: '-17%',
                bottom: undefined,
                right: undefined,
                left: '5%'
            },
            email: {
                color: '$darkText',
                fontSize: 10,
                position: 'absolute',
                top: undefined,
                bottom: '-17%',
                right: '12%',
                left: undefined,
                align: 'right'
            },
            address: {
                color: 'white',
                fontSize: 10,
                position: 'absolute',
                top: '8%',
                bottom: undefined,
                right: undefined,
                left: '5%'
            },
            address2: {
                color: 'white',
                fontSize: 10,
                position: 'absolute',
                top: '15%',
                bottom: undefined,
                right: undefined,
                left: '5%'
            },
        }
    }

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
                fontSize: 16,
                position: 'absolute',
                top: '-14%',
                bottom: undefined,
                right: undefined,
                left: '35%',
                align: 'right'
            },
            website: {
                color: 'black',
                fontSize: 10,
                position: 'absolute',
                top: '21.5%',
                bottom: undefined,
                right: '16%',
                left: undefined,
                align: 'right'
            },
            position: {
                color: 'white',
                fontSize: 10,
                position: 'absolute',
                top: '-9%',
                bottom: undefined,
                right: undefined,
                left: '3%'
            },
            phonenum: {
                color: 'black',
                fontSize: 10,
                position: 'absolute',
                top: '13%',
                bottom: undefined,
                right: '16%',
                left: undefined,
                align: 'right'
            },
            name: {
                color: 'white',
                fontSize: 12,
                position: 'absolute',
                top: '-16%',
                bottom: undefined,
                right: undefined,
                left: '3%'
            },
            email: {
                color: 'black',
                fontSize: 10,
                position: 'absolute',
                top: '30%',
                bottom: undefined,
                right: '16%',
                left: undefined,
                align: 'right'
            },
            address: {
                color: 'white',
                fontSize: 10,
                position: 'absolute',
                top: undefined,
                bottom: '-9%',
                right: undefined,
                left: '5%'
            },
            address2: {
                color: 'white',
                fontSize: 10,
                position: 'absolute',
                top: undefined,
                bottom: '-16%',
                right: undefined,
                left: '5%'
            },
        }
    }

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
                fontSize: 16,
                position: 'absolute',
                top: undefined,
                bottom: '-15%',
                right: undefined,
                left: '3%'
            },
            website: {
                color: 'gray',
                fontSize: 10,
                position: 'absolute',
                top: '-19.5%',
                bottom: undefined,
                right: '5%',
                left: undefined,
                align: 'right'
            },
            position: {
                color: 'black',
                fontSize: 10,
                position: 'absolute',
                top: '-11.5%',
                bottom: undefined,
                right: undefined,
                left: '3%'
            },
            phonenum: {
                color: 'black',
                fontSize: 12,
                position: 'absolute',
                top: '26.75%',
                bottom: undefined,
                right: undefined,
                left: '58%'
            },
            name: {
                color: 'gray',
                fontSize: 10,
                position: 'absolute',
                top: '-19.5%',
                bottom: undefined,
                right: undefined,
                left: '3%'
            },
            email: {
                color: 'black',
                fontSize: 12,
                position: 'absolute',
                top: '36.75%',
                bottom: undefined,
                right: undefined,
                left: '58%'
            },
            address: {
                color: 'black',
                fontSize: 10,
                position: 'absolute',
                top: '-3.5%',
                bottom: undefined,
                right: undefined,
                left: '3%'
            },
            address2: {
                color: 'black',
                fontSize: 10,
                position: 'absolute',
                top: '4.5%',
                bottom: undefined,
                right: undefined,
                left: '3%'
            },
        }
    }

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
                fontSize: 12,
                position: 'absolute',
                top: '-9%',
                bottom: undefined,
                right: undefined,
                left: '20%'
            },
            website: {
                color: 'gray',
                fontSize: 11,
                position: 'absolute',
                top: '53.75%',
                bottom: undefined,
                right: undefined,
                left: '60%'
            },
            position: {
                color: 'white',
                fontSize: 12,
                position: 'absolute',
                top: '-6%',
                bottom: undefined,
                right: '3%',
                left: undefined,
                align: 'right'
            },
            phonenum: {
                color: 'gray',
                fontSize: 11,
                position: 'absolute',
                top: '43.5%',
                bottom: undefined,
                right: undefined,
                left: '60%'
            },
            name: {
                color: 'white',
                fontSize: 12,
                position: 'absolute',
                top: '-14%',
                bottom: undefined,
                right: '3%',
                left: undefined,
                align: 'right'
            },
            email: {
                color: 'gray',
                fontSize: 11,
                position: 'absolute',
                top: '64.75%',
                bottom: undefined,
                right: undefined,
                left: '60%'
            },
            address: {
                color: 'white',
                fontSize: 10,
                position: 'absolute',
                top: '13%',
                bottom: undefined,
                right: '3%',
                left: undefined,
                align: 'right'
            },
            address2: {
                color: 'white',
                fontSize: 10,
                position: 'absolute',
                top: '20%',
                bottom: undefined,
                right: '3%',
                left: undefined,
                align: 'right'
            },
        }
    }

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
                fontSize: 14,
                position: 'absolute',
                top: '23%',
                bottom: undefined,
                right: undefined,
                left: '5%'
            },
            website: {
                color: 'white',
                fontSize: 11,
                position: 'absolute',
                top: undefined,
                bottom: '-16.5%',
                right: undefined,
                left: '13%'
            },
            position: {
                color: 'black',
                fontSize: 12,
                position: 'absolute',
                top: '-7%',
                bottom: undefined,
                right: undefined,
                left: '63%'
            },
            phonenum: {
                color: 'white',
                fontSize: 13,
                position: 'absolute',
                top: undefined,
                bottom: '7.5%',
                right: undefined,
                left: '13%'
            },
            name: {
                color: 'black',
                fontSize: 12,
                position: 'absolute',
                top: '-14%',
                bottom: undefined,
                right: undefined,
                left: '63%'
            },
            email: {
                color: 'white',
                fontSize: 13,
                position: 'absolute',
                top: undefined,
                bottom: '-4%',
                right: undefined,
                left: '13%'
            },
            address: {
                color: 'black',
                fontSize: 10,
                position: 'absolute',
                top: '7%',
                bottom: undefined,
                right: undefined,
                left: '63%'
            },
            address2: {
                color: 'black',
                fontSize: 10,
                position: 'absolute',
                top: '15%',
                bottom: undefined,
                right: undefined,
                left: '63%'
            },
        }
    }

}