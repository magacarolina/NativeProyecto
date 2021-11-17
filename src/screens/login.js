import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { color } from 'react-native-reanimated';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }


    render() {
        console.log(this.state.loggedIn);
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Ingresar</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='number-pad'
                    placeholder="Contraseña/Password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogin(this.state.email, this.state.password)}>
                    <Text style = {styles.text}> Login </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        alignItems: 'center'
    },
    field: {

        width: 360,
        backgroundColor: "#B2E7E8",
        color: '#FFA400',
        padding: 10,
        marginVertical: 10,
        fontSize: '20px'
        
    },
    button: {
        width: '30%',
        backgroundColor: "#8FB9AA",
        alignItems: 'center',
        padding: 10,
    },
    text: {
        color: '',
        fontSize: 20
    }
})