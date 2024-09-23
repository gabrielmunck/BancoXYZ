import React, { useEffect, useState } from "react";
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
    const { isLoggedIn, signOut, user, accountInfo, fetchAccountInfo } = useSession();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => { // Função para alternar a visibilidade do saldo
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
                                testID="toggle-visibility"
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

const colors = {
    text: '#aaf2ff',
    textwhite:'#f0f0f0',
    background:'#101010',
    primary: '#0F4C75',
    secondary:'#1B262C',
    accent: '#3282B8',
};

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        width: "95%",
        backgroundColor: colors.secondary,
    },
    header: {
        height: 120,
        backgroundColor: colors.primary,
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: 20,
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        color: colors.textwhite,
        fontSize: 32,
        fontWeight: "bold",
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    greeting: {
        color: colors.textwhite,
        textAlign: "center",
        fontSize: 24,
        marginBottom: 20,
    },
    firstContainer: {
        marginTop: 20,
        backgroundColor: colors.background,
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
        color: colors.textwhite,
        fontWeight: "bold",
        marginRight: 10,
    },
    balanceLabel: {
        fontSize: 18,
        color: colors.text,
        fontWeight: "bold",
    },
    eyeButton: {
        backgroundColor: colors.secondary,
        borderRadius: 100,
        padding: 8,
    },
    buttonContainer: {
        marginTop: 20,
        width: "100%",
    },

    secondContainer: {
        marginTop: 20,
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 10,
    },
    secondContainerText: {
        fontSize: 18,
        color: colors.textwhite,
        fontWeight: "bold",
        textAlign: "center",
    },
    thirdContainer: {
        marginTop: 20,
        backgroundColor: colors.accent,
        padding: 20,
        borderRadius: 10,
    },
    thirdContainerText: {
        fontSize: 18,
        color: colors.textwhite,
        fontWeight: "bold",
        textAlign: "center",
    },
    logoutButton: {
        maxWidth: "50%",
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: colors.text,
        paddingVertical: 6,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: colors.background,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Home;
