import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import newsContext from '../context/newsContext'
import { useNavigation } from '@react-navigation/native'

const BottomNavBar = () => {
    const navigation = useNavigation()
    const context = useContext(newsContext);
    const { currentPage, setCurrentPage } = context
    return (
        <View style={{
            display: (currentPage==="fullPageNews")?'none':'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 25,
            width: '100%',
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <TouchableOpacity onPress={()=>{
                    setCurrentPage("home")
                    navigation.navigate("Welcome")
                }}>
                    <View style={[style.bottomTabBtn, (currentPage == "home") ? style.bottomTabBtnActive : ""]}>
                        <Icon name="home" size={30} color={(currentPage == "home") ? "black" : "white"} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setCurrentPage("search")
                        navigation.navigate("Search")
                    }}
                >
                    <View style={[style.bottomTabBtn, {
                        marginHorizontal: 10
                    }, (currentPage == "search") ? style.bottomTabBtnActive : ""]}>
                        <Icon name="search" size={30} color={(currentPage == "search") ? "black" : "white"} />
                    </View>
                </TouchableOpacity>
                <View style={[style.bottomTabBtn, (currentPage == "bookmark") ? style.bottomTabBtnActive : ""]}>
                    <Icon name="bookmark" size={30} color={(currentPage == "bookmark") ? "black" : "white"} />
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    bottomTabBtn: {
        width: 55,
        height: 55,
        borderRadius: 33,
        backgroundColor: "#2b2b2b",
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },

    bottomTabBtnActive: {
        width: 60,
        height: 60,
        backgroundColor: 'white'
    }
})

export default BottomNavBar