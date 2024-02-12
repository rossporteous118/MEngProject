import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SafeScreen from "../components/SafeScreen";
import defaultStyles from "../config/defaultStyles";

const TrapScreen = ({ trap, sendData, closeModal }) => {
    // Set display icon
    const icon = trap.status === "Active" ? "lock" : "lock-open";
    // Set confirmtion message
    const command = trap.status === "Active" ? "release" : "set";

    return (
        <SafeScreen>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{trap.name}</Text>
                <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButton}
                >
                    <MaterialCommunityIcons name="close" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(
                            "Warning!",
                            `Are you sure you want to ${command} ${trap.name}.`,
                            [
                                {
                                    text: "YES",
                                    onPress: () =>
                                        sendData(`${command}-${trap.name}`),
                                },
                                { text: "NO" },
                            ]
                        )
                    }
                    activeOpacity={0.6}
                    style={styles.iconContainer}
                >
                    <MaterialCommunityIcons
                        name={icon}
                        size={45}
                        color={defaultStyles.colors.white}
                    />
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={closeModal}
                        activeOpacity={0.6}
                        style={styles.cancelButton}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
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
        right: 20,
    },
    mainContainer: {
        paddingTop: 50,
        paddingHorizontal: 20,
        height: "80%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 150,
        width: 150,
        backgroundColor: defaultStyles.colors.blue,
        borderRadius: 75,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    buttonContainer: {
        width: "100%",
    },
    cancelButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 54,
        borderRadius: 27,
        backgroundColor: defaultStyles.colors.red,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600",
        color: defaultStyles.colors.white,
        ...defaultStyles.defaultFont,
    },
});

export default TrapScreen;