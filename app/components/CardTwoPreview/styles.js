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
        top: 25,
        borderRadius: 50/2,
    },
    container: {
        width: (width-20),
        height: ((width-20)*.52),
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: (width-20),
        height: ((width-20)*.52),
    },
    headView: {
        flex: .2,
    },
    mainView: {
        flex: .5,
        alignItems: 'center',
        width: (width-20)
    },
    title: {
        color: 'black',
        fontSize: 22,
        right: 235,
    },
    tagline: {
        color: 'black',
        fontSize: 18,
        right: 175,
    },
    footView: {
        flex: .3,
        alignItems: 'flex-end',
        width: (width-20)
    },
    buisname: {
        color: 'black',
        fontSize: 12,
        left: 100,
        top: 30,
    },
    phonenum: {
        color: 'black',
        fontSize: 12,
        left: 100,
        top: 24,
    },
    name: {
        color: 'black',
        fontSize: 12,
        left: 120,
    },
});
