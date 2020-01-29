import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import icBack from '../../media/appIcon/back_white.png'
import icLogo from '../../media/appIcon/ic_logo.png'
import SignIn from './SignIn';
import SignUp from './SignUp';
 
export default class Authentication extends Component {
    constructor(props) {
        super();
        this.state = { isSignIn: true };
    }

    gotoSignIn() {
        this.setState({ isSignIn: true });
    }

    signIn() {
        this.setState({ isSignIn: true });
    }
  
    signUp() {
        this.setState({ isSignIn: false });
    }
    goBack = () => {
        this.props.navigation.pop();
    }
    render() {
        const {
            row1, inputStyle, iconStyle, titleStyle,
            container, controlStyle,
            signInStyle, signUpStyle, buttonText,
            activeStyle, inactiveStyle, bigButton,
        } = styles;
        const { isSignIn } = this.state;
        const mainJSX = this.state.isSignIn ? <SignIn goBack={this.goBack.bind(this)}/> : <SignUp gotoSignIn={this.gotoSignIn.bind(this)}/>;

        return (
            <View style={container}>
                <View style={row1}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image source={icBack} style={iconStyle} />
                    </TouchableOpacity>
                    <Text style={titleStyle}>Wearing a Dress</Text>
                    <Image source={icLogo} style={iconStyle} />
                </View>
                {mainJSX}
                <View style={controlStyle}>
                    <TouchableOpacity style={signInStyle} onPress={this.signIn.bind(this)}>
                        <Text style={isSignIn ? activeStyle : inactiveStyle}>SIGN IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={signUpStyle} onPress={this.signUp.bind(this)}>
                        <Text style={!isSignIn ? activeStyle : inactiveStyle}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3EBA77',
        padding: 20,
        justifyContent: 'space-between'
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 30 },
    iconStyle: { width: 30, height: 30 },
    controlStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    inactiveStyle: {
        color: '#D7D7D7'
    },
    activeStyle: {
        color: '#3EBA77'
    },
    signInStyle: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        marginRight: 1,
        width: 150,
    },
    signUpStyle: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        alignItems: 'center',
        marginLeft: 1,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        width: 150,
    },
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontWeight: '400'
    }
});