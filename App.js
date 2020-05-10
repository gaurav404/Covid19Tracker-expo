import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation-drawer'
import List from './components/Screens/List'
import Source from './components/Screens/Source'
import Search from './components/Screens/Search'
import Charts from './components/Screens/Charts'
import India from './components/Screens/India'
import DrawerView from './components/custom/Drawer'
import {setNavigator} from './navigationsRef'
import {FontAwesome} from '@expo/vector-icons'
const drawerNavigator = createDrawerNavigator(
  {
    List : List,
    Search: Search,
    Charts: Charts,
    India: India,
    Source: Source
  },
  {
    contentComponent: DrawerView,
    contentOptions: {
      activeTintColor: '#ab1e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
)

const switchNavigator = createSwitchNavigator({
  drawerFlow: drawerNavigator
  //signFlow: createSwitchNavigator({},{})
})

const App = createAppContainer(switchNavigator);
export default ()=>{
  return (
      <>
        <App ref={(navigator)=>setNavigator(navigator)} style={{marginTop:100,backgroundColor:"yellow"}}>
        </App>
      </>
  )
}