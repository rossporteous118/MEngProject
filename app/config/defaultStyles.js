import { Platform } from "react-native";
import colors from "./colors";

export default {
    colors,
    header: {
        paddingVertical: 10,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        fontSize: 24,
        fontWeight: "700",
    },
    defaultFont: {
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
};
