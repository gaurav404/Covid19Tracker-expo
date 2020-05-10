import React ,{useEffect,useState,useCallback} from 'react'
import {View,Text,FlatList,Button,StyleSheet,SafeAreaView,RefreshControl} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {FontAwesome} from '@expo/vector-icons'
import instance from '../../helper/search'
import Spacer from '../custom/Spacer'
import Country from '../custom/Country'
import Header from '../custom/Header'
import Spinner from '../custom/Spinner'
const List = ({navigation})=>{
    const [visible,setVisible] = useState(false);
    const [global,setGlobal] = useState({TotalConfirmed:"....",TotalDeaths:"....",TotalRecovered:"...."});
    const [countries,setCountries] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [start,setStart] = useState(0);
    const fetch = ()=>{
        instance('/summary')
        .then(res=>{
            setGlobal(res.data.Global);
            let count = res.data.Countries;
            count = count.sort((data1,data2)=>{return data2.TotalConfirmed-data1.TotalConfirmed})
            count = count.map(data=>({
                Country: data.Country,
                CountryCode: data.CountryCode,
                NewConfirmed: data.NewConfirmed,
                TotalConfirmed: data.TotalConfirmed,
                NewDeaths: data.NewDeaths,
                TotalDeaths: data.TotalDeaths,
                NewRecovered: data.NewRecovered,
                TotalRecovered: data.TotalRecovered
            }));
            console.log(count.length);
            setVisible(true);
            setCountries(count);
            setRefresh(false);
        }).catch(err=>{
            console.log("probem")
        })
    }
    useEffect(()=>{
        console.log("ds");
        fetch();
    },[])
    onRefresh = React.useCallback(()=>{
        setRefresh(true);
        setVisible(false);
        fetch();
    },[refresh]);
    return (
        <SafeAreaView style={{flex: 1}}>
            <NavigationEvents onWillFocus={()=>{setVisible(false);fetch()}}/>
            <Header press={navigation.openDrawer} title="World"/>
            <View style={styles.container}>
                <FontAwesome style={{alignSelf:"center"}} name="globe" size={50}/>
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
                </View>
                <View style={styles.global}>
                    <View style={styles.globaldata}>
                        <Text style={{textAlign:"center"}}>{global.TotalConfirmed}</Text>
                    </View>
                    <View style={styles.globaldata}>
                        <Text style={{textAlign:"center"}}>{global.TotalRecovered}</Text>
                    </View>
                    <View style={styles.globaldata}>
                        <Text style={{textAlign:"center"}}>{global.TotalDeaths}</Text>
                    </View>
                </View>
            </View>
            {visible?<FlatList keyExtractor={data=>data.CountryCode} 
                    data={countries.slice(start,start+10)} 
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}
                    renderItem={({item,index})=>(<Country data={item} index={index+start}/>)}
                    />
                :<Spinner/>
            }
            <View style={[styles.global]}>
                <View style={{flex:1,marginHorizontal:10}}>
                <Button title="Previous" onPress={()=>setStart(Math.max(start-10,0))}/>
                </View>
                <View style={{flex:1,marginHorizontal:10}}>
                <Button title="Next"  onPress={()=>setStart(Math.min(start+10,countries.length-1))}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"red",
        padding: 40
    },
    global:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    globaldata:{
        flex:1,
        margin:5,        
        marginHorizontal:10,
        padding:2,
        borderWidth:2,
        borderRadius:20
    },
    text:{
        fontSize:50
    }
})

List.navigationOptions = {
    title:'List',
    drawerIcon: <FontAwesome name="list" size={20}/>
}

export default List;