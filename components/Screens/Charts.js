import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,FlatList,StyleSheet,Dimensions,ScrollView,TouchableOpacity, SafeAreaView,RefreshControl} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import Header from '../custom/Header'
import IndiaSearch from '../../helper/indiaApi'
import {Overlay,Button} from 'react-native-elements'
import {LineChart} from 'react-native-chart-kit'
import Spinner from '../custom/Spinner'
import { NavigationEvents } from 'react-navigation'
const Charts = ({navigation})=>{
    const [type,setType] = useState(0);
    const [refresh,setRefresh] = useState(false);
    const [visible,setVisible] = useState(false);
    const [dataGlobal,setDataGlobal] = useState([]);
    const [dataState,setDataState] = useState([]);
    const [newDataGlobal,setNewDataGlobal] = useState([]);
    const [newDataState,setNewDataState] = useState([]);
    const [dates,setDates] = useState([]);
    const [allStates,setAllStates] = useState([]);
    const [presentState,setPresentState] = useState('India');
    const [active,setActive] = useState(false);
    const [option,setOption] = useState("confirmed");
    const fetch = ()=>{
        IndiaSearch.get('/statewise/history')
        .then(res=>res.data)
        .then(res=>{
            //console.log(res.data.history);
            res = res.data.history.slice(-15);
            const allDates = res.map(data=>data.day);
            const global = res.map(data=>data.total);
            let newGlobal = [];
            for(var i=1;i<global.length;i++){
                let r = {confirmed:"",recovered:"",deaths:"",active:""};
                r.confirmed=global[i].confirmed-global[i-1].confirmed;
                r.deaths=global[i].deaths-global[i-1].deaths;
                r.active=global[i].active-global[i-1].active;
                r.recovered=global[i].recovered-global[i-1].recovered;
                newGlobal.push(r);
            }
            let states={};
            let newstates={};
            res.forEach(data=>{
                data.statewise.forEach(st=>{
                    if(!states[st.state]){
                        states[st.state]=[];
                    }
                    states[st.state].push({
                        confirmed: st.confirmed,
                        recovered: st.recovered,
                        deaths: st.deaths,
                        active: st.active,
                    })
                })
            })
            let y = ['India'];
            y = y.concat(Object.keys(states));
            Object.keys(states).forEach(state=>{
                newstates[state]=[];
                for(var i=1;i<states[state].length;i++){
                    let r = {confirmed:"",recovered:"",deaths:"",active:""};
                    r.confirmed=states[state][i].confirmed-states[state][i-1].confirmed;
                    r.deaths=states[state][i].deaths-states[state][i-1].deaths;
                    r.active=states[state][i].active-states[state][i-1].active;
                    r.recovered=states[state][i].recovered-states[state][i-1].recovered;
                    newstates[state].push(r);
                }
            })
            setAllStates(y);
            setDataGlobal(global);
            setNewDataGlobal(newGlobal)
            setDataState(states);
            setNewDataState(newstates);
            setDates(allDates);
            setActive(true);
        })
        .catch(err=>{
            console.log(err);
        }).finally(()=>{
            setRefresh(false);
        })
    }
    useEffect(()=>{
        fetch();
    },[])
    onRefresh = React.useCallback(()=>{
        setRefresh(true);
        fetch();
    })
    const toggleOverlay=()=>{
        setVisible(!visible);
    }
    return (
        <SafeAreaView>
        <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refresh}/>}>
            <NavigationEvents onWillFocus={()=>{setActive(false);fetch()}}/>
            <Header press={navigation.openDrawer} title="Charts"/>
            <View style={[styles.container,{marginTop:"2%"}]}>        
                <View style={[styles.search]}>
                    <Button title="States" onPress={toggleOverlay}/>
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                        <FlatList data={allStates} keyExtractor={(data)=>data} renderItem={({item})=>{
                            return (
                                <TouchableOpacity onPress={(d)=>{toggleOverlay();setPresentState(item)}}>
                                <View style={styles.overlay}>
                                    <Text style={styles.text}>{item}</Text>
                                </View>
                                </TouchableOpacity>
                            )        
                        }
                    }/>
                    </Overlay>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={{flex:1, width:"100%",backgroundColor:"orange", padding:10}} onPress={()=>setOption("confirmed")}><Text style={styles.text}>Confimred</Text></TouchableOpacity>
                    <TouchableOpacity style={{flex:1, width:"100%",backgroundColor:"green", padding:10}} onPress={()=>setOption("recovered")}><Text style={styles.text}>Recovered</Text></TouchableOpacity>
                    <TouchableOpacity style={{flex:1, width:"100%",backgroundColor:"red", padding:10}}onPress={()=>setOption("deaths")}><Text style={styles.text}>Deaths</Text></TouchableOpacity>
                    <TouchableOpacity style={{flex:1, width:"100%",backgroundColor:"orange", padding:10}} onPress={()=>setOption("active")}><Text style={styles.text}>Active</Text></TouchableOpacity>
                </View>
                <View style={styles.chart}>
                <Text style={styles.text}>{(type?'NEW':'TOTAL')+" "+option.toUpperCase()+" IN "+presentState.toUpperCase()}</Text>
                <View style={styles.content}>
                    {active?<LineChart
                    data={{
                        labels: dates.map(data=>data.slice(-2)).slice(type),
                        datasets: [
                          {
                            data: (!type?(presentState=='India'?dataGlobal:dataState[presentState]):(presentState=='India'?newDataGlobal:newDataState[presentState])).map(data=>data[option]) ,
                            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                            strokeWidth: 1 // optional
                          }
                        ],
                        // legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
                      }}
                    width={Dimensions.get("window").width}
                    height={300}
                    fromZero={true}
                    chartConfig={{
                        backgroundGradientFrom: "green",
                        backgroundGradientFromOpacity: 0.2,
                        backgroundGradientTo: "red",
                        backgroundGradientToOpacity: 0.5,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(66, 125, 36, ${opacity})`, // optional, default 3
                        barPercentage: 0.5,
                        useShadowColorFromDataset: false,// optional
                        propsForDots: {
                            r: "2",
                            strokeWidth: "1",
                            stroke: "#ffa726"
                          }
                      }}
                      bezier
                />:<Spinner/>}</View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={{flex:1, width:"100%",backgroundColor:"orange", padding:10}} onPress={()=>setType(1)}><Text style={styles.text}>New</Text></TouchableOpacity>
                    <TouchableOpacity style={{flex:1, width:"100%",backgroundColor:"red", padding:10}}onPress={()=>setType(0)}><Text style={styles.text}>Total</Text></TouchableOpacity>
                </View>
                </View>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
    
    },
    content:{
        alignItems:"center"
    },
    buttons:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:20
    },
    search:{
        marginBottom:10,
        borderWidth:1,
        borderRadius:30
    },
    overlay:{
        width:"100%",
        borderBottomWidth:1,
        padding:10,
    },
    chart:{
        flex:1,
        alignSelf:"center",
        justifyContent:"center"
    },
    text:{
        textAlign:"center"
    }
})
Charts.navigationOptions = {
    title:'Charts',
    drawerIcon: <FontAwesome name="line-chart" size={20}/>
}
export default Charts;