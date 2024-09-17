import { useState, useContext, createContext, type PropsWithChildren } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { router } from "expo-router";


const AuthContext = createContext<{
    signIn: ({ email, password }: { email: string; password: string }) => void;
    signOut: () => void;
    isLoggedIn: boolean;
    isLoading: boolean;
    user: any;
    token: string;
}>({
    signIn: () => null,
    signOut: () => null,
    isLoggedIn: false,  
    isLoading: false,
    user: null,
    token: "",
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error(
                "useSession precisa estar envolta <SessionProvider />"
            );
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({ name: "", email: "" });
    const [token, setToken] = useState("");

    // Função para lidar com o processo de login
    const signIn = async ({ email, password }: { email: string; password: string }) => {
        try {
            setIsLoading(true);
            // Faz uma requisição POST para a API de login
            const response = await axios.post("https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login", {
                email,
                password,
            });
            // Verifica a resposta da API
            if (response.data.token) {
                Alert.alert("Sucesso", "Login realizado com sucesso!");
                setIsLoggedIn(true);
                setUser(response.data.user);
                setToken(response.data.token);
            } else {
                Alert.alert("Erro", "Credenciais inválidas");
            }
            console.log("API Response:", response.data);
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao fazer login");
            
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut: () => {
                    setIsLoggedIn(false);
                    router.push('/');
                    console.log("Logout realizado com sucesso!", isLoggedIn);
                },
                isLoggedIn,
                isLoading,
                user,
                token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}