import React, { useContext } from 'react'
import newsContext from '../../context/newsContext'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import NewscardHolder from '../../components/NewscardHolder'

const Welcome = ({navigation}) => {
    const context = useContext(newsContext)
    const { category, setCategory } = context;
    console.log("Welcome")
    console.log(category)
    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
                >
                    <Icon name="newspaper-o" size={30} />

                    <Text style={styles.titleText} >
                        News
                    </Text>
                </View>
                <View>
                    <Text>
                        Menu
                    </Text>
                </View>
            </View>
            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={false} style={{
                    marginTop: 15,
                }}>
                    <TapGestureHandler onHandlerStateChange={(e) => {
                        if (e.nativeEvent.state === State.ACTIVE) {
                            console.log("Trending")
                            setCategory("trending")
                        }
                    }
                    }
                    >
                        <Text style={(category=="trending") ? {...styles.scrollNavActive} : {...styles.scrollNav}}>Trending</Text>
                    </TapGestureHandler>

                    <TapGestureHandler onHandlerStateChange={(e) => {
                        if (e.nativeEvent.state === State.ACTIVE) {
                            console.log("business")
                            setCategory("business")
                        }
                    }
                    }
                    >
                        <Text style={(category=="business") ? {...styles.scrollNavActive} : {...styles.scrollNav}}>Business</Text>
                    </TapGestureHandler>

                    <TapGestureHandler onHandlerStateChange={(e) => {
                        if (e.nativeEvent.state === State.ACTIVE) {
                            console.log("entertainment")
                            setCategory("entertainment")
                        }
                    }
                    }
                    >
                        <Text style={(category=="entertainment") ? {...styles.scrollNavActive} : {...styles.scrollNav}}>Entertainment</Text>
                    </TapGestureHandler>

                    <TapGestureHandler onHandlerStateChange={(e) => {
                        if (e.nativeEvent.state === State.ACTIVE) {
                            console.log("sports")
                            setCategory("sports")
                        }
                    }
                    }
                    >
                        <Text style={(category=="sports") ? {...styles.scrollNavActive} : {...styles.scrollNav}}>Sports</Text>
                    </TapGestureHandler>

                    <TapGestureHandler onHandlerStateChange={(e) => {
                        if (e.nativeEvent.state === State.ACTIVE) {
                            console.log("science")
                            setCategory("science")
                        }
                    }
                    }
                    >
                        <Text style={(category=="science") ? {...styles.scrollNavActive} : {...styles.scrollNav}}>Science</Text>
                    </TapGestureHandler>

                    <TapGestureHandler onHandlerStateChange={(e) => {
                        if (e.nativeEvent.state === State.ACTIVE) {
                            console.log("technology")
                            setCategory("technology")
                        }
                    }
                    }
                    >
                        <Text style={(category=="technology") ? {...styles.scrollNavActive} : {...styles.scrollNav}}>Technology</Text>
                    </TapGestureHandler>

                    <TapGestureHandler onHandlerStateChange={(e) => {
                        if (e.nativeEvent.state === State.ACTIVE) {
                            console.log("health")
                            setCategory("health")
                        }
                    }
                    }
                    >
                        <Text style={(category=="health") ? {...styles.scrollNavActive} : {...styles.scrollNav}}>Health</Text>
                    </TapGestureHandler>
                </ScrollView>
            </View>
            <View style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
            }}>
                <NewscardHolder navigation={navigation} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111111",
        display: 'flex',
        flexDirection: 'column',
        color: "white",
    },

    titleText: {
        color: "white",
        marginLeft: 8,
        fontSize: 30,
        fontFamily: "Manrope-Bold"
    },

    scrollNavActive: {
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 15,
        lineHeight: 30,
        fontSize: 22,
        color: "#ffffff",
        fontFamily: "Manrope-Bold"
    },

    scrollNav: {
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 15,
        lineHeight: 30,
        fontSize: 15,
        color: "#ffffffb3",
        fontFamily: "Manrope-Regular"
    }
})

export default Welcome