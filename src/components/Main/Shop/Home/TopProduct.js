import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView, SectionList, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const url = 'http://localhost/app/images/product/'; 

class TopProduct extends Component {
    gotoProductDetail (product) {
        const { navigation } = this.props;
        navigation.navigate('ProductDetail', product);
    }
    render() {
        const { topProduct } = this.props;
        const { productPrice, productName, productImage, container, title, titleContainer, body, productContainer, } = styles;
        return (
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={title}>TOP PRODUCT</Text>
                </View>
                <View style={body}>
                    {topProduct.map(e => (
                        <TouchableOpacity style={productContainer} onPress={() => this.gotoProductDetail(e)} key={e.id}>
                            <Image source={{ uri: `${url}${e.images[0]}` }} style={productImage} />
                            <Text style={productName}>{e.name.toUpperCase()}</Text>
                            <Text style={productPrice}>{e.price}$</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    }
}

const productWidth = (width - 60) / 2;
const productImageHeight = (productWidth / 361) * 452;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        color: '#D3D3CF',
        fontSize: 20
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingBottom: 10
    },
    productContainer: {
        width: productWidth,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: productWidth,
        height: productImageHeight
    },
    productName: {
        marginVertical: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#D3D3CF',
        fontWeight: '500'
    },
    productPrice: {
        marginBottom: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#662F90'
    }
});

export default TopProduct;