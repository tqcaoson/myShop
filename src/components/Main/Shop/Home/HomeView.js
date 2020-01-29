import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import initData from '../../../../api/initData';
import Collection from "./Collection";
import Category from "./Category";
import TopProduct from "./TopProduct";

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [],
            topProduct: [],
        };
    }

    componentDidMount() {
        initData()
        .then(resJSON => {
            const { type, product } = resJSON;
            this.setState({ types: type, topProduct: product });
        });
    }
    render() {
        const { types, topProduct } = this.state;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#DBDBDB' }}>
                <Collection navigation={this.props.navigation}/>
                <Category navigation={this.props.navigation} types={types} />
                <TopProduct navigation={this.props.navigation} topProduct={topProduct} />
            </ScrollView>
        );
    }

}
export default HomeView;