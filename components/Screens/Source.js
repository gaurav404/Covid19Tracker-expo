import React from 'react'
import {View,Text,StyleSheet,Linking,Image} from 'react-native'
import Header from '../custom/Header'
const Source = ({navigation})=>{
    const smash = (link)=>{
        Linking.openURL(link)
    }
    return(
        <View>
            <Header press={navigation.openDrawer} title="My Sources"/>
            <View style={styles.container}>
                <View style={styles.item}><Text>My Sources</Text></View>
                <View style={styles.item}>
                    <Text>Covid19india.org - unofficial</Text>
                    <Text>Ministry of health and Family Welfare - official</Text>
                </View>
                <View style={styles.item}>
                    <Text>John Hopkins University - official</Text>
                    <Text>Worldometers - official </Text>
                </View>
                <View style={styles.item}><Text style={{color:"blue"}} onPress={()=>{smash("https://www.flaticon.com/authors/pixelmeetup")}}>Pixelmeetup</Text></View>
                <View style={styles.item}><Text style={{color:"blue"}} onPress={()=>{smash("https://www.flaticon.com/authors/pongsakornred")}}>Pongsakornred</Text></View>
                <View><Image source={require('../../assets/protection.png')} style={styles.image}/></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center"
    },
    image:{
        width:200,
        height:200
    },
    item:{
        borderBottomWidth:2,
        opacity:0.5,
        alignItems:"center",
        padding:10,
        margin:5,
        borderRadius:40,
        width:"100%"
    },
    text:{
        textAlign:"center",
        fontSize:30
    }
})

export default Source;