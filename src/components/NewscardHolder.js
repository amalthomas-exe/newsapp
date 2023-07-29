import React, { useState, useEffect, useContext } from 'react'
import newsContext from '../context/newsContext'
import Newscard from './Newscard'
import { Alert, Animated, Dimensions, View } from 'react-native'

const colors = ["#FFE8E5", "#FFF2C5", "#E0F1FF"]

// const DATA = [{ title: "Breaking News: New Discovery in Space Exploration", description: "Scientists have made a groundbreaking discovery in space exploration..." },
// { title: "Economic Growth Forecast for the Upcoming Year", description: "The economy is predicted to experience significant growth..." },
// { title: "Health Alert: Outbreak of New Virus Strain", description: "Health officials are closely monitoring an outbreak of a new virus strain..." },
// { title: "Sports Update: Exciting Upset in Major Tournament", description: "In a surprising turn of events, an underdog team secures victory..." },
// { title: "Technology Advancement: AI Breakthrough", description: "Researchers have achieved a major advancement in artificial intelligence..." },
// { title: "Environmental Concerns: Record High Temperatures", description: "Record-breaking temperatures raise concerns about the environment..." },
// { title: "Breaking News: New Discovery in Space Exploration", description: "Scientists have made a groundbreaking discovery in space exploration..." },
// { title: "Economic Growth Forecast for the Upcoming Year", description: "The economy is predicted to experience significant growth..." },
// { title: "Health Alert: Outbreak of New Virus Strain", description: "Health officials are closely monitoring an outbreak of a new virus strain..." },
// { title: "Sports Update: Exciting Upset in Major Tournament", description: "In a surprising turn of events, an underdog team secures victory..." },
// { title: "Technology Advancement: AI Breakthrough", description: "Researchers have achieved a major advancement in artificial intelligence..." },
// { title: "Environmental Concerns: Record High Temperatures", description: "Record-breaking temperatures raise concerns about the environment..." },
// { title: "Breaking News: New Discovery in Space Exploration", description: "Scientists have made a groundbreaking discovery in space exploration..." },
// { title: "Economic Growth Forecast for the Upcoming Year", description: "The economy is predicted to experience significant growth..." },
// { title: "Health Alert: Outbreak of New Virus Strain", description: "Health officials are closely monitoring an outbreak of a new virus strain..." },
// { title: "Sports Update: Exciting Upset in Major Tournament", description: "In a surprising turn of events, an underdog team secures victory..." },
// { title: "Technology Advancement: AI Breakthrough", description: "Researchers have achieved a major advancement in artificial intelligence..." },
// { title: "Environmental Concerns: Record High Temperatures", description: "Record-breaking temperatures raise concerns about the environment..." },
// { title: "Breaking News: New Discovery in Space Exploration", description: "Scientists have made a groundbreaking discovery in space exploration..." },
// { title: "Economic Growth Forecast for the Upcoming Year", description: "The economy is predicted to experience significant growth..." },
// { title: "Health Alert: Outbreak of New Virus Strain", description: "Health officials are closely monitoring an outbreak of a new virus strain..." },
// { title: "Sports Update: Exciting Upset in Major Tournament", description: "In a surprising turn of events, an underdog team secures victory..." },
// { title: "Technology Advancement: AI Breakthrough", description: "Researchers have achieved a major advancement in artificial intelligence..." },
// { title: "Environmental Concerns: Record High Temperatures", description: "Record-breaking temperatures raise concerns about the environment..." },


// ]




const width = Dimensions.get("window").width

const NewscardHolder = () => {
  const context = useContext(newsContext)
  const { fetchData,news,dataReady,category } = context;
  const [currentItem, setCurrentItem] = useState(0)
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
    <View>
      {
        dataReady && news.map((item, index) => {
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
              currentItem={currentItem}
              color={colors[index % 3]}
            />

          )
        }
        )
      }
    </View>
  )
}

export default NewscardHolder