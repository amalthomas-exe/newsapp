import React,{useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import newsContext from '../context/newsContext'
const BottomNavBar = () => {
    const context = useContext(newsContext);
    const {currentPage,setCurrentPage} = context
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center'
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <View style={[style.bottomTabBtn,(currentPage=="home")?style.bottomTabBtnActive:""]}>
                    <Icon name="home" size={30} color={(currentPage=="home")?"black":"white"}/>
                </View>
                <View style={[style.bottomTabBtn, {
                    marginHorizontal: 20
                },(currentPage=="search")?style.bottomTabBtnActive:""]}>
                    <Icon name="search" size={30} color={(currentPage=="search")?"black":"white"}/>
                </View>
                <View style={[style.bottomTabBtn,(currentPage=="bookmark")?style.bottomTabBtnActive:""]}>
                    <Icon name="bookmark" size={30} color={(currentPage=="bookmark")?"black":"white"}/>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    bottomTabBtn: {
        width: 60,
        height: 60,
        borderRadius: 33,
        backgroundColor: "#2b2b2b",
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },

    bottomTabBtnActive:{
        width: 65,
        height: 65,
        backgroundColor:'white'
    }
})

export default BottomNavBar