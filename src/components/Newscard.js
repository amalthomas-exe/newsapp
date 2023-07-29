import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Dimensions, Animated, Image, Alert } from 'react-native'
import AuthorInfo from './AuthorInfo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler'

const width = Dimensions.get("window").width

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

    return (
        ((props.index == props.currentItem) || (props.index == props.currentItem + 1)) &&
        <PanGestureHandler
            enabled={props.index == props.currentItem}
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
                        props.setActiveIndex(props.currentItem + 1);
                    }
                    else if (e.nativeEvent.translationX > 50) {
                        props.setActiveIndex(props.currentItem - 1);
                    }
                }
            }}

        >
            <Animated.View style={{
                backgroundColor: props.color,
                paddingHorizontal: 25,
                paddingBottom: 10,
                paddingTop: 20,
                width: Dimensions.get("window").width / 1.15,
                //height:Dimensions.get("window").height/2.1,
                marginBottom: 20,
                borderRadius: 15,
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
                opacity: props.animationProps[3]
            }
            }>
                <TapGestureHandler
                    numberOfTaps={2}
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