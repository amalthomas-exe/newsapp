import React, { useState, useEffect, useContext } from 'react'
import newsContext from '../context/newsContext'
import Newscard from './Newscard'
import { Alert, Animated, Dimensions, View } from 'react-native'
import { Image,Text } from 'react-native'



const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const NewscardHolder = (props) => {
  const context = useContext(newsContext)
  const { fetchData, news, dataReady, category,currentItem,setCurrentItem } = context;
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  // const [activeData, setActiveData] = useState([]);
  const [dataNeeded, setDataNeeded] = useState(false);


  console.log("Newscardholder component built")
  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
      speed: 20
    }).start();
  }, [])

  useEffect(() => {
    fetchData()
  }, [category])

  console.log(news.length + " NEws length")
  const setActiveIndex = React.useCallback((activeIndex) => {
    if (activeIndex == -1 || activeIndex == news.length) {
      return;
    }

    console.log(activeIndex)
    setCurrentItem(activeIndex)
    scrollXIndex.setValue(activeIndex);
  })
  return (
    <View style={{
    }}>
      {
        dataReady ? news.map((item, index) => {
          const inputRange = [index - 1, index, index + 1];
          const translateX = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [70, 0, -width - 50],
          });
          const zIndex = news.length - index;
          const scale = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [0.8, 1, 1],
          });

          const rotate = scrollXAnimated.interpolate({
            inputRange,
            outputRange: ['10deg', '0deg', '-10deg'],
          });

          const translateY = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [20, 0, 0],
          });

          const opacity = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [1 - 1 / 2, 1, 1],
          });
          return (
            <Newscard
              key={index}
              index={index}
              news={item}
              animationProps={[translateX, rotate, translateY, opacity]}
              zIndex={zIndex}
              setActiveIndex={setActiveIndex}
              navigation={props.navigation}
              currentItem={currentItem}
            />

          )
        }
        ) : <View style={{
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           flexDirection: 'column',
         }}>
           <Image style={{
             width: width / 1.25,
             height: width / 1.25,
             objectFit: "contain",
           }} source={require('../../assets/images/loading.png')} />
           <Text style={{
             color: "#ffffff8e",
             fontFamily: "Manrope-Regular",
             fontSize: 20,
             marginTop: 0
           }}>Getting the latest happenings</Text>
         </View>
      }
    </View>
  )
}

export default NewscardHolder