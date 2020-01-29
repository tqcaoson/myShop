import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import Cart from "./Cart/Cart";
import Search from "./Search/Search";
import Header from "./Header";
import homeIconS from "../../../media/appIcon/home.png";
import homeIcon from "../../../media/appIcon/home0.png";
import cartIcon from "../../../media/appIcon/cart0.png";
import searchIcon from "../../../media/appIcon/search0.png";
import searchIconS from "../../../media/appIcon/search.png";
import cartIconS from "../../../media/appIcon/cart.png";
import contactIcon from "../../../media/appIcon/contact0.png";
import contactIconS from "../../../media/appIcon/contact.png";
import global from "../../global";

class Shop extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            selectedTab: 'Home',
        };
        global.gotoSearch = this.gotoSearch.bind(this);
    }

    gotoSearch() {
        this.setState({ selectedTab: 'Search' });
    }

    openMenu() {
        const { open } = this.props;
        open();
    }
    render() {
        const { selectedTab, cartArray } = this.state;
        const { iconStyle } = styles;
        return (
            <View style={{ flex: 1 }}>
                <Header onOpen={this.openMenu.bind(this)} />
                <TabNavigator>
                    <TabNavigator.Item
                        selected={selectedTab === 'Home'}
                        title="Home"
                        renderIcon={() => <Image style={iconStyle} source={homeIcon} />}
                        renderSelectedIcon={() => <Image style={iconStyle} source={homeIconS} />}
                        onPress={() => this.setState({ selectedTab: 'Home' })}
                        selectedTitleStyle={{color: '#34B089', fontFamily: 'Avenir'}}>
                        <Home />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'Contact'}
                        title="Contact"
                        selectedTitleStyle={{color: '#34B089', fontFamily: 'Avenir'}}
                        renderIcon={() => <Image style={iconStyle} source={contactIcon} />}
                        renderSelectedIcon={() => <Image style={iconStyle} source={contactIconS} />}
                        onPress={() => this.setState({ selectedTab: 'Contact' })}>
                        <Contact />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'Cart'}
                        title="Cart"
                        selectedTitleStyle={{color: '#34B089', fontFamily: 'Avenir'}}
                        renderIcon={() => <Image style={iconStyle} source={cartIcon} />}
                        renderSelectedIcon={() => <Image style={iconStyle} source={cartIconS} />}
                        onPress={() => this.setState({ selectedTab: 'Cart' })}>
                        <Cart cartArray={cartArray} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'Search'}
                        title="Search"
                        selectedTitleStyle={{color: '#34B089', fontFamily: 'Avenir'}} 
                        renderIcon={() => <Image style={iconStyle} source={searchIcon} />}
                        renderSelectedIcon={() => <Image style={iconStyle} source={searchIconS} />}
                        onPress={() => this.setState({ selectedTab: 'Search' })}>
                        <Search />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconStyle: {width: 20, height: 20},
});

export default Shop;