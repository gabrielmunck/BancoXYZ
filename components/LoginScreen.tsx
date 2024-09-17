import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useSession } from '@/context/SessionContext';
import { useRouter } from "expo-router";

const LoginScreen = () => {
    const { signIn, isLoading, isLoggedIn } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/Home'); // Navega para a página "Home"
        }
    }, [isLoggedIn]);

    // Função para validar os campos de entrada
    const validateInputs = () => {
        let isValid = true;
        
        if (!email) {
            setEmailError("Um email é necessário para ter acesso");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("O Email esta incorreto");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Uma senha é necessária para ter acesso");
            isValid = false;
        } else if (password.length < 4) {
            setPasswordError("A senha precisa no minimo 4 caracteres");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const handleSignIn = async () => {
        if (validateInputs()) {
            const result = await signIn({ email, password });
            if (!result) {
                setPasswordError("Senha incorreta. Por favor, tente novamente.");
            }
        }
    };

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
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    <Pressable
                        style={styles.button}
                        onPress={handleSignIn}
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
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