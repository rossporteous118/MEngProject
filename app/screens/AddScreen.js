import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SafeScreen from "../components/SafeScreen";
import AppTextInput from "../components/AppTextInput";
import defaultStyles from "../config/defaultStyles";

const AddScreen = ({ closeModal }) => {
    return (
        <SafeScreen>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Add Trap</Text>
                <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButton}
                >
                    <MaterialCommunityIcons name="close" size={35} />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <AppTextInput
                    icon="tag"
                    autoCorrect={false}
                    placeholder="Name"
                />
            </View>
        </SafeScreen>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
    },
    header: {
        ...defaultStyles.header,
    },
    closeButton: {
        position: "absolute",
        top: 5,
        right: 20,
    },
    inputContainer: {
        margin: 20,
    },
});

export default AddScreen;
