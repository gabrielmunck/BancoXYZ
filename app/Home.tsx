import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useSession } from "@/context/SessionContext";
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo

const Home: React.FC = () => {
    const { signOut, user, accountInfo, fetchAccountInfo } = useSession();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        fetchAccountInfo();
        
    }

    return (
        <View style={styles.maincontainer}>
            <View style={styles.container}>
                <Text style={styles.title}>BancoXYZ</Text>
                <View style={styles.contentContainer}>
                    <Text style={styles.greeting}>Olá, {user.name}!</Text>

                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceText}>
                            Seu saldo: {isVisible ? `${accountInfo.currency} ${accountInfo.accountBalance}` : '********'}
                        </Text>
                        <TouchableOpacity onPress={toggleVisibility} style={styles.eyeButton}>
                            <Ionicons name={isVisible ? "eye-off" : "eye"} size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <Pressable style={styles.logoutButton} onPress={signOut}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </Pressable>
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
        backgroundColor: "#F5FCFF",
    },
    container: {
        flex: 1,
        width: "80%",
        backgroundColor: "#F5FCFF",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 40,
        marginBottom: 20,
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    greeting: {
        fontSize: 18,
        marginBottom: 20,
    },
    balanceContainer: {
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingRight: 100,
    },
    balanceText: {
        fontSize: 18,
        marginRight: 10,
    },
    eyeButton: {
        padding: 5,
    },
    logoutButton: {
        backgroundColor: "#FF3B30",
        paddingVertical: 10,
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