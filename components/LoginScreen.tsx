import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useSession } from '@/context/SessionContext';
import { useRouter } from "expo-router";

const LoginScreen = () => {
    const { signIn, isLoading, isLoggedIn  } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/Home'); // Navega para a página "Home"
        }
    }, [isLoggedIn]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Banco XYZ</Text>
            
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text style={styles.label}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Usuário"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Pressable
                        style={styles.button}
                        onPress={() => signIn({ email, password })}
                    >
                        <Text style={styles.buttonText}>Entrar</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

// Estilos para o componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "80%",
        maxWidth: 400,
        justifyContent: "center",
        padding: 16,
    },
    title: {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 24,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderTopStartRadius: 10,
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;