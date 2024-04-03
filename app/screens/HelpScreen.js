import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SafeScreen from "../components/SafeScreen";
import defaultStyles from "../config/defaultStyles";

const HelpScreen = ({ closeModal }) => {
    const steps = [
        {
            id: 1,
            instruction: "Ensure Bluetooth is enabled on your mobile device.",
        },
        {
            id: 2,
            instruction:
                "Power up the nanomodem. Your mobile device should connect to it automatically via Bluetooth.",
        },
        {
            id: 3,
            instruction:
                "Select the add button located at the bottom of the control panel to add a new trap. Make sure that the ID you enter matches the address on your physical trap.",
        },
        {
            id: 4,
            instruction:
                "Once a new trap has been added, you should be able to view and select it from the control panel.",
        },
        {
            id: 5,
            instruction:
                "To release / set your trap. Select the desired trap from the control panel and press the circular blue button to perform the desired operation.",
        },
        {
            id: 6,
            instruction:
                "Monitor the state of your physical trap and confirm the success or failure of the operation. The status of your trap will be updated accordingly within the app.",
        },
    ];

    return (
        <SafeScreen>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Help Page</Text>
                <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButton}
                >
                    <MaterialCommunityIcons name="close" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <FlatList
                    data={steps}
                    renderItem={({ item }) => (
                        <View style={styles.instructionContainer}>
                            <Text style={styles.index}>{`${item.id}.`}</Text>
                            <Text style={styles.instruction}>
                                {item.instruction}
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                ></FlatList>
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
        height: "100%",
        justifyContent: "space-between",
    },
    instructionContainer: {
        flexDirection: "row",
        marginBottom: 30,
    },
    index: {
        flex: 1,
        fontWeight: "600",
        fontSize: 18,
    },
    instruction: {
        ...defaultStyles.defaultFont,
        flex: 10,
        fontSize: 16,
    },
});

export default HelpScreen;
