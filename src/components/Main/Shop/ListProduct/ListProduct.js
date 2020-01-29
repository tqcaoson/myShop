import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, RefreshControl} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import backList from '../../../../media/appIcon/backList.png';
import getListProduct from '../../../../api/getListProduct';

const url = 'http://localhost/app/images/product/';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class ListProduct extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            refreshing: false,
            page: 1
        };
    }

    gotoDetail(product) {
        const { navigation } = this.props;
        navigation.navigate('ProductDetail', product);
    }

    componentDidMount() {
        const { navigation } = this.props;
        const idType = navigation.getParam('id'); 
        getListProduct(idType, 1)
        .then(arrProduct => {
            this.setState({ arr: this.state.arr.concat( arrProduct ) });
        })
        .catch(err => console.log(err));
    }
    
    render(){

        const { navigation } = this.props;
        const category = { 
            id: navigation.getParam('id'), 
            name: navigation.getParam('name'), 
        };

        goBack = () => {
            navigation.pop();
        }
        gotoDetail = () => {
            navigation.navigate('ProductDetail');
        }
        const { arr } = this.state;
        const {
            container, header, wrapper, backStyle, titleStyle,
            productContainer, productImage, productInfo, lastRowInfo,
            txtName, txtPrice, txtMaterial, txtColor, txtShowDetail
        } = styles;
        return (
            <View style={container}>
                <ScrollView style={wrapper}
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true });
                                const newPage = this.state.page + 1;
                                const idType = category.id;
                                getListProduct(idType, newPage)
                                .then(arrProduct => {
                                    this.setState({ 
                                        arr: this.state.arr.concat( arrProduct ),
                                        refreshing: false 
                                    });
                                })
                                .catch(err => console.log(err));
                            }}
                        />
                    }
                >
                    <View style={header}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={backList} style={backStyle}/>
                        </TouchableOpacity>
                        <Text style={titleStyle}>{category.name}</Text>
                        <View style={{width: 30}}/>
                    </View>
                    {
                        arr.map(e => (
                            <View style={productContainer} key={e.id}>
                                <Image source={{ uri: `${url}${e.images[0]}` }} style={productImage}></Image>
                                <View style={productInfo}>
                                    <Text style={txtName}>{e.name}</Text>
                                    <Text style={txtPrice}>{e.price}</Text>
                                    <Text style={txtMaterial}>{e.material}</Text>
                                    <View style={lastRowInfo}> 
                                        <Text style={txtColor}>Color {e.color}</Text>
                                        <View style={{backgroundColor: e.color.toLowerCase(), height: 16, width: 16, borderRadius: 8}} />
                                        <TouchableOpacity onPress={() => this.gotoDetail(e)}>
                                            <Text style={txtShowDetail}>SHOW DETAIL</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                        
                    }

                </ScrollView>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DBDBD8'
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    wrapper: {
        backgroundColor: '#fff',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin: 10,
        paddingHorizontal: 10
    },
    backStyle: {
        width: 30,
        height: 30
    },
    productContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1
    },
    titleStyle: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 20
    },
    productImage: {
        width: 90,
        height: (90 * 452) / 361
    },
    productInfo: {
        justifyContent: 'space-between',
        marginLeft: 15,
        flex: 1
    },
    lastRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 20,
        fontWeight: '400'
    },
    txtPrice: {
        fontFamily: 'Avenir',
        color: '#B10D65',
    },
    txtMaterial: {
        fontFamily: 'Avenir'
    },
    txtColor: {
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 11
    }
});

export default ListProduct;