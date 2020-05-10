import React from 'react'
import {Image,View,StyleSheet} from 'react-native'

const Spinner = ()=>{
    return(
        <View style={styles.container}>
            <Image source={require('../../assets/spinner.gif')} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center"
    },
    image:{
        width:200,
        height:200
    }
})

export default Spinner;