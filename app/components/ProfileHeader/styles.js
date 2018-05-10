import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const circleWidth = Dimensions.get('window').width / 6;

export default EStyleSheet.create({
    background: {
      flexDirection: 'column',
      height: Dimensions.get('window').height * 0.35,
      backgroundColor: '$primaryBlue',

    },
    icon: {
      height: circleWidth,
      width: circleWidth,
      borderRadius: circleWidth / 2,
      borderWidth: 2,
      borderColor: '#124C67',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    oval2: {
        width: circleWidth,
        height: circleWidth / 4,
        borderRadius: circleWidth / 2,
        backgroundColor: '$offwhite',
        flexDirection: 'column',
        alignItems: 'center',
  
      },
    oval: {
      width: circleWidth,
      height: circleWidth / 4,
      borderRadius: circleWidth / 2,
      backgroundColor: 'black',
      flexDirection: 'column',
      alignItems: 'center',

    },
    profileIcon:{
      height: circleWidth * 2,
      width: circleWidth * 2,
      borderRadius: circleWidth,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },

});
