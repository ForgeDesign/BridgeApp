import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: width*.3,
        marginRight: width*.3,
        marginTop: 15,
        bottom: "5%"
      },
      buttonText: {
        fontSize: 16,
        color: 'white',
      },
});
