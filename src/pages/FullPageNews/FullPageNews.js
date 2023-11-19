import React, { useContext, useState,useEffect } from 'react'
import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import newsContext from '../../context/newsContext'
import AuthorInfo from '../../components/AuthorInfo'
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const FullPageNews = ({ route }) => {
  console.log(route.params)
  const context = useContext(newsContext);
  const {setCurrentPage}= context;
  const { news, currentItem, currentPage,colors } = route.params
  console.log(news)
  const navigation = useNavigation()

  useEffect(()=>{
    setCurrentPage("FullPageNews")
  },[currentPage])

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault(); // Prevent default action
      unsubscribe() // Unsubscribe the event on first call to prevent infinite loop
      console.log("Pressed back")
      setCurrentPage("Home")
      navigation.navigate('Home') // Navigate to your desired screen
    });
 }, [])

  return (
    <>
      <StatusBar backgroundColor={colors[currentItem % 8]} barStyle={'dark-content'} animated={true} />
      <View style={{
        width: '100%',
        height: '100%',
        backgroundColor: colors[currentItem % 8],
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
      }
      }>
        <ScrollView showsVerticalScrollIndicator={false}
        >
          <TapGestureHandler
            numberOfTaps={1}
            onHandlerStateChange={(e) => {
              if (e.nativeEvent.state = State.END) {
                console.log("going back")
                navigation.goBack()
                setCurrentPage("Home")
              }
            }}
          ><View style={{
            alignSelf: 'flex-start',
            marginTop: 20,
            padding: 8,
            borderRadius: 50,
            backgroundColor: "#0000002c"
          }}>
              <Icon name="arrow-back" size={30} color="black" />
            </View>
          </TapGestureHandler>
          <View style={{
            marginTop: 20,
          }}>
            <Text style={{
              fontFamily: "Manrope-Bold",
              color: "black",
              fontSize: 25,
              lineHeight: 40
            }}>
              {news.title}
            </Text>
          </View>
          <View>
            <Text style={{
              marginTop: 20,
              fontFamily: "Manrope-Regular",
              color: "#0000008e",
              fontSize: 15,
            }}>
              {news.publishedAt.split("T")[0]}
            </Text>
          </View>
          <AuthorInfo author={news.source.name} />
          <Text style={{
            color: 'black',
            fontSize: 15,
            fontFamily: "Manrope-Medium",
            lineHeight: 25,
            marginTop: 20
          }}>
            {news.description}
          </Text>
          <Image
            source={{ uri: news.urlToImage }}

            style={{
              width: '100%',
              height: 250,
              marginTop: 20,
              borderRadius: 10,
              objectFit: 'cover'
            }}

          >
          </Image>
        </ScrollView>
        <TouchableOpacity style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          marginBottom: 20,
          left: 20,
          elevation: 10,
              backgroundColor: '#ffb08f',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'centers',
              alignItems: 'center',
              borderRadius: 15
        }}>
            <Text style={{
              color: colors[currentItem % 8],
              fontSize: 18,
              fontFamily: "Manrope-Bold",
              lineHeight: 25,
              paddingVertical: 8
            }}>
              View full story
            </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default FullPageNews