import React, { useState } from "react";
import { router } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { useSession } from "@/context/SessionContext";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo

const Home: React.FC = () => {
    const { signOut, user, accountInfo, fetchAccountInfo } = useSession();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        fetchAccountInfo();
    };



    return (
        <View style={styles.maincontainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>BancoXYZ</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.greeting}>Olá, {user.name}!</Text>
                    <View style={styles.firstContainer}>
                        <Text style={styles.balanceLabel}>Seu saldo:{" "}</Text>
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balanceText}>
                                
                                {isVisible
                                    ? `${accountInfo.currency}: ${parseFloat(accountInfo.accountBalance.toString()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                    : "********"}
                            </Text>
                            <TouchableOpacity
                                onPress={toggleVisibility}
                                style={styles.eyeButton}
                            >
                                <Ionicons
                                    name={isVisible ? "eye-off" : "eye"}
                                    size={24}
                                    color="#ECDFCC"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.secondContainer}>
                        <Pressable onPress={() => router.push("/NewTransfer")}>
                            <Text style={styles.secondContainerText}>Nova Transferência</Text>
                        </Pressable>
                    </View>
                    <View style={styles.thirdContainer}>
                        <Pressable onPress={() => router.push("/TransferList")} >
                            <Text style={styles.thirdContainerText}>Lista de Transferências</Text>
                        </Pressable>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.logoutButton}
                            onPress={signOut}
                        >
                            <Text style={styles.logoutButtonText}>Sair</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#181C14",
    },
    container: {
        flex: 1,
        width: "80%",
        backgroundColor: "#3C3D37",
    },
    header: {
        height: 100,
        backgroundColor: "#697565",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        color: "#ECDFCC",
        fontSize: 32,
        fontWeight: "bold",
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    greeting: {
        color: "#ECDFCC",
        textAlign: "center",
        fontSize: 24,
        marginBottom: 20,
    },
    firstContainer: {
        marginTop: 20,
        backgroundColor: "#697565",
        padding: 20,
        borderRadius: 10,
    },
    balanceContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal:0,
        alignItems: "center",
        marginVertical: 10,
    },
    balanceText: {
        fontSize: 24,
        color: "#ECDFCC",
        fontWeight: "bold",
        marginRight: 10,
    },
    balanceLabel: {
        fontSize: 18,
        color: "#ECDFCC",
        fontWeight: "bold",
    },
    eyeButton: {
        backgroundColor: "#3C3D37",
        borderRadius: 100,
        padding: 8,
    },
    buttonContainer: {
        marginTop: 20,
        width: "100%",
    },

    secondContainer: {
        marginTop: 20,
        backgroundColor: "#697565",
        padding: 20,
        borderRadius: 10,
    },
    secondContainerText: {
        fontSize: 18,
        color: "#ECDFCC",
        fontWeight: "bold",
        textAlign: "center",
    },
    thirdContainer: {
        marginTop: 20,
        backgroundColor: "#ECDFCC",
        padding: 20,
        borderRadius: 10,
    },
    thirdContainerText: {
        fontSize: 18,
        color: "#3C3D37",
        fontWeight: "bold",
        textAlign: "center",
    },
    logoutButton: {
        justifyContent: "center",
        backgroundColor: "#FF3B30",
        paddingVertical: 6,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Home;
