import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import profileIcon from "../../media/temp/profile.png";
import global from '../global';
import saveToken from '../../api/saveToken';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
        global.onSignIn = this.onSignIn.bind(this);
    }
    onSignIn(user) {
        this.setState({ user });
    }

    onSignOut() {
        this.setState({ user: null });
        saveToken('');
    }
    
    render(){
        gotoAuthentication = () => {
            const {navigation} = this.props;
            navigation.navigate('Authentication');
        }
        gotoOrderHistory = () => {
            const {navigation} = this.props;
            navigation.navigate('OrderHistory'); 
        }
        gotoChangeInfo = () => {
            const {navigation} = this.props;
            navigation.navigate('ChangeInfo', this.state.user);
        }

        const { user } = this.state;
        
        const {
        container, profile, btnStyle, btnText,
        btnSignInStyle, btnTextSignIn, loginContainer,
        username
        } = styles;
        const logoutJSX = (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={btnStyle}>
                    <Text style={btnText} onPress={gotoAuthentication}>Sing In</Text>
                </TouchableOpacity>
            </View>
        );
        const loginJSX = (
            <View style={{alignItems: 'center' }}>
                <Text style={username}>{ user ? user.name : ''}</Text>
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                    <View>
                        <TouchableOpacity style={btnSignInStyle}>
                            <Text style={btnTextSignIn} onPress={gotoOrderHistory}>OrderHistory</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle}>
                            <Text style={btnTextSignIn} onPress={gotoChangeInfo}>ChangeInfo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle}>
                            <Text style={btnTextSignIn} onPress={this.onSignOut.bind(this)}>LogOut</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
        const mainJSX = this.state.user ? loginJSX : logoutJSX;
        return (
            <View style={container}>
                <Image source={profileIcon} style={profile} />
                {mainJSX}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34B089',
        borderRightWidth: 3,
        borderColor: '#fff',
        alignItems: 'center'
    },
    profile: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 30
    },
    btnStyle: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 70
    },
    btnText: {
        color: '#34B089',
        fontFamily: 'Avenir',
        fontSize: 20
    },
    btnSignInStyle: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: 200,
        marginBottom: 10,
        justifyContent: 'center',
        paddingLeft: 10
    },
    btnTextSignIn: {
        color: '#34B089',
        fontSize: 15
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    username: {
        color: '#fff',
        fontFamily: 'Avenir',
        fontSize: 15
    }
});

export default Menu;