import { TouchableOpacity, Text, StyleSheet } from "react-native";
import defaultStyles from "../config/defaultStyles";

const WelcomeButton = ({ title, onPress, color = "primary" }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.button, { backgroundColor: colors[color] }]}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginBottom: 20,
        height: 60,
        width: "100%",
        borderWidth: 2,
        borderColor: defaultStyles.colors.black,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontFamily: defaultStyles.font,
        fontSize: 20,
        fontWeight: "600",
    },
});

export default WelcomeButton;
