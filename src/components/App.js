import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Navigator from './routes/route';

export default class App extends Component {
    render() {
      return (
        <Navigator />
      );
    }
  }