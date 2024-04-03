import { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    Modal,
    Alert,
    TouchableHighlight,
    StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TrapScreen from "../screens/TrapScreen";
import colors from "../config/colors";
import defaultStyles from "../config/defaultStyles";

const TrapTiles = ({
    view,
    traps,
    connectionStatus,
    writeData,
    updateStatus,
}) => {
    const [trapModalVisible, setTrapModalVisible] = useState(false);
    const [selectedTrap, setSelectedTrap] = useState(null);

    // Only allow trap select if modem is connected.
    const handleTrapPress = (trap) => {
        if (connectionStatus != "Connected") {
            Alert.alert("Please connect to a modem before modifying any trap");
        } else {
            setTrapModalVisible(true);
            setSelectedTrap(trap);
        }
    };

    if (view === "grid") {
        // Grid view implementation
        return (
            <>
                <ScrollView contentContainerStyle={styles.gridViewContainer}>
                    {traps.map((trap, index) => (
                        <TouchableHighlight
                            key={index}
                            onPress={() => handleTrapPress(trap)}
                            underlayColor={colors.lightgrey}
                            style={styles.gridViewTouchable}
                        >
                            <View style={styles.gridViewTile}>
                                {trap.status === "Active" && (
                                    <MaterialCommunityIcons
                                        name="lock"
                                        size={35}
                                    />
                                )}
                                {trap.status === "Inactive" && (
                                    <MaterialCommunityIcons
                                        name="lock-open"
                                        size={35}
                                    />
                                )}
                                <View style={styles.gridViewTextContainer}>
                                    <Text
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                        style={styles.gridViewName}
                                    >
                                        {trap.name}
                                    </Text>
                                    <Text
                                        style={{
                                            color:
                                                trap.status === "Active"
                                                    ? colors.green
                                                    : colors.red,
                                        }}
                                    >
                                        {trap.status}
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    ))}
                </ScrollView>
                <Modal visible={trapModalVisible} animationType="slide">
                    <TrapScreen
                        trap={selectedTrap}
                        closeModal={() => setTrapModalVisible(false)}
                        writeData={writeData}
                        updateStatus={updateStatus}
                    />
                </Modal>
            </>
        );
    } else {
        // List view implementation
        return (
            <>
                <ScrollView contentContainerStyle={styles.listViewContainer}>
                    {traps.map((trap, index) => (
                        <TouchableHighlight
                            key={index}
                            onPress={() => handleTrapPress(trap)}
                            underlayColor={colors.lightgrey}
                            style={styles.listViewTouchable}
                        >
                            <View style={styles.listViewTile}>
                                {trap.status === "Active" && (
                                    <MaterialCommunityIcons
                                        name="lock"
                                        size={35}
                                    />
                                )}
                                {trap.status === "Inactive" && (
                                    <MaterialCommunityIcons
                                        name="lock-open"
                                        size={35}
                                    />
                                )}
                                <View style={styles.listViewTextContainer}>
                                    <Text
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                        style={styles.listViewName}
                                    >
                                        {trap.name}
                                    </Text>
                                    <Text
                                        style={{
                                            color:
                                                trap.status === "Active"
                                                    ? colors.green
                                                    : colors.red,
                                        }}
                                    >
                                        {trap.status}
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    ))}
                </ScrollView>
                <Modal visible={trapModalVisible} animationType="slide">
                    <TrapScreen
                        trap={selectedTrap}
                        closeModal={() => setTrapModalVisible(false)}
                        writeData={writeData}
                        updateStatus={updateStatus}
                    />
                </Modal>
            </>
        );
    }
};

const styles = StyleSheet.create({
    // Grid view styles
    gridViewContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    gridViewTouchable: {
        justifyContent: "center",
        width: "48%",
        height: 75,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: defaultStyles.colors.white,

        shadowOffset: { width: 5, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    gridViewTile: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    gridViewTextContainer: {
        width: "70%",
        marginLeft: 10,
    },
    gridViewName: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 3,
    },

    // List view styles
    listViewContainer: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    listViewTouchable: {
        justifyContent: "center",
        width: "100%",
        height: 75,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: defaultStyles.colors.white,

        shadowOffset: { width: 10, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    listViewTile: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    listViewTextContainer: {
        width: "90%",
        marginLeft: 10,
    },
    listViewName: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 3,
    },
});

export default TrapTiles;
