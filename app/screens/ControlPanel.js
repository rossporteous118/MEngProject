import { View, StyleSheet, Text, Platform } from "react-native";
import { useState } from "react";
import Constants from "expo-constants";
import MainNavBar from "../components/MainNavBar";
import ViewOptions from "../components/ViewOptions";
import TrapTiles from "../components/TrapTiles";
import colors from "../config/colors";

const ControlPanel = () => {
    // Dummy data to be removed
    const traps = [
        { id: 1, name: "Trap 1", status: "Active" },
        { id: 2, name: "Trap 2", status: "Inactive" },
        { id: 3, name: "Trap 3", status: "Active" },
        { id: 4, name: "Trap 4", status: "Inactive" },
    ];

    const [view, setView] = useState("grid");
    const gridPress = () => setView("grid");
    const listPress = () => setView("list");

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Control Panel</Text>
            </View>
            <ViewOptions
                handleGridPress={gridPress}
                handleListPress={listPress}
                view={view}
            />
            <TrapTiles view={view} traps={traps} />
            <MainNavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        height: "100%",
        backgroundColor: colors.lightgrey,
    },
    headerContainer: {
        width: "100%",
        alignItems: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.white,

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    headerText: {
        paddingVertical: 10,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        fontSize: 24,
        fontWeight: "700",
    },
});

export default ControlPanel;
