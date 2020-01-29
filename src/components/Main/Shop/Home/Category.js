import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, ImageBackgroundBase } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');
const url = 'http://localhost/app/images/type/';

class Category extends Component {
    gotoListProduct (category) {
        const { navigation } = this.props;
        navigation.navigate('ListProduct', category);
    } 
    render() { 
        const { wrapper, textStyle, imageStyle, cateTitle } = styles;
        const { types } = this.props;
        const swiper = (
            <Swiper showsPagination width={imageWidth} height={imageHeight}>
                {
                    types.map(e => (
                    <TouchableOpacity onPress={() => this.gotoListProduct(e)} key={e.id}>
                        <ImageBackground source={{ uri: `${url}${e.image}` }} style={imageStyle}>
                            <Text style={cateTitle}>{e.name}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    ))
                }
            </Swiper>
        );
        return (
            <View style={wrapper}>
                <View style={{ justifyContent: 'center', height: 50 }}>
                    <Text style={textStyle}>LIST OF CATEGORY</Text>
                </View>
                <View style={{ flex: 4, justifyContent: 'flex-end' }}>
                    { types.length ? swiper : null }
                </View>
            </View>
        );
    }
}

const imageWidth = width - 40;
const imageHeight = imageWidth / 2;
const styles = StyleSheet.create({
    wrapper: {
        width: width - 20,
        backgroundColor: '#FFF',
        margin: 10,
        justifyContent: 'space-between',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0
    },
    textStyle: {
        fontSize: 20,
        color: '#AFAEAF'
    },
    imageStyle: {
        height: imageHeight,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cateTitle: {
        fontSize: 20,
        fontFamily: 'Avenir',
        color: '#9A9A9A'
    }
});

export default Category;