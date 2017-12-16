import { StackNavigator, NavigationActions } from 'react-navigation';
import Home from '../screens/Home';
import RecordVideo from '../screens/RecordVideo';

export default StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: () => null,
        }

    },
    RecordVideo: {
        screen: RecordVideo,
        navigationOptions: {
            header: () => null,
        }
        
    }
})