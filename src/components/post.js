import React, { Component } from 'react'
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes, faTimesCircle ,faComments, faUser, faPlusCircle , faTrashAlt} from '@fortawesome/free-solid-svg-icons';



export default class Post extends Component{

    constructor(props){
        super(props);
        this.state = {
            liked: false,
            likes: 0,
            showModal: false,
            comments: []
        }
    }

    componentDidMount(){
        if (this.props.item){
            if (this.props.item.data.likes.length !== 0){
                this.setState({
                    likes: this.props.item.data.likes.length
                })
                if (this.props.item.data.likes.includes(auth.currentUser.email)){ 
                    this.setState({
                        liked: true
                    })
                }
            }
        }
    }

   
    onLike() {
        const posteoActualizar = db.collection("posts").doc(this.props.item.id);
    
        posteoActualizar.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
          })
          .then(() => {
            this.setState({
              liked: true,
              likes: this.state.likes + 1,
            });
          });
      }
    onDislike(){
       
            const posteoActualizar = db.collection("posts").doc(this.props.item.id);

            posteoActualizar.update({
                likes: firebase.firestore.FieldValue.arrayRemove(
                  auth.currentUser.email
                ),
              })
              .then(() => {
                this.setState({
                  liked: false,
                  likes: this.state.likes - 1,
                });
              });
    }
    onComment(){
        const posteoActualizar = db.collection("posts").doc(this.props.item.id)
        
        posteoActualizar.update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                user: auth.currentUser.email,
                comment: this.state.comment,
                createdAt: new Date().toString() 
            })
        })
        .then(()=> {
           
            console.log('Comentario guardado');
            this.setState({
                comment: ''
            })
        })

    }

    




    
    showModal(){
        console.log('Mostrando modal')
        this.setState({
            showModal: true,
        })
    }
    
   
    closeModal(){
        console.log('Cerrando modal')
        this.setState({
            showModal: false,
        })
    }
    
    deletePost() {
        let confirmDelete = confirm("??Eliminar esta publicaci??n?")
        
        if (confirmDelete){
          db.collection("posts").doc(this.props.item.id).delete();
        }
      }
    
    
    render(){

     
        return(
            <View style={styles.container}>
                <Text style={styles.userText}> 
                <FontAwesomeIcon icon= {faUser}/> {this.props.item.data.owner}</Text>
                <Image
          style={styles.image}
          source={{ uri: this.props.item.data.photo }}
             />
             <Text>Likes: {this.state.likes}</Text>
                
            {
                !this.state.liked ?
                <TouchableOpacity onPress={()=>this.onLike()}>
                     <Text style={styles.iconText}>
                            <FontAwesomeIcon icon= {faHeart}/>
                        </Text>
                </TouchableOpacity> :
                <TouchableOpacity onPress={()=>this.onDislike()}>
                     <Text style={styles.iconText}>
                        <FontAwesomeIcon icon= {faTimes}/>
                        </Text>
                </TouchableOpacity>                       
            }
                 <Text>{this.props.item.data.description}</Text>
                <TouchableOpacity onPress={()=>{this.showModal()}}>
              
                    <Text>
                        Ver comentarios
                    </Text>
                </TouchableOpacity>
                
        {
                    this.state.showModal ?

                    <Modal
                            animationType= 'fade'
                            transparent={false}
                            visible = {this.state.showModal}
                            style = {styles.modal}>

                    <View style={styles.modalView}>
                                {/* Bot??n de cierre del modal */}
                                <TouchableOpacity style={styles.closeModal} onPress={()=>{this.closeModal()}}>
                                             <Text style={styles.modalText} >X</Text>
                                </TouchableOpacity>
                               
            
        <Text><FontAwesomeIcon icon={faComments}></FontAwesomeIcon> <Text style={styles.usercomment}> Comentarios: {this.props.item.data.comments.comment}</Text>
                  
                   { this.props.item.data.comments.length !==0 ? (
                       <FlatList 
                                data={this.props.item.data.comments}
                                keyExtractor={post => post.createdAt.toString()}
                                renderItem={({item})=> <Text> {item.user}: {item.comment}
                                </Text>}
                    />)
                    :
                    ( 
                    <Text style= {styles.comentarios}> ??Sin comentarios, opine usted primero!</Text>)
                    
                   } 
                       
                        

             <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder="Si queres, podes agregarle un comentario a la foto publicada por el usuario!"
                    multiline={true}
                    numberOfLines = {5}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}
             />
               
        <TouchableOpacity style = {styles.button} onPress={() => this.onComment()}>
                     <Text style= {styles.uploadComment}> <FontAwesomeIcon icon= {faPlusCircle}/> Subir comentario</Text> 
        </TouchableOpacity>   
                                
                    </Text>
                    </View>

                     </Modal>
                        :
                        null
        }
            <View>
            {this.props.item.data.owner == auth.currentUser.displayName
         ? (<TouchableOpacity onPress={() => this.deletePost()}>
                  <Text style= {styles.delete}> <FontAwesomeIcon icon= {faTrashAlt}/> </Text>
                </TouchableOpacity>)
                : null }
                
                </View>
            </View>
           
        )
       
    }
}

const styles = StyleSheet.create({
    image: {
        height: 220,
        width: 370,
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    },
    uploadComment:{
        fontWeight: 'bold',
       
    },
    comentarios:{
        fontSize: '18px'
    },
    usercomment:{
        fontSize: "18px",
        fontFamily: 'Arial'
     
    },
    delete: {
        color:'#ff0505',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'flex-end',
    },
    
    closeModal:{
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop:2,
        marginBotom: 10,
        borderRadius: 4,
    },
    field: {
        width: '80%',
        backgroundColor: "#09009B",
        color: '#FFA400',
        padding: 10,
        marginVertical: 10
    },
    userText: {
        fontWeight: 400,
        fontSize: '18px',
        margin: '5px'

    },
    iconComment:{
        color:'#0A0A0A',
        fontWeight: 'bold',
        fontSize: 15


    },

    modalText:{
        fontWeight: 'bold',
        color:'#fff',
    },
    iconText:{
        color:'#c91e2f',
        fontWeight: 'bold',
        fontSize: 30
    },
    modalView:{
        backgroundColor: 'grey',
        borderRadius: 15,
        width: 370
    },
    modal: {
        border: 'none',
    }
})