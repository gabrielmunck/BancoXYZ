import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSession } from "@/context/SessionContext";

const Home: React.FC = () => {
    const { signOut, user } = useSession();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, {user.name}!</Text>
            <Text style={styles.text}>Welcome to BancoXYZ</Text>

            <Pressable style={styles.logoutButton} onPress={signOut}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    logoutButton: {
        backgroundColor: "#FF3B30",
        paddingHorizontal: 90,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    logoutButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
export default Home;