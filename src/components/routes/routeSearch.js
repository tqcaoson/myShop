import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SearchView from '../Main/Shop/Search/SearchView';
import ProductDetail from '../Main/Shop/ProductDetail/ProductDetail';
 
const MainNavigator = { 
    SearchView: {screen: SearchView},
    ProductDetail: {screen: ProductDetail},
};
  
const Route = createStackNavigator(MainNavigator,{headerMode: 'none'});
  
export default createAppContainer(Route);
