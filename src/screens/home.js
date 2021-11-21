import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput} from 'react-native';
import Post from '../components/Post';
import { auth, db } from '../firebase/config';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            searchInput: ""
        }
    }
    componentDidMount(){
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let postsAux = [] //Variable auxiliar
                docs.forEach( doc => {
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: postsAux
                })
            }
        )
    }
    render(){
        let filteredPosts = this.state.searchInput.length > 0
        ? this.state.posts.filter(element => element.data.owner.includes(this.state.searchInput)) 
        : this.state.posts
        console.log(this.state.posts);
        return(
            <View style = {styles.container}>
                <Text>Buscador de usuarios:</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="Buscar usuario..."
                    onChangeText={text => this.setState({searchInput: text})}
                />
                <Text style = {styles.text}> ¡Hola {auth.currentUser.displayName}! </Text>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.buttonText}> Logout </Text>
                </TouchableOpacity>
                <FlatList
                  data = {filteredPosts}
                keyExtractor = {post => post.id.toString()}
                renderItem = { ({item}) => 
                    <Post item = {item}></Post> }
                />
            </View>
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
    button: {
        margin: 10,
        width: '30%',
        backgroundColor: "#ffcdbf",
        alignItems: 'center',
        padding: 5,
    },
    buttonText: {
        color: '',
        fontSize: '15px'
    },
    text: {
        color: '',
        fontSize: '20px'
    },

    field: {
        width: '80%',
        backgroundColor: "#D9F1F1",
        color: '#fcfcfc',
        padding: 10,
        marginVertical: 10
    }
})