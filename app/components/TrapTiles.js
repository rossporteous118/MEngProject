import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const TrapTiles = ({ view, traps }) => {
    if (view === "grid") {
        // Grid view implementation
        return (
            <View style={styles.gridViewContainer}>
                {traps.map((trap, index) => (
                    <TouchableHighlight
                        key={index}
                        onPress={() => console.log(trap.name)}
                        underlayColor={colors.lightgrey}
                        style={styles.gridViewTouchable}
                    >
                        <View style={styles.gridViewTile}>
                            {trap.status === "Active" && (
                                <MaterialCommunityIcons name="lock" size={35} />
                            )}
                            {trap.status === "Inactive" && (
                                <MaterialCommunityIcons
                                    name="lock-open"
                                    size={35}
                                />
                            )}
                            <View style={styles.gridViewTextContainer}>
                                <Text style={styles.gridViewName}>
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
            </View>
        );
    } else {
        // List view implementation
        return (
            <View style={styles.listViewContainer}>
                {traps.map((trap, index) => (
                    <TouchableHighlight
                        key={index}
                        onPress={() => console.log(trap.name)}
                        underlayColor={colors.lightgrey}
                        style={styles.listViewTouchable}
                    >
                        <View style={styles.listViewTile}>
                            {trap.status === "Active" && (
                                <MaterialCommunityIcons name="lock" size={35} />
                            )}
                            {trap.status === "Inactive" && (
                                <MaterialCommunityIcons
                                    name="lock-open"
                                    size={35}
                                />
                            )}
                            <View style={styles.listViewTextContainer}>
                                <Text style={styles.listViewName}>
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
            </View>
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
    },
    gridViewTouchable: {
        justifyContent: "center",
        width: "48%",
        height: 75,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: colors.white,

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

        shadowOffset: { width: 10, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    listViewTouchable: {
        justifyContent: "center",
        width: "100%",
        height: 75,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: colors.white,
    },
    listViewTile: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    listViewTextContainer: {
        marginLeft: 10,
    },
    listViewName: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 3,
    },
});

export default TrapTiles;
