import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {auth, db} from '../firebase/config';
import Post from '../components/Post'



export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount(){
        db.collection("posts")
        .where('user', '==', auth.currentUser.displayName)
        .orderBy("createdAt", "desc")
        .onSnapshot((docs) => {
            let postsAux = []; 
            docs.forEach((doc) => {
                postsAux.push({
                    id: doc.id,
                    data: doc.data(),
                });
        });
            this.setState({
            posts: postsAux,
        });
      });
    }
   
    render(){
        return(
            <View style={styles.container}>
              <Text>Mis datos personales:</Text>
 
            <Text>Usuario: {auth.currentUser.displayName}</Text>
            <Text>Email: {auth.currentUser.email}</Text>
            <Text>
              Ultima vez que el usuario ingresó: {auth.currentUser.metadata.lastSignInTime}
            </Text>
            <Text>Publicaciones: {this.state.posts.length}</Text>
         
         
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.handleLogout()}
            >
              <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
             <FlatList
                data={this.state.posts}
                keyExtractor={(post) => post.id.toString()}
                renderItem={({ item }) => <Post dataItem={item}></Post>}
                />
          </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: "center",
      backgroundColor: "#FFF8E9"
    },
    postList: {
        padding: "10%",
        width: "100%"
    },
    button: {
      margin: 10,
      width: '30%',
      backgroundColor: "#ffcdbf",
      alignItems: 'center',
      padding: 5,
    },
    text: {
      color: "#212529",
      fontSize: '20px',
      margin: 10,
    },
  }); 
