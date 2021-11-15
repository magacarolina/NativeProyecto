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
        flex: 1,
        alignItems: 'center'
    },
    field: {
        width: '80%',
        backgroundColor: "#09009B",
        color: '#FFA400',
        padding: 10,
        marginVertical: 10
    },
    button: {
        width: '30%',
        backgroundColor: "#0F00FF",
    },
    text: {
        color: '#FFA400',
        fontSize: 20
    }
})