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
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        paddingRight: '12%',
        bottom: '5%'
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
