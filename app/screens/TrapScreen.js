import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SafeScreen from "../components/SafeScreen";
import defaultStyles from "../config/defaultStyles";

const TrapScreen = ({ trap, closeModal, writeData, updateStatus }) => {
    // Set display icon
    const icon = trap.status === "Active" ? "lock-open" : "lock";
    // Set confirmtion message
    const command = trap.status === "Active" ? "RELEASE" : "SET";

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
                            `Are you sure you want to ${command} ${trap.name}`,
                            [
                                {
                                    text: "YES",
                                    onPress: () => {
                                        writeData(`${command}-${trap.id}`);
                                    },
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
                        size={60}
                        color={defaultStyles.colors.white}
                    />
                </TouchableOpacity>

                <View style={styles.textContainer}>
                    <View style={styles.textRow}>
                        <Text style={styles.typeCell}>ID:</Text>
                        <Text style={styles.textCell}>{trap.id}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.typeCell}>Name:</Text>
                        <Text style={styles.textCell}>{trap.name}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.typeCell}>Status:</Text>
                        <Text style={styles.textCell}>{trap.status}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.typeCell}>Latitude:</Text>
                        <Text style={styles.textCell}>{trap.latitude}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.typeCell}>Longitude:</Text>
                        <Text style={styles.textCell}>{trap.longitude}</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() =>
                            Alert.alert(
                                "Important!",
                                `Confirm the desired operation was successful.`,
                                [
                                    {
                                        text: "YES",
                                        onPress: () => {
                                            updateStatus(
                                                `${command}-${trap.id}`
                                            ),
                                                closeModal();
                                        },
                                    },
                                    { text: "NO" },
                                ]
                            )
                        }
                        activeOpacity={0.6}
                        style={styles.confirmButton}
                    >
                        <Text style={styles.buttonText}>Confirm Operation</Text>
                    </TouchableOpacity>
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
        height: "90%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        width: 200,
        backgroundColor: defaultStyles.colors.blue,
        borderRadius: 100,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    textRow: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    typeCell: {
        flex: 1,
        fontWeight: "600",
        fontSize: 18,
        ...defaultStyles.defaultFont,
    },
    textCell: {
        flex: 2,
        fontSize: 18,
        ...defaultStyles.defaultFont,
    },
    buttonContainer: {
        width: "100%",
        marginBottom: 50,
    },
    confirmButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 54,
        marginBottom: 15,
        borderRadius: 27,
        backgroundColor: defaultStyles.colors.green,
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
