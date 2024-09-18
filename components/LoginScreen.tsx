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
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>BancoXYZ</Text>
                </View>
                <View style={styles.contentContainer}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#ECDFCC" />
                    ) : (
                        <>
                            <Text style={styles.label}>Login</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Usuário"
                                placeholderTextColor="#ECDFCC"
                                value={email}
                                onChangeText={setEmail}
                            />
                            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                placeholderTextColor="#ECDFCC"
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
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Precisa de ajuda? Click aqui e fale conosco.</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
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
    },
    title: {
        color: "#ECDFCC",
        fontSize: 32,
        fontWeight: "bold",
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 100,
        flex: 1,
    },
    label: {
        fontSize: 18,
        color: "#ECDFCC",
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: "#697565",
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
        color: "#ECDFCC",
        backgroundColor: "#697565",
        borderRadius: 5,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 14,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#697565',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#ECDFCC',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        height: 60,
        backgroundColor: "#697565",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    footerText: {
        color: '#ECDFCC',
        fontSize: 16,
        fontWeight: '100',
    },
});

export default LoginScreen;