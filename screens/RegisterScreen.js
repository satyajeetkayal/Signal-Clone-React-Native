import React, {useLayoutEffect ,useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text,Image } from 'react-native-elements';
import { auth } from '../firebase';
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = ({navigation}) => {

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
   const [profilePic, setProfilePic] = useState();


 const getPermissions = async () => {
    if (Platform.OS !== "web") {
        const {
            status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("We need permission to access your camera ");
        }
    }
    pickImage();
};

const pickImage = async () => {
    try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });
        if (!result.cancelled) {
            setProfilePic(result.uri);
        }
    } catch (error) {
        console.log("Error @pickImage:", error);
    }
};

   const register = () =>{

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) =>{
        authUser.user.updateProfile({
            displayName: name,
            photoURL: profilePic || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
        })
    })
    .catch((error)=> alert(error.message));

   };

   useLayoutEffect (()=>{
    navigation.setOptions({
        headerBackTitle:"Login",
    })
   },[navigation]);

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <StatusBar style="light"/>
                    <Text h3 style={{marginBottom: 50}}>Create a Signal Account</Text>

                    <View style={styles.profileImage}>
					{!profilePic ? (
						<AntDesign
							name="plus"
							size={24}
							color="#FFFF"
							onPress={getPermissions}
						/>
					) : (
						<Image
							source={{ uri: profilePic }}
							style={{ width: 100, height: 100 }}
							onPress={getPermissions}
						/>
					)}
				</View>

                <View style={styles.inputContainer}>
                    <Input placeholder="Full Name" 
                    autoFocus type="text" 
                     value={name}
                    onChangeText={(text)=> setName(text)}/>

                    <Input placeholder="Email" 
                       value={email}
                    onChangeText={(text)=> setEmail(text)}/>

                    <Input placeholder="Password"
                    secureTextEntry 
                    value={password}
                    onChangeText={(text)=> setPassword(text)}
                    onSubmitEditing={register}/>

                    {/* <Input placeholder="Profile Picture URL (optional)"
                    value={imageUrl}
                    onChangeText={(text)=> setImageUrl(text)}
                    onSubmitEditing={register}/> */}

                 </View>
                    <Button containerStyle={styles.button} raised title="Register" onPress={register} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{

    flex:1, 
    alignItems:'center',
    justifyContent:'center',
    padding: 10,
    backgroundColor:"white"

    },
    inputContainer:{
        width:300
    },
    button:{
    width:200,
    marginTop:10
    },
    profileImage: {
		backgroundColor: "#2c6bed",
		borderRadius: 40,
		height: 80,
		width: 80,
		marginTop: -20,
		marginBottom: 10,
		overflow: "hidden",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},
})
