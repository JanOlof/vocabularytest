import 'react-native-gesture-handler';
import * as React from 'react'
//import {Image} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import StartPage from '../components/startpage'
import TestPage from '../components/testpage'
import AllWordsPage from '../components/allwordspage'
/*
import Content from '../components/content'
import Detail from '../components/detail'
import addAMovie from '../components/addAMovie'
import editMovies from '../components/editMovies'
import deleteMovie from '../components/deleteAMovie'
*/
const Stack = createStackNavigator()
/*
function LogoTitle() {
  return (
    <Image
      style={{ width: 100, height: 90, margin: 'auto' }}
      source={require('../assets/movie.png')}
    />
  );
}
*/
function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Content' screenOptions={{
      headerStyle: {
        backgroundColor: '#0026FF',
        height: 100,
        borderBottomColor: '#000000',
        borderBottomWidth: 1
      },
      headerTitleAlign: 'center',
      headerBackTitleStyle: {
        color: '#00',
        fontWeight: 'bold'
      },
      headerTintColor: '#FFFFFF'
      }}>
        <Stack.Screen name='Start' component={StartPage}/>
        <Stack.Screen name='Test' component={TestPage}/>
        <Stack.Screen name='AllWords' component={AllWordsPage}/>
        
        {/* <Stack.Screen name='Content' component={Content} options={{ headerTitle: props => <LogoTitle {...props} /> }}/>
        <Stack.Screen name='Detail' component={Detail} options={{ headerTitle: props => <LogoTitle {...props} /> }}/>
        <Stack.Screen name='addAMovie' component={addAMovie} options={{ headerTitle: props => <LogoTitle {...props} /> }}/>
        <Stack.Screen name='editMovies' component={editMovies} options={{ headerTitle: props => <LogoTitle {...props} /> }}/>
        <Stack.Screen name='deleteMovie' component={deleteMovie} options={{ headerTitle: props => <LogoTitle {...props} /> }}/>
         */}
      </Stack.Navigator>
  )
}

export default MainStackNavigator