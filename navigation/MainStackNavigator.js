import 'react-native-gesture-handler';
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import StartPage from '../components/startpage'
import TestPage from '../components/testpage'
import AllWordsPage from '../components/allwordspage'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Content' screenOptions={{
      headerStyle: {
        backgroundColor: '#388581',
        height: 75,
        borderBottomColor: '#388581',
        borderBottomWidth: 1
      },
      headerTitleAlign: 'center',
      headerBackTitleStyle: {
      fontWeight: 'bold'
      },
      headerTintColor: '#EDEEED', 
      headerTruncatedBackTitle: 'Start',
      }}>
        <Stack.Screen name='Start' component={StartPage}  options={{ title: 'Träna glosor' }}/>
        <Stack.Screen name='Test' component={TestPage}  options={{ title: 'Ordprov' }}/>
        <Stack.Screen name='AllWords' component={AllWordsPage} options={{ title: 'Ordlista' }}/>
      </Stack.Navigator>
  )
}

export default MainStackNavigator