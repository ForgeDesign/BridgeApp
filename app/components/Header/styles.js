import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    container: {
      height: height*.12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '$primaryBlue',
    },
    title: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center'
    },
    logout: {
        position: "absolute",
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        right: 15,
        bottom: -7,
        // bottom: '2%'
    },
    upgrade: {
        position: "absolute",
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        paddingLeft: '12%',
        right: 315,
        bottom: -7,
        // bottom: '2%'
    },
    grid: {
        alignItems: 'center'
    },
    back: {
        paddingLeft: '20%',
        color: 'white',
    },
    plus: {
        paddingRight: '20%',
        alignItems: 'flex-end',
        textAlign: 'right',
        color: 'white',
    },

});
