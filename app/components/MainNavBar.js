import { View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useState } from "react";
import { MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import AddScreen from "../screens/AddScreen";
import HelpScreen from "../screens/HelpScreen";
import defaultStyles from "../config/defaultStyles";

const MainNavBar = ({ handleAddTrap }) => {
    // State variables to control modals
    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setHelpModalVisible(true)}
                >
                    <FontAwesome6 name="question" size={30} color="black" />
                </TouchableOpacity>
                <View style={styles.borderCircle}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => setAddModalVisible(true)}
                    >
                        <View style={styles.addButton}>
                            <FontAwesome6 name="add" size={30} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <MaterialIcons name="settings" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <Modal visible={addModalVisible} animationType="slide">
                <AddScreen
                    handleAddTrap={handleAddTrap}
                    closeModal={() => setAddModalVisible(false)}
                />
            </Modal>
            <Modal visible={helpModalVisible} animationType="slide">
                <HelpScreen closeModal={() => setHelpModalVisible(false)} />
            </Modal>
        </>
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
        height: 100,
        paddingBottom: 20,
        paddingHorizontal: 40,
        backgroundColor: defaultStyles.colors.white,

        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    borderCircle: {
        top: -20,
        left: 5,
        height: 100,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: defaultStyles.colors.white,
        borderRadius: 100,
    },
    addButton: {
        height: 75,
        width: 75,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: defaultStyles.colors.blue,
        borderRadius: 100,
    },
});

export default MainNavBar;
