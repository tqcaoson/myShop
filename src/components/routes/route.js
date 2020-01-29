import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Authentication from '../Authentication/Authentication';
import Main from '../Main/Main';
import OrderHistory from '../OrderHistory/OrderHistory';
import ChangeInfo from '../ChangeInfo/ChangeInfo';

const MainNavigator = { 
    Main: {screen: Main},
    Authentication: {screen: Authentication},
    OrderHistory: {screen: OrderHistory},
    ChangeInfo: {screen: ChangeInfo},
};
  
const Route = createStackNavigator(MainNavigator);
  
export default createAppContainer(Route);