import React, { useState } from "react";
// import { router } from "expo-router";
// import auth from "@react-native-firebase/auth";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "@/firebaseConfig";

const SignUpScreen = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const handleSignUp = async () => {
  //     if (email && password) {
  //       try {
  //         await auth().createUserWithEmailAndPassword(email, password);
  //         Alert.alert("Account created successfully");
  //         router.push("/home");
  //       } catch (err) {
  //         Alert.alert("Error");
  //       }
  //     } else {
  //       Alert.alert("Error", "Please fill in all fields");
  //     }
  //   };

  const handleSignUp = async () => {
    try {
      console.log("Trying to getAuth");
      const auth = getAuth(app);
      console.log("Got the auth");
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("completed signup");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error");
      console.log("Error sigh.", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.topSection}>
            <View style={styles.imageOuterBorder}>
              <View style={styles.imageBorder}>
                <Image
                  source={require("@/assets/images/loginScreenImage.png")}
                  style={styles.image}
                />
              </View>
            </View>
            <Text style={styles.title}>Sign Up</Text>
          </View>

          <ScrollView
            contentContainerStyle={[
              styles.bottomSection,
              isInputFocused && styles.bottomSectionFocused,
            ]}
          >
            <View style={styles.inputWrapper}>
              <Text style={styles.inputText}>Name</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Hassan Alabdulal"
                  style={styles.input}
                  keyboardType="default"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </View>
              <Text style={styles.inputText}>Email</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="mail-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="hassan@lazywait.com"
                  style={styles.input}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </View>
              <Text style={styles.inputText}>Password</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="********"
                  style={styles.input}
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </View>
            </View>

            <TouchableOpacity onPress={handleSignUp} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6A028",
  },
  topSection: {
    backgroundColor: "#F6A028",
    width: "100%",
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
  },
  bottomSectionFocused: {
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  imageBorder: {
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 15,
  },
  imageOuterBorder: {
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 20,
    marginTop: 20,
  },
  image: {
    width: 145,
    height: 145,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 15,
  },
  inputWrapper: {
    width: "100%",
    alignItems: "center",
  },
  inputText: {
    width: "90%",
    marginLeft: 8,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4FA",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "90%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#F6A028",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  signUpButton: {
    width: "90%",
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 8,
  },
  signUpButtonText: {
    fontSize: 14,
    textDecorationLine: "underline",
    letterSpacing: 1,
  },
});

export default SignUpScreen;
