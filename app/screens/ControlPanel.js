import { View, StyleSheet, Text, Modal, Platform } from "react-native";
import { useState } from "react";
import Constants from "expo-constants";
import MainNavBar from "../components/MainNavBar";
import ViewOptions from "../components/ViewOptions";
import BluetoothStatus from "../components/BluetoothStatus";
import TrapTiles from "../components/TrapTiles";
import defaultStyles from "../config/defaultStyles";

const ControlPanel = () => {
    // Dummy data to be removed
    const initialTraps = [
        { id: 1, name: "Trap 1", status: "Inactive" },
        { id: 2, name: "Trap 2", status: "Inactive" },
        { id: 3, name: "Trap 3", status: "Active" },
    ];
    // State variable to store traps
    const [traps, setTraps] = useState(initialTraps);
    const handleAddTrap = (trap) => {
        const newTrap = {
            id: initialTraps.length + 1,
            name: trap.name,
            status: "Inactive",
        };
        const updatedTraps = [...traps, newTrap];
        setTraps(updatedTraps);
    };

    // State variable to store the selected view
    const [view, setView] = useState("grid");

    const [command, setCommand] = useState(false);
    const sendData = (data) => {
        console.log(data);
        setCommand(data);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Control Panel</Text>
            </View>
            <View style={styles.optionsContainer}>
                <ViewOptions onPress={(value) => setView(value)} view={view} />
                <BluetoothStatus command={command} />
            </View>
            <TrapTiles view={view} traps={traps} sendData={sendData} />
            <MainNavBar handleAddTrap={handleAddTrap} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        height: "100%",
        backgroundColor: defaultStyles.colors.lightgrey,
    },
    headerContainer: {
        width: "100%",
        alignItems: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: defaultStyles.colors.white,

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
    },
    headerText: {
        ...defaultStyles.header,
    },
});

export default ControlPanel;
