import { StackNavigator, NavigationActions } from 'react-navigation';
import Home from '../screens/Home';

export default StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: () => null,
        }

    },
    
})