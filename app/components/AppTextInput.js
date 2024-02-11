import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/defaultStyles";

const AppTextInput = ({ icon, ...otherProps }) => {
    return (
        <View style={styles.container}>
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
                    size={20}
                    color={defaultStyles.colors.darkgrey}
                    style={styles.icon}
                />
            )}
            <TextInput {...otherProps} style={styles.textInput} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.lightgrey,
        borderRadius: 25,
        flexDirection: "row",
        width: "100%",
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginTop: 3,
        marginRight: 10,
    },
    textInput: {
        width: "100%",
        fontSize: 18,
        ...defaultStyles.defaultFont,
        color: defaultStyles.colors.darkgrey,
    },
});

export default AppTextInput;
