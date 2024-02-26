import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BleManager } from "react-native-ble-plx";
import { btoa } from "react-native-quick-base64";
import defaultStyles from "../config/defaultStyles";

const bleManager = new BleManager();

// BLE services
const TRAP_UUID = "3fefbcb1-e7b1-4d14-8252-135c94a4f0cf";
// BLE characteristics
const TOGGLE_TRAP_UUID = "aff35ec3-73fc-44dd-bd28-9da6c772cdc1";

const BluetoothStatus = () => {
    // Style object
    const [connectionStatus, setConnectionStatus] = useState("Searching...");
    const styles = StyleSheet.create({
        statusContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 35,
            paddingLeft: 8,
            borderRadius: 10,
            backgroundColor:
                connectionStatus == "Connected"
                    ? defaultStyles.colors.green
                    : defaultStyles.colors.orange,
        },
        statusText: {
            marginRight: 10,
            color: defaultStyles.colors.white,
            ...defaultStyles.defaultFont,
            fontWeight: "600",
        },
    });

    // BLE state variables
    const [deviceID, setDeviceID] = useState(null);
    const [trapService, setTrapService] = useState(null);
    const [toggleCharacteristic, setToggleCharacteristic] = useState(null);
    const deviceRef = useRef(null);

    // Search and connect to device
    const searchForDevice = () => {
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error);
                setConnectionStatus("Connection error");
                return;
            }
            if (device.name === "Modem") {
                bleManager.stopDeviceScan();
                setConnectionStatus("Connecting...");
                connectToDevice(device);
            }
        });
    };

    // Performs device connection process
    const connectToDevice = (device) => {
        return device
            .connect()
            .then((device) => {
                setDeviceID(device.id);
                setConnectionStatus("Connected");
                deviceRef.current = device;
                return device.discoverAllServicesAndCharacteristics();
            })
            .then((device) => {
                return device.services();
            })
            .then((services) => {
                // Find and set trap service
                let service = services.find(
                    (service) => service.uuid === TRAP_UUID
                );
                if (service) setTrapService(service.uuid);

                return service.characteristics();
            })
            .then((characteristics) => {
                // Find and set toggle trap characteristic
                let characteristic = characteristics.find(
                    (characteristic) => characteristic.uuid == TOGGLE_TRAP_UUID
                );
                if (characteristic)
                    setToggleCharacteristic(characteristic.uuid);
            })
            .catch((error) => {
                console.log(error);
                setConnectionStatus("Connection error");
            });
    };

    const writeData = async (command) => {
        try {
            const characteristic =
                await bleManager.writeCharacteristicWithResponseForDevice(
                    deviceID,
                    trapService,
                    toggleCharacteristic,
                    btoa("hello")
                );
            if (characteristic) console.log("Data sent to characteristic");
        } catch (error) {
            console.error("Error writing data to characteristic:", error);
        }
    };

    // Begin searching for devices at beginning
    useEffect(() => {
        searchForDevice();
    }, []);

    // Begin search after disconnection
    useEffect(() => {
        const subscription = bleManager.onDeviceDisconnected(
            deviceID,
            (error, device) => {
                if (error) {
                    console.log("Disconnected with error:", error);
                }
                setDeviceID(null);
                setConnectionStatus("Disconnected");
                console.log("Disconnected device");
                if (deviceRef.current) {
                    setConnectionStatus("Reconnecting...");
                    connectToDevice(deviceRef.current)
                        .then(() => setConnectionStatus("Connected"))
                        .catch((error) => {
                            console.log("Reconnection failed: ", error);
                            setConnectionStatus("Connection error");
                        });
                }
            }
        );
        return () => subscription.remove();
    }, [deviceID]);

    return (
        <View style={styles.statusContainer}>
            <MaterialCommunityIcons name="bluetooth" size={20} color="white" />
            <Text style={styles.statusText}>{connectionStatus}</Text>
        </View>
    );
};

export default BluetoothStatus;
