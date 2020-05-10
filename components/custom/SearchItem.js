import React from 'react'
import {StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native'
import search from '../../helper/search'
import {navigate} from '../../navigationsRef'
const SearchItem = ({name,code,setMode})=>{
    const searchCountry = ()=>{
        console.log("rt");
        search.get(`https://api.covid19api.com/live/country/${name}/status/confirmed`)
        .then(res=>{
            setMode(false);
            console.log(res.data[res.data.length-1]);
            navigate('Search',{
                data:res.data[res.data.length-1],
                image:`https://www.countryflags.io/${code.toLowerCase()}/flat/64.png`
            });
        }).catch(err=>{
            throw err;
        })

    }
    return (
        <TouchableOpacity style={styles.container} onPress={searchCountry}>    
            <Text style={styles.country}>{name}</Text>
            <View style={styles.code}>
                <Image style={styles.image} resizeMode='contain' source={{uri: `https://www.countryflags.io/${code.toLowerCase()}/flat/64.png`}}/>
            </View>
        </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    container:{
        padding: 5,
        borderColor: 'grey',
        borderWidth: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    country: {
        flex:1,
        fontSize: 10
    },
    code: {
        flex:1,
        alignItems:'flex-end'
    },
    image:{
        aspectRatio:1,
        width:30,
        height:30    
    }

})

export default SearchItem;