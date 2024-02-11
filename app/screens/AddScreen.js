import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SafeScreen from "../components/SafeScreen";
import AppTextInput from "../components/AppTextInput";
import defaultStyles from "../config/defaultStyles";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).max(30).label("Name"),
});

const AddScreen = ({ handleAddTrap, closeModal }) => {
    const handleSubmit = (values) => {
        handleAddTrap(values);
        closeModal();
    };

    return (
        <SafeScreen>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Add Trap</Text>
                <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButton}
                >
                    <MaterialCommunityIcons name="close" size={35} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <Formik
                    initialValues={{ name: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, errors }) => (
                        <>
                            <View>
                                <AppTextInput
                                    icon="tag"
                                    autoCorrect={false}
                                    placeholder="Name"
                                    onChangeText={handleChange("name")}
                                />
                                {errors.name && (
                                    <Text style={styles.errorText}>
                                        {errors.name}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    activeOpacity={0.6}
                                    style={styles.addButton}
                                >
                                    <Text style={styles.buttonText}>Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={closeModal}
                                    activeOpacity={0.6}
                                    style={styles.cancelButton}
                                >
                                    <Text style={styles.buttonText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </SafeScreen>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
    },
    header: {
        ...defaultStyles.header,
    },
    closeButton: {
        position: "absolute",
        right: 20,
    },
    mainContainer: {
        paddingTop: 80,
        paddingHorizontal: 20,
        height: "80%",
        justifyContent: "space-between",
    },
    errorText: {
        marginLeft: 5,
        color: defaultStyles.colors.red,
        ...defaultStyles.defaultFont,
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 54,
        marginBottom: 15,
        borderRadius: 27,
        backgroundColor: defaultStyles.colors.green,
    },
    cancelButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 54,
        borderRadius: 27,
        backgroundColor: defaultStyles.colors.red,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600",
        color: defaultStyles.colors.white,
        ...defaultStyles.defaultFont,
    },
});

export default AddScreen;
