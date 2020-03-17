import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView,
    Dimensions, StyleSheet, Image, Alert
} from 'react-native';

import global from '../../../global';
import saveCart from'../../../../api/saveCart';
import getCart from'../../../../api/getCart';
import sendOrder from '../../../../api/sendOrder';
import getToken from '../../../../api/getToken';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

const url = 'http://localhost/app/images/product/';

class CartView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartArray: [] 
        };
        global.addProductToCart = this.addProductToCart.bind(this);
    }
    componentDidMount() {
        getCart()
        .then(cartArray => this.setState({ cartArray }));
    }
    addProductToCart(product) {
        const isExist = this.state.cartArray.some(e => e.product.id === product.id);
        if (isExist) {
            const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== product.id) return e;
            return { product: e.product, quantity: e.quantity + 1 };
            });
            this.setState({ cartArray: newCart }, 
                () => saveCart(this.state.cartArray)
            );
            return false;
        }
        this.setState(
            { cartArray: this.state.cartArray.concat({ product, quantity: 1 }) }, 
            () => saveCart(this.state.cartArray)
        );
    }

    incrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== productId) return e;
            return { product: e.product, quantity: e.quantity + 1 };
        });
        this.setState({ cartArray: newCart }, 
            () => saveCart(this.state.cartArray)
        );
    }

    decrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== productId) return e;
            return { product: e.product, quantity: e.quantity - 1 };
        });
        this.setState({ cartArray: newCart }, 
            () => saveCart(this.state.cartArray)
        );
    }

    removeProduct(productId) {
        const newCart = this.state.cartArray.filter(e => e.product.id !== productId);
        this.setState({ cartArray: newCart }, 
            () => saveCart(this.state.cartArray)
        );
    }

    gotoProductDetail (product) {
        const { navigation } = this.props;
        navigation.navigate('ProductDetail', product);
    }
    async onSendOrder() {
        try {
            const token = await getToken();
            const arrayDetail = this.state.cartArray.map(e => ({ 
                id: e.product.id, 
                quantity: e.quantity 
            }));
            const kq = await sendOrder(token, arrayDetail);
            if (kq === 'THEM_THANH_CONG') {
                Alert.alert(
                    'Thông báo',
                    'Order successfully',
                    [
                        { text: 'OK', }
                    ],
                    { cancelable: false }
                );
                const newCart = [];
                this.setState({ cartArray: newCart }, 
                    () => saveCart(this.state.cartArray)
                );
                // console.log('THEM THANH CONG');
            } else {
                Alert.alert(
                    'Thông báo',
                    'Order false',
                    [
                        { text: 'OK', }
                    ],
                    { cancelable: false }
                );
                // console.log('THEM THAT BAI', kq);
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const { cartArray } = this.state;
        const { main, checkoutButton, checkoutTitle, wrapper,
            product, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;
        const arrTotal = cartArray.map(e => e.product.price * e.quantity);
        const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
        return (
            <View style={wrapper}>
                <ScrollView style={main}>
                    {
                        cartArray.map(item => (
                            <View style={product} key={item.product.id}>
                                <Image source={{ uri: `${url}${item.product.images[0]}` }} style={productImage} />
                                <View style={[mainRight]}>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={txtName}>{toTitleCase(item.product.name)}</Text>
                                        <TouchableOpacity onPress={() => this.removeProduct(item.product.id)}>
                                            <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={txtPrice}>{item.product.price}$</Text>
                                    </View>
                                    <View style={productController}>
                                        <View style={numberOfProduct}>
                                            <TouchableOpacity onPress={() => this.incrQuantity(item.product.id)}>
                                                <Text>+</Text>
                                            </TouchableOpacity>
                                            <Text>{item.quantity}</Text>
                                            <TouchableOpacity onPress={() => this.decrQuantity(item.product.id)}>
                                                <Text>-</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={showDetailContainer} onPress={() => this.gotoProductDetail(item.product)}>
                                            <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        ))
                    }

                </ScrollView>
                <TouchableOpacity style={checkoutButton} onPress={this.onSendOrder.bind(this)}>
                    <Text style={checkoutTitle}>TOTAL {total}$ CHECKOUT NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    product: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default CartView;