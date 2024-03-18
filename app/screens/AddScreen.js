import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SafeScreen from "../components/SafeScreen";
import AppTextInput from "../components/AppTextInput";
import defaultStyles from "../config/defaultStyles";

const AddScreen = ({ handleAddTrap, closeModal }) => {
    const validationSchema = Yup.object().shape({
        id: Yup.string().required().min(3).max(10).label("ID"),
        name: Yup.string().required().min(3).max(30).label("Name"),
        latitude: Yup.number()
            .typeError("Latitude must be a number")
            .label("Latitude"),
        longitude: Yup.number()
            .typeError("Longitude must be a number")
            .label("Longitude"),
    });

    const addLocation = async (setFieldValue) => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return;
        }
        const currentLocation = await Location.getCurrentPositionAsync();
        setFieldValue("latitude", currentLocation.coords.latitude);
        setFieldValue("longitude", currentLocation.coords.longitude);
    };

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
                    <MaterialCommunityIcons name="close" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <Formik
                    initialValues={{
                        id: "",
                        name: "",
                        latitude: "",
                        longitude: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({
                        values,
                        handleChange,
                        setFieldValue,
                        handleSubmit,
                        errors,
                    }) => (
                        <>
                            <View>
                                <AppTextInput
                                    icon="shield"
                                    autoCorrect={false}
                                    placeholder="ID"
                                    onChangeText={handleChange("id")}
                                />
                                {errors.id && (
                                    <Text style={styles.errorText}>
                                        {errors.id}
                                    </Text>
                                )}
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
                                <AppTextInput
                                    icon="latitude"
                                    autoCorrect={false}
                                    placeholder="Latitude"
                                    onChangeText={handleChange("latitude")}
                                    value={values.latitude.toString()}
                                />
                                {errors.latitude && (
                                    <Text style={styles.errorText}>
                                        {errors.latitude}
                                    </Text>
                                )}
                                <AppTextInput
                                    icon="longitude"
                                    autoCorrect={false}
                                    placeholder="Longitude"
                                    onChangeText={handleChange("longitude")}
                                    value={values.longitude.toString()}
                                />
                                {errors.longitude && (
                                    <Text style={styles.errorText}>
                                        {errors.longitude}
                                    </Text>
                                )}
                                <TouchableOpacity
                                    onPress={() => addLocation(setFieldValue)}
                                    activeOpacity={0.6}
                                    style={styles.locationButton}
                                >
                                    <Text style={styles.buttonText}>
                                        Include Location
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View>
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
        paddingTop: 50,
        paddingHorizontal: 20,
        height: "80%",
        justifyContent: "space-between",
    },
    errorText: {
        marginLeft: 5,
        color: defaultStyles.colors.red,
        ...defaultStyles.defaultFont,
    },
    locationButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 54,
        marginTop: 60,
        marginBottom: 15,
        borderRadius: 27,
        backgroundColor: defaultStyles.colors.blue,
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
