import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet,ScrollView, Text, View,Button } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { TouchableOpacity } from 'react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';


const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    };

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe;
    }, []);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Signal",
            headerTitleAlign:"left",
            headerStyle:{backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerTintStyle:"black",
            headerLeft: ()=>(
                <View style={{marginLeft: 15}}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                    <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () =>(

                <View style={{flexDirection : "row", justifyContent:'space-between', width:80, marginRight:20}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons onPress={()=> navigation.navigate('AddChat')} name="pencil" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            )

        });
    },[navigation])

   const enterChat =(id, chatName)=>{
       navigation.navigate('Chat',{
           id,
            chatName
       });
   }

    return (
        <View>
            <StatusBar style="black"/>
        <ScrollView style={styles.container}>
            {chats.map(({id, data: {chatName}}) =>(
                <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
            ))}         
            
        </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
container:{
    height:"100%"
}
})
