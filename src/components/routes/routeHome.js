import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeView from '../Main/Shop/Home/HomeView';
import ListProduct from '../Main/Shop/ListProduct/ListProduct';
import ProductDetail from '../Main/Shop/ProductDetail/ProductDetail';
 
const MainNavigator = { 
    HomeView: {screen: HomeView},
    ListProduct: {screen: ListProduct},
    ProductDetail: {screen: ProductDetail},
};
  
const Route = createStackNavigator(MainNavigator,{headerMode: 'none'});
  
export default createAppContainer(Route);
