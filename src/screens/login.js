import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { color } from 'react-native-reanimated';
import { auth } from '../firebase/config';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }


    render() {
        console.log(this.state.loggedIn);
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}><FontAwesomeIcon icon= {faGraduationCap}/> STUDYGRAM</Text>
                <Text style={styles.ingresar}>Ingresar</Text>
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
        alignItems: 'center',
        backgroundColor: "#FFF8E9"
    },
    field: {

        width: 360,
        backgroundColor: "#D9F1F1",
        color: '#000000',
        padding: 10,
        marginVertical: 10,
        fontSize: '20px'
        
    },
    ingresar: {
        
        fontSize: 30,
        padding: '10px',
        backgroundColor: "#8FB9AA", 
        margin: 30 ,
        alignSelf: 'flex-start'
    },
    titulo: {
        
        fontFamily: "Calibri",
        fontSize:40,
        padding: '5px',
        backgroundColor: "#ACACAC",
        
        
    },
    button: {
        width: '30%',
        backgroundColor: "#8FB9AA",
        alignItems: 'center',
        padding: 10,
    },
    text: {
        
        fontSize: 20
    }
})