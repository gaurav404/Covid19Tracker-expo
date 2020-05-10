import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Image,SafeAreaView,FlatList,TextInput,RefreshControl} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler';
import IndiaSearch from '../../helper/indiaApi'
import State from '../custom/State'
import Header from '../custom/Header'
import Spinner from '../custom/Spinner'

const India = ({navigation})=>{
    const [refresh,setRefresh] = useState(false);
    const [visible,setVisible] = useState(false);
    const [active,setActive] = useState(true);
    const [totalData,setTotalData] = useState({}); 
    const [search,setSearch] = useState('');
    const [states,setStates] = useState([]); 
    const [viewStates,setViewStates] = useState([]);
    const fetch = ()=>{
        IndiaSearch.get('/statewise')
        .then(res=>res.data).then(res=>{
            console.log(res.data.total);
            setTotalData(res.data.total);
            const statesData = res.data.statewise.sort((state1,state2)=>state2.active-state1.active);
            setStates(statesData);
            setViewStates(statesData);
            setVisible(true);
        }).catch(err=>{console.log("problem")})
        .finally(()=>{
            setVisible(true);
            setRefresh(false);
        })
    }
    onRefresh = React.useCallback(()=>{
        setRefresh(true);
        setVisible(false);
        fetch();
    },[refresh])
    useEffect(()=>{
        fetch();
    },[])
    const searchState = (search)=>{
        setSearch(search);
        const present = states.filter(value=>{
            if(value.state.toLowerCase().indexOf(search.toLowerCase())>=0){
                return true
            }
            return false;
        })
        setViewStates(present);
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <NavigationEvents onWillFocus={()=>{setVisible(false);fetch()}}/>
            <Header press={navigation.openDrawer} title="India Content"/>
            <View style={styles.container}>
                <Image style={[styles.image]} source={{uri:`https://www.countryflags.io/in/flat/64.png`}}/>
                <View style={styles.global}>
                    <View style={[styles.globaldata,{borderWidth:0}]}>
                        <Text style={{textAlign:"center"}}>Confirmed</Text>
                    </View>
                    <View style={[styles.globaldata,{borderWidth:0}]}>
                        <Text style={{textAlign:"center"}}>Recovered</Text>
                    </View>
                    <View style={[styles.globaldata,{borderWidth:0}]}>
                        <Text style={{textAlign:"center"}}>Deaths</Text>
                    </View>
                    <View style={[styles.globaldata,{borderWidth:0}]}>
                        <Text style={{textAlign:"center"}}>Active</Text>
                    </View>
                </View>
                <View style={styles.global}>
                    <View style={[styles.globaldata]}>
                        <Text style={{textAlign:"center"}}>{totalData.confirmed}</Text>
                    </View>
                    <View style={styles.globaldata}>
                        <Text style={{textAlign:"center"}}>{totalData.recovered}</Text>
                    </View>
                    <View style={styles.globaldata}>
                        <Text style={{textAlign:"center"}}>{totalData.deaths}</Text>
                    </View>
                    <View style={styles.globaldata}>
                        <Text style={{textAlign:"center"}}>{totalData.active}</Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity activeOpacity={1} onPress={()=>{setViewStates(states);setActive(true)}}>
                    <View style={[active?styles.activeButton:styles.inactiveButton,styles.button,{borderBottomLeftRadius:100,borderTopLeftRadius:100}]}>
                        <Text style={styles.text}>All</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={()=>setActive(false)}>
                    <View style={[active?styles.inactiveButton:styles.activeButton,styles.button,{borderBottomRightRadius:100,borderTopRightRadius:100}]}>
                        <Text style={styles.text}>Search</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                {!active?<View style={styles.search}>
                    <TextInput placeholder="Enter state" value={search} onChangeText={searchState} style={styles.input}/>
                </View>:null}
                <View>
                {visible?
                <FlatList data={viewStates} keyExtractor={(data)=>data.state} renderItem={({item})=><State item={item}/>}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}
                />
                :<Spinner/>
                }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    search:{flexDirection:"row",justifyContent:"center",alignItems:"center",
        borderRadius:20,borderColor:'red',borderWidth:1
    },
    input:{
        flex:1,
        textAlign:"center"
    },
    activeButton:{color:"white",backgroundColor:"red"},
    inactiveButton:{color:"red",backgroundColor:"white"},
    button:{width:100,borderWidth:1},
    text:{
        textAlign:"center",
        fontSize:20
    },
    container:{
        backgroundColor:"red",
        paddingVertical:40,
        alignItems:"center"
    },
    image:{
        aspectRatio:1,
        width:100,
        height:100    
    },
    global:{
        flexDirection:"row"
    },
    globaldata:{
        flex:1,
        borderWidth:2,
        borderRadius:20,
        marginHorizontal:5
    }
})

India.navigationOptions = {
    title:'India',
    drawerIcon: <Image name="India" source={require('../../assets/oie_transparent.png')} style={{aspectRatio:1,
        width:30,
        height:30   }} />
}

export default India;