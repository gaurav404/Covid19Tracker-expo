import React,{useContext} from 'react'
import {Appbar} from 'react-native-paper'
import {Button,TouchableOpacity} from 'react-native' 
import {FontAwesome} from '@expo/vector-icons'
const Header = ({title,press})=>{
    return(
        <Appbar.Header style={{backgroundColor:"white",paddingHorizontal:20}}>
            <TouchableOpacity onPress={press}>
                <FontAwesome name="bars" size={30}/>
            </TouchableOpacity>
            <Appbar.Content title={title} style={{alignItems:"center"}}/>
        </Appbar.Header>
    )
}

export default Header;