import React, { Component } from 'react'
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes, faTimesCircle ,faComments, faUser, faPlusCircle } from '@fortawesome/free-solid-svg-icons';




export default class Post extends Component{

    constructor(props){
        super(props);
        this.state = {
            liked: false,
            myLike: 0,
            showModal: false,
            commented: false,
            comments: []
        }
    }

    componentDidMount(){
        if (this.props.dataItem){
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

   
    onLike(){
        //Agregar mi usuario a un array de usuario que likearon.
            //Updatear el registro (documento)
        db.collection('posts').doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes:this.props.item.data.likes.length,
                //likes:this.state.likes + 1, //Opción más rápida de respuesta
                myLike: true,
            })
        })
    }
    onDislike(){
        //Quitar mi usuario a un array de usuario que likearon.
            //Updatear el registro (documento)
        db.collection('posts').doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes:this.props.item.data.likes.length,
                //likes:this.state.likes + 1, //Opción más rápida de respuesta
                myLike: false,
            })
        })
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
            //Cambiar un estado para limpiar el form 
            console.log('Comentario guardado');
            this.setState({
                comment: ''
            })
        })

    }

    




    //Muestra el modal
    showModal(){
        console.log('Mostrando modal')
        this.setState({
            showModal: true,
        })
    }
    
    //Cierra el modal
    closeModal(){
        console.log('Cerrando modal')
        this.setState({
            showModal: false,
        })
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
                this.state.myLike == false ?
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
                    style = {styles.modal}
                >
                            <View style={styles.modalView}>
                                {/* Botón de cierre del modal */}
                                <TouchableOpacity style={styles.closeModal} onPress={()=>{this.closeModal()}}>
                                        <Text style={styles.modalText} >X</Text>
                                </TouchableOpacity>
                               
            
                                <Text>
                      <FontAwesomeIcon icon={faComments}>
                          </FontAwesomeIcon> <Text style={styles.usercomment}> Comentarios: {this.props.item.data.comments.comment}</Text>
                                <FlatList 
                                data={this.props.item.data.comments}
                                keyExtractor={post => post.createdAt.toString()}
                                renderItem={({item})=> <Text> {item.user}: {item.comment}</Text>}/>
                       
                        

                        
                        
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
    usercomment:{
        fontSize: "18px",
     
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