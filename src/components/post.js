import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function Post ({item}){

    console.log(item);

    return(
        <View stlye={styles.container}>
            <Text>{item.data.description}</Text>
            <Text>{item.data.createdAt}</Text>
            <Text>{item.data.owner}</Text>
            <Image>{}</Image>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200,
    
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    }
})