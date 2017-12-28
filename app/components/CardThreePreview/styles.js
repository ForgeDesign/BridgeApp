import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    top: {
        width: (width-20),
        height: ((width-20)*.52),
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    logo: {
        width: 50,
        height: 50,
        right: 110,
        borderRadius: 50/2,
    },
    container: {
        width: (width-20),
        height: ((width-20)*.52),
    },
    image: {
        width: (width-20),
        height: ((width-20)*.52),
    },
    title: {
        color: 'black',
        fontSize: 22,
    },
    website: {
        color: 'white',
        fontSize: 26,
    },
    buisname: {
        color: 'white',
        fontSize: 14,
        marginRight: 8,
    },
    phonenum: {
        color: '$inputText',
        fontSize: 12,
        marginRight: 8,
    },
    email: {

    },
    address: {

    },
    name: {

    },

});
