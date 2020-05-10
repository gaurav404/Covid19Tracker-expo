import React,{useState} from 'react'
import {View,Text,TextInput,FlatList,StyleSheet,Image} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import {codes} from '../../helper/countrycode' 
import SearchItem from '../custom/SearchItem'
import Spacer from '../custom/Spacer'
import Header from '../custom/Header'
const Search = ({navigation})=>{
    const [search,setSearch] = useState('');
    const [mode,setMode] = useState(false);
    const [list,setList] = useState([]);

    const setSearchMode = (search)=>{
        setSearch(search);
        if(search){
            const y = codes.filter(function(data){
                if(data.Name.slice(0,search.length)==search){
                    if(this.count>4){
                        return false;
                    }
                    this.count++;
                    return true;    
                }
            },{count:0})
            setList(y);
            setMode(true);
        }else{
            setMode(false);
        }
    }
    const data = navigation.getParam('data',null);
    const image = navigation.getParam('image',null);

   // console.log(t)
    return (
        <View>
        <Header press={navigation.openDrawer} title="Search"/>
        <View style={styles.container}>
            <View style={styles.search}>
                <FontAwesome name="search" size={30} style={styles.icon}/>
                <View style={styles.searchContent}>
                    <TextInput placeholder="Enter country" value={search} onChangeText={setSearchMode} style={styles.input}/>
                    {mode?
                    <View style={styles.searchList}>
                        <FlatList data={list} keyExtractor={(val)=>val.Code} renderItem={({item})=><SearchItem setMode={setMode} name={item.Name} code={item.Code}/>} />
                    </View>:null
                    }
                </View>
            </View>
            
            <View style={styles.information}>
                {mode?null:data? <>
                    <Image source={{uri:image}}  style={styles.flag}/>
                    <Spacer/>
                    <View style={styles.searchDetail}>
                        <Text style={{...styles.detail,backgroundColor:"orange"}}>Active:{data.Active}</Text>
                        <Text style={{...styles.detail,backgroundColor:"white"}}>Confirmed:{data.Confirmed}</Text>
                        <Text style={{...styles.detail,backgroundColor:"green"}}>Recovered:{data.Recovered}</Text>
                    </View>
                    </>
                :<Text> "Please Search for a country"</Text>}
            </View>
            <View style={{flex:1,justifyContent:"flex-end"}}>
                <View style={[styles.door,{height:mode?'30%':data?'80%':'60%'}]}>
                    <Spacer/> 
                    <Spacer/> 
                    <Image source={require('../../assets/giphy.gif')} style={styles.image} />
                    <Spacer/>
                    <View style={{width:20,height:20,backgroundColor:"black",alignSelf:"flex-end",marginRight:40,borderRadius:10}}></View>
                </View>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        height:"100%"
    },
    image:{
        aspectRatio:1,
        width:150, 
        height:150
    },
    cover:{
        backgroundColor:"blue",
        flex:1
    },
    icon:{
        padding:5
    },
    search:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        width:"95%",
        height:50
    },
    door:{
        backgroundColor:'red',
        marginHorizontal:30,
        alignItems:"center",
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    searchList:{
        position:'absolute',
        backgroundColor:'white',
        width:'100%',
        opacity:1,
        top:30
    },
    searchContent:{
        flex:1
    },
    information:{
        padding:10,
        alignItems:"center"
    },
    flag:{
        aspectRatio:1,
        width:100,
        height:100    
    },
    searchDetail:{
        flexDirection:'row',
        justifyContent: "center",
        alignItems:"center",
        flex:1
    },
    detail:{
        flex:1,
        textAlign:"center",
        backgroundColor:'green',
        padding:10,
        fontSize:10,
        padding:10,
        fontWeight:'bold'
    },
    input:{
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'grey',
        textAlign: "center"
    },
    text:{
        fontSize:50
    }
})

Search.navigationOptions = {
    title:'Search',
    drawerIcon: <FontAwesome name="search" size={20}/>
}

export default Search;