import { View, StyleSheet, Text, Modal, Platform } from "react-native";
import { useState } from "react";
import Constants from "expo-constants";
import MainNavBar from "../components/MainNavBar";
import ViewOptions from "../components/ViewOptions";
import TrapTiles from "../components/TrapTiles";
import defaultStyles from "../config/defaultStyles";

const ControlPanel = () => {
    // Dummy data to be removed
    const traps = [
        { id: 1, name: "Trap 1", status: "Inactive" },
        { id: 2, name: "Trap 2", status: "Inactive" },
        { id: 3, name: "Trap 3", status: "active" },
    ];

    const [view, setView] = useState("grid");

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Control Panel</Text>
            </View>
            <ViewOptions onPress={(value) => setView(value)} view={view} />
            <TrapTiles view={view} traps={traps} />
            <MainNavBar />
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
    headerText: {
        ...defaultStyles.header,
    },
});

export default ControlPanel;
