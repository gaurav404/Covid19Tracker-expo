import React from 'react'
import {View,StyleSheet,TextInput,Text} from 'react-native'

const State = ({item})=>{
    return (
        <View style={styles.container}>
            <View style={styles.name}>
                <Text style={styles.text}>{item.state}</Text>
            </View>
            <View style={styles.details}>
                <View style={styles.row}>
                    <Text style={styles.text}>Confirmed: {item.confirmed}</Text>
                    <Text style={styles.text}>Active: {item.active}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Deaths: {item.deaths}</Text>
                    <Text style={styles.text}>Recovered: {item.recovered}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderRightWidth:5,
        borderLeftWidth:5,
        borderRightColor:'green',
        borderLeftColor:"red",
        borderRadius:5,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        margin:10
    },
    name:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    details:{
        flex:3,
        justifyContent:"center",
        alignItems:"center"
    },
    row:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center'
    },
    text:{
        width:"100%",
        flex:1,
        textAlign:"center"
    }
})

export default State;