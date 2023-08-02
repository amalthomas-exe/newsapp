import React, { useContext } from 'react'
import { View, Text, StatusBar, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import newsContext from '../../context/newsContext'
import AuthorInfo from '../../components/AuthorInfo'
import { State, TapGestureHandler } from 'react-native-gesture-handler'

const FullPageNews = (props) => {
  const { currentItem, colors, news,url } = useContext(newsContext)
  console.log(news[currentItem].description)
  return (
    <>
      <StatusBar backgroundColor={colors[currentItem % 8]} barStyle={'dark-content'} animated={true}/>
      <View style={{
        width: '100%',
        height: '100%',
        backgroundColor: colors[currentItem % 8],
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
      }
      }>
        <TapGestureHandler
          numberOfTaps={1}
          onHandlerStateChange={(e)=>{
            if(e.nativeEvent.state = State.END){
              console.log("going back")
              props.navigation.goBack()
            }
          }}
        >
        <View style={{
          alignSelf: 'flex-start',
          padding: 10,
          borderRadius: 50,
          backgroundColor: "#0000002c"
        }}>
          <Icon name="arrow-back" size={35} color="black"/>
        </View>
        </TapGestureHandler>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            marginTop: 20,
          }}>
            <Text style={{
              fontFamily: "Manrope-Bold",
              color: "black",
              fontSize: 25,
              lineHeight: 40
            }}>
              {news[currentItem].title}
            </Text>
          </View>
          <View>
            <Text style={{
              marginTop: 20,
              fontFamily: "Manrope-Regular",
              color: "#0000008e",
              fontSize: 15,
            }}>
              {news[currentItem].publishedAt.split("T")[0]}
            </Text>
          </View>
          <AuthorInfo author={news[currentItem].source.name} />
          <Text style={{
            color: 'black',
            fontSize: 15,
            fontFamily: "Manrope-Medium",
            lineHeight: 25,
            marginTop: 20
          }}>
            {news[currentItem].description}
          </Text>
          <Image
            source={{ uri: news[currentItem].urlToImage }}

            style={{
              width: '100%',
              height: 300,
              marginTop: 20,
              borderRadius: 10
            }}

          >

          </Image>
          <Text style={{
            color: 'black',
            fontSize: 15,
            fontFamily: "Manrope-Medium",
            lineHeight: 25,
            marginTop: 20
          }}>
            {news[currentItem].content}
          </Text>
        </ScrollView>
      </View>
    </>
  )
}

export default FullPageNews