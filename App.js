import React from 'react'
import Welcome from './src/pages/Welcome/Welcome'
import { SafeAreaView, StatusBar, View } from 'react-native'
import NewsState from './src/context/NewsState'
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler'

const app = () => {
  return (
    <>
    <NewsState>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#111111"
          barStyle="light-content"
        />
        <Welcome />
      </GestureHandlerRootView>
    </NewsState>
    </>
  )
}

export default app