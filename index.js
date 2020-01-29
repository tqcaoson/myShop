/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/components/App';
import {name as appName} from './app.json';

export default class myShop extends Component {
    render() {
      return <App />;
    }
}

AppRegistry.registerComponent(appName, () => myShop);
