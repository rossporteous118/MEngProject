import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const ViewOptions = ({ handleGridPress, handleListPress, view }) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            marginLeft: 20,
            marginVertical: 15,
            alignItems: "center",
        },
        gridButton: {
            padding: 8,
            backgroundColor: view === "grid" ? colors.blue : colors.white,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
        },
        listButton: {
            padding: 8,
            backgroundColor: view === "list" ? colors.blue : colors.white,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handleGridPress}
                style={styles.gridButton}
            >
                <MaterialCommunityIcons
                    name="view-grid"
                    size={30}
                    color={view === "grid" ? colors.white : colors.black}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleListPress}
                style={styles.listButton}
            >
                <MaterialCommunityIcons
                    name="view-list"
                    size={30}
                    color={view === "list" ? colors.white : colors.black}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ViewOptions;
