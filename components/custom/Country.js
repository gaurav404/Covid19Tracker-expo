import React from 'react' 
import {View,Text,Image,StyleSheet} from 'react-native'
//import { Card, Button, Icon } from 'react-native-elements'

const Country = ({data,index})=>{
    //console.log(data.Country);
    return (
        <View style={styles.container}>
            <View style={styles.country}>
                <View style={[styles.item]}>
                    <Image style={[styles.image]} source={{uri:`https://www.countryflags.io/${data.CountryCode.toLowerCase()}/flat/64.png`}}></Image>
                    <Text style={[{textAlign:"center"}]}>{data.Country}</Text>
                </View >
                <View style={[styles.item]}>
                    <Text style={[styles.text,{borderBottomWidth:0}]}>{index+1}</Text>
                    <Text style={[styles.text]}>Total</Text>
                    {/* <Text style={[styles.text]}>New</Text> */}
                </View>
                <View style={[styles.item]}>
                    <Text style={[styles.text]}>Recovered</Text>
                    <Text style={[styles.text]}>{data.TotalRecovered}</Text>
                    {/* <Text style={[styles.text]}>{data.NewRecovered}</Text> */}
                </View>
                <View style={[styles.item]}>
                    <Text style={[styles.text]}>Deaths</Text>
                    <Text style={[styles.text]}>{data.TotalDeaths}</Text>
                    {/* <Text style={[styles.text]}>{data.NewDeaths}</Text> */}
                </View>
                <View style={[styles.item]}>
                    <Text style={[styles.text]}>Confirmed</Text>
                    <Text style={[styles.text]}>{data.TotalConfirmed}</Text>
                    {/* <Text style={[styles.text]}>{data.NewConfirmed}</Text> */}
                </View>
            </View>   
        </View>
    )
}

const styles = StyleSheet.create({
    text:{textAlign:"center",margin:5,borderBottomWidth:1,borderRadius:4,width:"100%"},
    container:{margin:10,justifyContent:"center",alignItems:"center"},
    image:{
        aspectRatio:1,
        width:30,
        height:30    
    },
    item:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    country:{
        flexDirection: 'row',
        justifyContent: "center"
    },
    
}) 

export default Country 