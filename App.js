import React from 'react'
import Home from './src/pages/Home/Home'
import FullPageNews from './src/pages/FullPageNews/FullPageNews'
import Search from './src/pages/Search'
import BottomNavBar from './src/components/BottomNavBar'
import { StatusBar} from 'react-native'
import NewsState from './src/context/NewsState'
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler'
import { BetweenPagesProvider } from 'between-pages'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const app = () => {
  return (
    <>
      <NavigationContainer>
        <BetweenPagesProvider>
          <NewsState>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar
                backgroundColor="#111111"
                barStyle="light-content"
              />
              <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{
                  headerShown: false,
                }}/>
                <Stack.Screen name="FullPageNews" component={FullPageNews} options={{
                  headerShown:false,
                  animation:'slide_from_right',
                  }} />
                  <Stack.Screen name="Search" component={Search} options={{
                  headerShown:false,
                  animation:'slide_from_right',
                  }} />
              </Stack.Navigator>
              
            <BottomNavBar />
            </GestureHandlerRootView>
          </NewsState>
        </BetweenPagesProvider>
      </NavigationContainer>
    </>
  )
}

export default app