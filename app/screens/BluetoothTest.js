import { useState, useEffect, useRef } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { btoa, atob } from "react-native-quick-base64";

const bleManager = new BleManager();

// Services
const TRAP_UUID = "3fefbcb1-e7b1-4d14-8252-135c94a4f0cf";
// Characteristics
const TOGGLE_TRAP_UUID = "aff35ec3-73fc-44dd-bd28-9da6c772cdc1";

const TestPage = (command) => {
    const [deviceID, setDeviceID] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("Searching...");

    const [trapService, setTrapService] = useState(null);
    const [toggleCharacteristic, setToggleCharacteristic] = useState(null);

    const deviceRef = useRef(null);

    // Search and connect to device
    const searchForDevice = () => {
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error);
                setConnectionStatus("Error searching for devices");
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
                // Find and set toggle characteristic
                let characteristic = characteristics.find(
                    (characteristic) => characteristic.uuid == TOGGLE_TRAP_UUID
                );
                if (characteristic)
                    setToggleCharacteristic(characteristic.uuid);
            })
            .catch((error) => {
                console.log(error);
                setConnectionStatus("Error in Connection");
            });
    };

    // Write data to characteristic
    const writeData = async () => {
        try {
            const characteristic =
                await bleManager.writeCharacteristicWithResponseForDevice(
                    deviceID,
                    trapService,
                    toggleCharacteristic,
                    btoa(command)
                );
            console.log(command);
            if (characteristic) console.log("Data sent to characteristic");
        } catch (error) {
            console.error("Error writing data to characteristic:", error);
        }
    };

    // Begin search at beginning
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
                setDevice(null);
                setDeviceID(null);
                setConnectionStatus("Disconnected");
                console.log("Disconnected device");
                if (deviceRef.current) {
                    setConnectionStatus("Reconnecting...");
                    connectToDevice(deviceRef.current)
                        .then(() => setConnectionStatus("Connected"))
                        .catch((error) => {
                            console.log("Reconnection failed: ", error);
                            setConnectionStatus("Reconnection failed");
                        });
                }
            }
        );
        return () => subscription.remove();
    }, [deviceID]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>BLUETOOTH TESTING</Text>
            <TouchableOpacity
                onPress={writeData}
                activeOpacity={0.6}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Send data</Text>
            </TouchableOpacity>
            <Text>{connectionStatus}</Text>
            {/* <Text>{trapService}</Text>
            <Text>{toggleCharacteristic}</Text> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 120,
        padding: 20,
        justifyConent: "center",
        alignItems: "center",
    },
    header: {
        marginBottom: 100,
        fontSize: 30,
        fontFamily: "Avenir",
        fontWeight: "600",
        color: "dodgerblue",
    },
    button: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        borderRadius: 10,
        backgroundColor: "dodgerblue",
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "Avenir",
        fontWeight: "600",
        color: "white",
    },
});

export default TestPage;
