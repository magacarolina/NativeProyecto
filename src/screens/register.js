import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth } from '../firebase/config';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: ""
        }
    }

    handleRegister(){
        if (this.state.email !== "" && this.state.password !== "" && this.state.username !== ""){
            this.props.handleRegister(this.state.email, this.state.password, this.state.username)
        }
        else {
            console.log("Completar los campos faltantes!")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Registro</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="username"
                    
                    onChangeText={text => this.setState({ username: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.handleRegister()}>
                    <Text style = {styles.text}> Sign Up </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer:{
        backgroundColor: '#ccc',
        marginHorizontal: 10,
        padding:10,
      },
    field:{
        borderColor: '#444',
        borderWidth:1,
        borderStyle: 'solid',
        height: 20,
        paddingHorizontal: 20,
        paddingVertical:10
      },
    image:{
        height: 250,
    },
    button: {
        width: '30%',
        backgroundColor: "#0F00FF",
    },
    text: {
        color: '#FFA400',
        fontSize: 20
    },
    touchable:{
        backgroundColor: '#ccc',
        borderRadius:4,
        marginVertical:10,
      }
})