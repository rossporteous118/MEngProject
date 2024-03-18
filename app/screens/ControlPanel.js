import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BleManager } from "react-native-ble-plx";
import { btoa } from "react-native-quick-base64";
import Constants from "expo-constants";
import MainNavBar from "../components/MainNavBar";
import ViewOptions from "../components/ViewOptions";
import TrapTiles from "../components/TrapTiles";
import defaultStyles from "../config/defaultStyles";

const bleManager = new BleManager();
// BLE services
const TRAP_UUID = "3fefbcb1-e7b1-4d14-8252-135c94a4f0cf";
// BLE characteristics
const TOGGLE_TRAP_UUID = "aff35ec3-73fc-44dd-bd28-9da6c772cdc1";

const ControlPanel = () => {
    // Tracks BLE connection status
    const [connectionStatus, setConnectionStatus] = useState("Searching...");
    // Style object
    const styles = StyleSheet.create({
        container: {
            flex: 0,
            height: "100%",
            backgroundColor: defaultStyles.colors.lightgrey,
        },
        headerContainer: {
            width: "100%",
            alignItems: "center",
            paddingTop: Constants.statusBarHeight,
            backgroundColor: defaultStyles.colors.white,

            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 2,
        },
        optionsContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
        },
        headerText: {
            ...defaultStyles.header,
        },
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

    // Dummy data to be removed
    const initialTraps = [
        {
            id: 232,
            name: "Trap 1",
            status: "Inactive",
            latitude: 27.38955307006836,
            longitude: -3.36949636064336,
        },
        {
            id: 78,
            name: "Trap 2",
            status: "Inactive",
            latitude: 27.38955307006836,
            longitude: -3.36949636064336,
        },
        {
            id: 659,
            name: "Trap 3",
            status: "Active",
            latitude: 27.38955307006836,
            longitude: -3.36949636064336,
        },
    ];

    // State variable to store traps
    const [traps, setTraps] = useState(initialTraps);
    const handleAddTrap = (trap) => {
        const newTrap = {
            id: trap.id,
            name: trap.name,
            status: "Inactive",
            latitude: trap.latitude,
            longitude: trap.longitude,
        };
        const updatedTraps = [...traps, newTrap];
        setTraps(updatedTraps);
    };

    // State variable to store the selected view
    const [view, setView] = useState("grid");

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

    // Write data to Pico and update traps
    const writeData = async (command) => {
        try {
            const characteristic =
                await bleManager.writeCharacteristicWithResponseForDevice(
                    deviceID,
                    trapService,
                    toggleCharacteristic,
                    btoa(command)
                );
            if (characteristic) {
                console.log("Data sent to characteristic");
            }
        } catch (error) {
            console.error("Error writing data to characteristic:", error);
        }
    };

    const updateStatus = (command) => {
        const [commandText, trapID] = command.split("-");
        const updatedTraps = traps.map((trap) => {
            if (trap.id == trapID) {
                const updatedStatus =
                    commandText === "SET" ? "Active" : "Inactive";
                return { ...trap, status: updatedStatus };
            }
            return trap;
        });
        setTraps(updatedTraps);
    };

    // Begin searching for devices on app launch
    useEffect(() => {
        searchForDevice();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Control Panel</Text>
            </View>
            <View style={styles.optionsContainer}>
                <ViewOptions onPress={(value) => setView(value)} view={view} />
                <View style={styles.statusContainer}>
                    <MaterialCommunityIcons
                        name="bluetooth"
                        size={20}
                        color="white"
                    />
                    <Text style={styles.statusText}>{connectionStatus}</Text>
                </View>
            </View>
            <TrapTiles
                view={view}
                traps={traps}
                connectionStatus={connectionStatus}
                writeData={writeData}
                updateStatus={updateStatus}
            />
            <MainNavBar handleAddTrap={handleAddTrap} />
        </View>
    );
};

export default ControlPanel;
