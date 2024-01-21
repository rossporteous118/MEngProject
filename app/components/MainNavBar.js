import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome6,
} from "@expo/vector-icons";
import colors from "../config/colors";

const MainNavBar = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <MaterialCommunityIcons name="help" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.borderCircle}>
                <View style={styles.addButton}>
                    <TouchableOpacity onPress={() => console.log("adding")}>
                        <FontAwesome6 name="add" size={35} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity>
                <MaterialIcons name="settings" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 100,
        paddingBottom: 20,
        paddingHorizontal: 40,
        backgroundColor: colors.white,

        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    addButton: {
        height: "80%",
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: colors.blue,
        borderRadius: 80,
    },
    borderCircle: {
        height: 100,
        width: 100,
        top: -20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 80,
    },
});

export default MainNavBar;
