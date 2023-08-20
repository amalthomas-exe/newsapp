import React, { useState, useContext} from 'react'
import newsContext from '../context/newsContext'
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, ScrollView, Image,StatusBar } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import QueryNewsData from '../components/QueryNewsData'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width
const host = "https://newsapi.org/v2";
const apiKey = "fb5b39b60c544a7ebc372594074ab4b0";

const Search = () => {
    const navigation = useNavigation()
    const [queryNews, setQueryNews] = useState([]);
    const context = useContext(newsContext);
    const {setCurrentPage } = context
    const [query, setQuery] = useState("")
    const queryUrl = `${host}/everything?q=${query}&apiKey=${apiKey}&searchIn=title&sortBy=publishedAt&language=en`
    const fetchQueryData = async () => {
        console.log("fetching data")
        const response = await fetch(queryUrl);
        console.log(response)
        const json = await response.json();
        console.log(json.totalResults + " total results")
        setQueryNews(json.articles)
    }
    return (
        <>
        <StatusBar
                backgroundColor="#111111"
                barStyle="light-content"
              />
        <View style={styles.container}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20
            }}>

                <TouchableOpacity onPress={() => {
                    setCurrentPage("home")
                    navigation.goBack()
                }}>
                    <View style={{
                        alignSelf: 'flex-start',
                        padding: 8,
                        borderRadius: 50,
                        backgroundColor: "#303030"
                    }}>
                        <Icon name="arrow-back" size={35} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.titleText} >
                    Search
                </Text>
            </View>
            <View style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextInput style={{
                    backgroundColor: "#303030",
                    width: width / 1.3,
                    borderRadius: 50,
                    paddingHorizontal: 25,
                    marginRight: 10,
                    fontFamily: "Manrope-Regular",
                }}
                    value={query}
                    onChangeText={setQuery}
                    selectionColor='lightgreen'
                    placeholder='Search'
                    placeholderTextColor={"#ffffff8e"}
                />
                <View style={{
                    alignSelf: 'flex-start',
                    padding: 8,
                    borderRadius: 50,
                    backgroundColor: "#303030"
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            fetchQueryData()
                        }}
                    >
                        <Icon name="search" size={30} />
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView style={{
                marginTop: 20,
                padding: 10,
            }}

                contentContainerStyle={{
                    display: 'flex',
                    flexDirection: 'column',

                }}
                showsVerticalScrollIndicator={false}
            >
                {(query.length>0)?(queryNews.length > 0) ? queryNews.map((item, index) => {
                    return (
                        <QueryNewsData
                            key={index}
                            index={index}
                            news={item}
                        />
                    )
                }) :
                    <View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                        <Image
                            style={{
                                width: width / 1.55,
                                height: width / 1.55,
                                objectFit: "contain",
                                alignSelf: 'center',
                            }}
                            source={require('../../assets/images/404.png')}
                        />
                        <Text style={{
                            color: "#ffffff8e",
                            fontFamily: "Manrope-Regular",
                            fontSize: 25,
                            marginTop: 20
                        }}>
                        404 Not Found
                        </Text>
                        <Text style={{
                            color: "#ffffff8e",
                            fontFamily: "Manrope-Regular",
                            fontSize: 15,
                            marginTop: 5,
                            textAlign: 'center',
                            paddingHorizontal:20
                        }}>
                            Keep calm and search again
                        </Text>
                    </View>:<View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                        <Image
                            style={{
                                width: width / 1.65,
                                height: width / 1.65,
                                objectFit: "contain",
                                alignSelf: 'center',
                            }}
                            source={require('../../assets/images/search.png')}
                        />
                        <Text style={{
                            color: "#ffffff8e",
                            fontFamily: "Manrope-Regular",
                            fontSize: 20,
                            marginTop: 10
                        }}>
                        Search for something
                        </Text>
                    </View>

                }
            </ScrollView>
        </View>
        </>
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
        fontSize: 25,
        fontFamily: "Manrope-Bold",
        marginLeft: 10
    },
})

export default Search
