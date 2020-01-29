import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CartView from '../Main/Shop/Cart/CartView';
import ProductDetail from '../Main/Shop/ProductDetail/ProductDetail';
 
const MainNavigator = { 
    CartView: {screen: CartView},
    ProductDetail: {screen: ProductDetail},
};
  
const Route = createStackNavigator(MainNavigator,{headerMode: 'none'});
  
export default createAppContainer(Route);
