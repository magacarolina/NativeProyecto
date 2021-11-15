import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Post from '../components/Post';
import { db } from '../firebase/config';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
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
        console.log(this.state.posts);
        return(
            <View style = {styles.container}>
                <Text> Home </Text>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.text}> Logout </Text>
                </TouchableOpacity>
                <FlatList
                data = {this.state.posts}
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
        
    },
    field: {
        width: '450px',
        backgroundColor: "#B2E7E8",
        color: '#FFA400',
        padding: 10,
        marginVertical: 10,
        fontSize: '20px'
        
    },
    button: {
        width: '10%',
        backgroundColor: "#8FB9AA",
        alignItems: 'center',
        padding: 10,
        
    },
    text: {
        color: '',
        fontSize: '20px'
    }
})