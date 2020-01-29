import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import Shop from './Shop/Shop';
import Menu from './Menu';
import global from '../global';
import checkLogin from '../../api/checkLogin';
import getToken from '../../api/getToken';

class Main extends Component {
  componentDidMount() {
        getToken()
        .then(token => checkLogin(token))
        .then(res => global.onSignIn(res.user))
        .catch(err => console.log('LOI CHECK LOGIN', err));
    }
  closeControlPanel = () => {
    this.drawer.close();
  }; 
  openControlPanel = () => {
    this.drawer.open();
  };
  render() {
    const { navigation } = this.props;
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Menu navigation={navigation}/>}
        openDrawerOffset={0.4}
        tapToClose={true}
      >
        <Shop open={this.openControlPanel.bind(this)} />
      </Drawer>
    );
  }
}
export default Main;