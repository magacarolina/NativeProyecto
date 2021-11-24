import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from '../components/MyCamera';

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: "",
            photo:'',
            showCamera: true

        }
    }

    handlePost(){
        db.collection('posts').add({
            owner: auth.currentUser.displayName,
            description: this.state.comment,
            createdAt: Date.now(),
            likes: [],
            comments: [],
            photo: this.state.photo
        })
        .then(response => {
            console.log(response);
            alert("Posteo cargado con éxito!");
            this.setState({
                photo:"",
                comment: "",
                showCamera: true
            })
            console.log(this.props);
            this.props.navigation.navigate('Home');
        })
        .catch(error => {
            console.log(error);
            alert("Error 404");
        })
    }
    guardarFoto(url){
        this.setState({
            photo: url,
            showCamera: false,
        })
    }
    
    render(){
        
        return(
            <>
            {this.state.showCamera ? 
            <MyCamera savePhoto = {(url)=>this.guardarFoto(url)}/>
            :
            <>
            <View style={styles.container}>
                <Image
                    source ={{uri: this.state.photo}}
                    style = {styles.imagen}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder="Si queres, podes agregarle una pequeña descripción a tu foto!"
                    multiline={true}
                    numberOfLines = {4}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.handlePost()}>
                    <Text style = {styles.text}> Post </Text>
                </TouchableOpacity>
            </View>
            </>
            }
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: '10px',
        flex: 1,
        alignItems: 'center',
        color:"#fff8e9",
        backgroundColor: "#FFF8E9"
        
    },
    field: {
        width: '80%',
        backgroundColor: "#D9F1F1",
        color: '#CRCRCR',
        padding: 10,
        marginVertical: 10
    },
    button: {
        margin: 10,
        width: '30%',
        backgroundColor: "#ffcdbf",
        alignItems: 'center',
        padding: 10,
        fontSize: 20
    },
    text: {
        color: '',
        fontSize: '20px'
    },
})