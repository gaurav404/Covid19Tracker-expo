import React, { Component } from 'react';
import {NavigationActions, SafeAreaView} from 'react-navigation';
import { Text,View, ScrollView, StyleSheet,Linking, Image,AsyncStorage } from 'react-native'
import Spacer from '../custom/Spacer'
import {Avatar,Divider} from 'react-native-elements'
import { DrawerItems } from 'react-navigation-drawer';
import Constants from 'expo-constants'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'
import {FontAwesome} from '@expo/vector-icons'
export default class DrawerView extends Component {
    state={
        imageURL:null
    }
    async componentDidMount(){
        if (Constants.platform.ios) {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        let r = await AsyncStorage.getItem('uri')
        this.setState({
            imageURL:r
        })
    }
    setImageURL = (url)=>{
        AsyncStorage.setItem('uri',url);
        this.setState({
            imageURL:url
        })
    }
    openLinkedIn = ()=>{
        Linking.openURL('https://www.linkedin.com/in/gaurab-agarwala-020515141/');
    }
    openGithub = ()=>{
        Linking.openURL('https://github.com/gaurav404');
    }
    navigateToScreen = ( route ) =>{
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }
    openImagePermission = async ()=>{
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if(pickerResult.cancelled==true){
            return;
        }
        //console.log(pickerResult);
        this.setImageURL(pickerResult.uri);
    } 
  render() {
      //console.log(this.state.imageURL)
    return (
        <View style={{flex:1}}>
            <ScrollView>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <Spacer/>
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            {this.state.imageURL?
                                <Avatar size='large' rounded source={{uri:this.state.imageURL}} />
                                : <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }}  />
                            }
                            
                        </View>
                        <Divider style={{height: 1, backgroundColor:'#e1e8ee'}}/>
                    </View>
                    <TouchableOpacity onPress={this.openImagePermission}>
                        <View style={{flex:1,flexDirection:"row",paddingBottom:20,justifyContent:"center"}}>
                             <Text style={{backgroundColor:"red",paddingHorizontal:50,paddingVertical:10,opacity:0.5}}>UPLOAD</Text>       
                        </View>
                    </TouchableOpacity>
                    <DrawerItems {...this.props}/>
                    <Divider/>
                    <Text style={{margin:"3%",textAlign:"center"}}>Connect With Me</Text>
                    <Divider/>
                    <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",marginTop:"10%"}}>
                        <TouchableOpacity onPress={this.openLinkedIn}>
                            <View style={{flex:1,flexDirection:"row",paddingBottom:20,justifyContent:"center"}}>
                                <FontAwesome name="linkedin-square" size={30}/>       
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openGithub}>
                            <View style={{flex:1,flexDirection:"row",paddingBottom:20,justifyContent:"center"}}>
                                <FontAwesome name="github-square" size={30}/>       
                            </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    headerContainer: {
        height: 100,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: { 
        paddingTop: 20,
        width: '100%',
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20, 
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#00adff'
    },
    activeBackgroundColor: {
        backgroundColor: 'grey'
    }
});