import { ImageBackground, View, StyleSheet } from "react-native";
import WelcomeButton from "../components/WelcomeButton";

const WelcomeScreen = () => {
    return (
        <ImageBackground
            style={styles.background}
            source={require("../assets/water.jpg")}
        >
            <View style={styles.buttonContainer}>
                <WelcomeButton
                    title="Log In"
                    onPress={() => console.log("Log In Tapped")}
                    color="secondary"
                />
                <WelcomeButton
                    title="Sign Up"
                    onPress={() => console.log("Sign Up Tapped")}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonContainer: {
        width: "100%",
        marginBottom: 60,
        paddingHorizontal: 20,
    },
});

export default WelcomeScreen;
