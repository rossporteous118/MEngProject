import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/defaultStyles";

const ViewOptions = ({ onPress, view }) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            marginVertical: 15,
            alignItems: "center",
        },
        gridButton: {
            padding: 8,
            backgroundColor:
                view === "grid"
                    ? defaultStyles.colors.blue
                    : defaultStyles.colors.white,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
        },
        listButton: {
            padding: 8,
            backgroundColor:
                view === "list"
                    ? defaultStyles.colors.blue
                    : defaultStyles.colors.white,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => onPress("grid")}
                style={styles.gridButton}
            >
                <MaterialCommunityIcons
                    name="view-grid"
                    size={30}
                    color={
                        view === "grid"
                            ? defaultStyles.colors.white
                            : defaultStyles.colors.black
                    }
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPress("list")}
                style={styles.listButton}
            >
                <MaterialCommunityIcons
                    name="view-list"
                    size={30}
                    color={
                        view === "list"
                            ? defaultStyles.colors.white
                            : defaultStyles.colors.black
                    }
                />
            </TouchableOpacity>
        </View>
    );
};

export default ViewOptions;
