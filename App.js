import * as React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { Icon, PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import Home from './components/home';
import Settings from './components/settings';
import Login from './components/login';
import Create from './components/create';
import Edit from './components/edit';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Navbar = createDrawerNavigator();
const Navvie = createNativeStackNavigator();

function Drawer() {
  return(
  <Navbar.Navigator
  screenOptions={{
    //headerShown: false,
    drawerActiveTintColor: 'white',
    drawerInactiveTintColor: "white",
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: "#40e0d0",
      borderWidth: 0
    },
    drawerStyle: {
      backgroundColor: '#40e0d0',
    },
    drawerActiveBackgroundColor: 'aqua',
    swipeEnabled: true
  }}
  >
    <Navbar.Screen name="Home" component={Home} />
    <Navbar.Screen name="Settings" component={Settings}/>
    <Navbar.Screen name="Login" component={Login}/>
  </Navbar.Navigator>
  )
}

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Navvie.Navigator>
        <Navvie.Screen options = {{headerShown: false, headerStyle: {backgroundColor: "#40e0d0"}}} style={styles.page_style} name="Drawer" component={Drawer}/>
        <Navvie.Screen options = {{headerTintColor: 'white', headerRight: () => (<MaterialIcons.Button onPress={() => alert('Test')} name="save" color="white" size={35} backgroundColor={'#00ced1'} marginRight={10}>Save</MaterialIcons.Button>), headerStyle: {backgroundColor: "#40e0d0", borderWidth: 0}}} name="Create" component={Create}/>
        <Navvie.Screen options = {{headerTintColor: 'white', headerRight: () => (<MaterialIcons.Button onPress={() => alert('Test')} name="save" color="white" size={35} backgroundColor={'#00ced1'} marginRight={10}>Save</MaterialIcons.Button>), headerStyle: {backgroundColor: "#40e0d0", borderWidth: 0}}} name="Edit" component={Edit}/>
      </Navvie.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ced1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashscreen_title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white'
  },
  page_style: {
  }
});