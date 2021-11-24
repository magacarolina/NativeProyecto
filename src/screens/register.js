import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth } from '../firebase/config';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            error: ""
        }
    }

    handleRegister(){
        if (this.state.email !== "" && this.state.password !== "" && this.state.username !== ""){
            this.props.handleRegister(this.state.email, this.state.password, this.state.username)
        }
        else {
            this.setState({
                 error: "Completar los campos faltantes!"
            })
           
        }
    }

    render() {
        return (
            <View style={styles.container}>
                  <Text style={styles.titulo}><FontAwesomeIcon icon= {faPhotoVideo}/> USERNET</Text>
                <Text style={styles.registrarse}>Registrate</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="Username"
                    
                    onChangeText={text => this.setState({ username: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder="Contraseña/Password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity style = {this.state.password !== '' ? styles.button : styles.notallowbutton}  onPress={() => this.handleRegister()}>
                    <Text style = {styles.text}> Sign Up </Text>
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
    notallowbutton:{
        backgroundColor: "#D5D5D5",
        alignItems: 'center',
        padding: 10,
        width: '30%'
    },
    formContainer:{
        backgroundColor: '#ccc',
        marginHorizontal: 10,
        padding:10,
      },
      titulo: {
        
        fontFamily: "Calibri",
        fontSize: 57,
        padding: '5px',
        backgroundColor: "#ACACAC",
        
        
    },
      registrarse: {
        fontSize: 30,
        padding: '10px',
        backgroundColor: "#8FB9AA", 
        margin: 30 ,
        alignSelf: 'flex-start'
      },
      field: {

        width: 360,
        backgroundColor: "#D9F1F1",
        color: '#000000',
        padding: 10,
        marginVertical: 10,
        fontSize: '20px'
        
    },
    image:{
        height: 250,
    },
    button: {
        width: '30%',
        backgroundColor: "#8FB9AA",
        alignItems: 'center',
        padding: 10,
    },
    text: {
        color: '#000000',
        fontSize: 20
    },
    touchable:{
        backgroundColor: '#ccc',
        borderRadius:4,
        marginVertical:10,
      },
    text: {
        color: '',
        fontSize: 20
    }
})