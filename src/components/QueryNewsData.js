import React,{useContext} from 'react'
import { View ,Text,TouchableOpacity} from 'react-native'
import newsContext from '../context/newsContext'
import { useNavigation } from '@react-navigation/native'
import { TapGestureHandler,State } from 'react-native-gesture-handler'

const QueryNewsData = (props) => {
    const navigation = useNavigation()
    const context = useContext(newsContext)
    const {currentItem,colors,setCurrentPage} = context

  return (
    <TapGestureHandler
        numberOfTaps={1}
        onHandlerStateChange={(e) => {
            if (e.nativeEvent.state == State.END) {
                setCurrentPage("fullPageNews")
                navigation.navigate('FullPageNews',{
                    news:props.news,
                    currentItem:props.index,
                    colors:colors
                })
            }
        }}
    >
    <View style={{
        backgroundColor:colors[props.index % colors.length],
        display:'flex',
        flexDirection:'column',
        borderRadius:15,
        marginVertical:5,
        padding:20
    }}>
        <Text style={{
            fontFamily:'Manrope-Bold',
            fontSize:20,
            color:"#303030",
        }}>
            {props.news.title}
        </Text>
        <View style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            marginTop:20
        }}>
            <Text style={{
                fontFamily:'Manrope-Regular',
                fontSize:15,
                fontWeight:'bold',
                color:"#303030",
            }}>
                {props.news.author}
            </Text>
            <Text style={{
                fontFamily:'Manrope-Regular',
                fontSize:15,
                color:"#303030",
            }}>
                {props.news.publishedAt.split("T")[0]}
            </Text>
        </View>
    </View>
    </TapGestureHandler>
  )
}

export default QueryNewsData