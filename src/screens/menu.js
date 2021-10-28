import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './login';
import Register from './register';
import Home from './home';
import { auth } from '../firebase/config';
import CreatePost from './CreatePost';

export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            error: null,
        }
    }

    componentDidMount(){
        //Recordar la sesión iniciada
        auth.onAuthStateChanged( user => {
            if (user) {
                this.setState({
                    loggedIn: true
                })
            }
        })
    }
    
    
    handleLogin(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then( response => {
            console.log(response);
            alert("Usuario loggeado!");
            this.setState({
                loggedIn: true
            })
        })
        .catch( response => {
            console.log(response);
            alert("Error en el loggeo");
            this.setState({
                error: "Error en loggeo"
            })
        })
    }
    
    handleRegister(email, password, username) {
        //alert(`REGISTRO: usuario: ${this.state.email}, password: ${this.state.password}`)
        auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
            console.log(response);
            alert("Usuario registrado!");
            response.user.updateProfile({
                displayName: username
            })
            this.setState({
                loggedIn: true
            })
        })
        .catch( error => {
            console.log(error);
            alert("Error en el registro");
            this.setState({
                error: "Fallo en el registro"
            })
        })
    }

    handleLogout(){
        auth.signOut()
        .then(()=> {
            this.setState({
                loggedIn: false
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        const Drawer = createDrawerNavigator();
    
        return(
            <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Login">
                        {this.state.loggedIn === true ? 
                        <>
                            <Drawer.Screen name = "Home">
                                {props => <Home {...props} handleLogout={()=>this.handleLogout()}/>}
                            </Drawer.Screen>
                            <Drawer.Screen name = "CreatePost">
                                {props => <CreatePost {...props}/>}
                            </Drawer.Screen>
                        </>
                        :
                        <>
                            <Drawer.Screen name="Login">
                                {props => <Login {...props} handleLogin={(email, password)=>this.handleLogin(email, password)}/>}
                            </Drawer.Screen>
                            <Drawer.Screen name = "Registro">
                                {props => <Register {...props} handleRegister={(email, password, username)=>this.handleRegister(email, password, username)}/>}
                            </Drawer.Screen>
                        </>
                    }
                    </Drawer.Navigator>
                </NavigationContainer>
            )
        }
}