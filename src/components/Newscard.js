import React, { useEffect, useState,useContext } from 'react'
import { View, StyleSheet, Text, Dimensions, Animated, Image, Alert } from 'react-native'
import AuthorInfo from './AuthorInfo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler'
import FullPageNews from '../pages/FullPageNews/FullPageNews'
import {useBetweenPages,BetweenTypes} from 'between-pages'
import newsContext from '../context/newsContext'
const ScreenWidth = Dimensions.get("window").width

//edit the function below to include only a certain count of characters to the string

function reduceStringToWordCount(inputString, wordCount) {
    const wordsArray = inputString.trim().split(/\s+/);
    const reducedWordsArray = wordsArray.slice(0, wordCount);
    const reducedString = reducedWordsArray.join(" ");
    return reducedString;
}

function reduceStringToCharacterCount(inputString, charCount) {
    if (inputString.length <= charCount) {
        return inputString;
    } else {
        const reducedString = inputString.slice(0, charCount);
        return reducedString;
    }
}


const Newscard = (props) => {
    const translateX = new Animated.Value(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const doubleTapRef = React.useRef(null);
    const context = useContext(newsContext);
    const {colors,currentItem,setCurrentPage} = context
    const {startTransition} = useBetweenPages(<FullPageNews context={context}/>)

    const handleToNewsPage = () => {
        startTransition(
            {
                type:BetweenTypes.SPRING,
                duration: 300,
                endAnimation:true
            },
            ()=>{
                props.navigation.navigate("FullPageNews",);
            }
        );
    }

    return (
        ((props.index == currentItem) || (props.index == currentItem + 1)) &&
        <PanGestureHandler
            enabled={props.index == currentItem}
            maxPointers={1}
            onGestureEvent={
                Animated.event(
                    [
                        {
                            nativeEvent: {
                                translationX: translateX,
                            },
                        },
                    ],
                    {
                        useNativeDriver: true,
                    }
                )
            }

            onHandlerStateChange={(e) => {
                if (e.nativeEvent.state === State.BEGAN) {
                    setIsDragging(true);
                }

                if (e.nativeEvent.state === State.ACTIVE) {
                    console.log("done")

                }
                if (e.nativeEvent.state === State.END) {
                    console.log("end")
                    setIsDragging(false);
                    if (e.nativeEvent.translationX < -50) {
                        props.setActiveIndex(currentItem + 1);
                    }
                    else if (e.nativeEvent.translationX > 50) {
                        props.setActiveIndex(currentItem - 1);
                    }
                }
            }}

        >
            <Animated.View style={{
                backgroundColor: colors[props.index % 8],
                paddingHorizontal: 25,
                paddingBottom: 10,
                paddingTop: 20,
                width: ScreenWidth/1.15,
                //height:Dimensions.get("window").height/2.1,
                marginBottom: 20,
                borderRadius: 25,
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                zIndex: props.zIndex,
                left: "-42%",
                transform: [
                    { translateX: (isDragging) ? translateX : props.animationProps[0] },
                    { rotate: props.animationProps[1] },
                    { translateY: props.animationProps[2] },
                ],
                opacity: props.animationProps[3],
            }
            }>
                <TapGestureHandler
                    enabled={props.index == currentItem}
                    onHandlerStateChange={(e) => {
                        if (e.nativeEvent.state === State.END) {
                            setCurrentPage("fullPageNews")
                            props.navigation.navigate("FullPageNews",{
                                news:props.news,
                                currentItem:currentItem,
                                colors:colors
                            });
                            //handleToNewsPage();
                        }
                    }
                    }

                    waitFor={doubleTapRef}
                >
                    <TapGestureHandler
                        enabled={props.index == currentItem}
                        numberOfTaps={2}
                        ref={doubleTapRef}
                        onHandlerStateChange={(e) => {
                            if (e.nativeEvent.state === State.ACTIVE) {
                                setLiked(!liked);
                            }
                        }
                    }
                    >
                    <View>
                        <Text style={{
                            fontFamily: "Manrope-Bold",
                            color: "black",
                            fontSize: 30,
                            lineHeight: 40
                        }}>
                            {(props.news.description !== null) ? reduceStringToWordCount(props.news.title, 10) + "..." : props.news.title}
                        </Text>
                        <Text style={{
                            marginTop: 20,
                            fontFamily: "Manrope-Regular",
                            color: "#0000008e",
                            fontSize: 15,
                        }}>
                            {props.news.publishedAt.split("T")[0]}
                        </Text>
                        <View>
                            <AuthorInfo author={props.news.source.name} reduceStringToCharacterCount={reduceStringToCharacterCount} />
                        </View>
                        {!(props.news.description === null || props.news.description == "") && <View style={{
                            marginTop: 20
                        }}>
                            <Text style={{
                                color: 'black',
                                fontSize: 15,
                                fontFamily: "Manrope-Medium",

                                lineHeight: 25
                            }}>
                                {reduceStringToWordCount(props.news.description, 30) + "..."}
                            </Text>
                        </View>}

                        <View style={{
                            marginTop: 50
                        }}>
                            <View style={{
                                position: 'relative',
                                alignSelf: "flex-end",
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <TapGestureHandler
                                    enabled={props.index == currentItem}
                                    onHandlerStateChange={(e) => {
                                        if (e.nativeEvent.state === State.ACTIVE) {
                                            setLiked(!liked);
                                        }
                                    }
                                    }
                                >
                                    <View style={styles.actionButtons}>
                                        <Icon name={liked ? "thumbs-up" : "thumbs-o-up"} size={18} color="black" />
                                    </View>
                                </TapGestureHandler>

                                <TapGestureHandler
                                    enabled={props.index == currentItem}
                                    onHandlerStateChange={(e) => {
                                        if (e.nativeEvent.state === State.ACTIVE) {
                                            setBookmarked(!bookmarked);
                                        }
                                    }
                                    }
                                >
                                <View style={styles.actionButtons}>
                                    <Icon name={bookmarked ? "bookmark" : "bookmark-o"} size={18} color="black" />
                                </View>
                                </TapGestureHandler>

                                <View style={styles.actionButtons}>
                                    <Icon name="share-square-o" size={18} color="black" />
                                </View>
                            </View>
                        </View>
                    </View>
                    </TapGestureHandler>
                </TapGestureHandler>
            </Animated.View>
            {/* </FlingGestureHandler> */}
        </PanGestureHandler>
    );
}


const styles = StyleSheet.create({
    actionButtons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 50,
        width: 30,
        height: 30,
        marginLeft: 10
    }
})
export default Newscard