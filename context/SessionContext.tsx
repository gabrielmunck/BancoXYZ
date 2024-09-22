import {
    useState,
    useContext,
    createContext,
    type PropsWithChildren,
} from "react";
import axios from "axios";
import { Alert } from "react-native";
import { router } from "expo-router";

const AuthContext = createContext<{
    fetchTransactionHistory: () => void;
    transactionHistory: Array<{
        value: number;
        date: string;
        currency: string;
        payeer: {
            document: string;
            name: string;
        };
    }>;
    signIn: ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => Promise<boolean>;
    signOut: () => void;
    isLoggedIn: boolean;
    isLoading: boolean;
    user: any;
    token: string;
    fetchAccountInfo: () => void;
    accountInfo: { currency: string; accountBalance: number };
}>({
    fetchTransactionHistory: () => null,
    transactionHistory: [],
    signIn: () => Promise.resolve(false),
    signOut: () => null,
    fetchAccountInfo: () => null,
    isLoggedIn: false,
    isLoading: false,
    user: null,
    token: "",
    accountInfo: { currency: "", accountBalance: 0 },
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({ name: "", email: "" });
    const [token, setToken] = useState("");
    const [accountInfo, setAccountInfo] = useState({
        currency: "",
        accountBalance: 0,
    });
    const [transactionHistory, setTransactionHistory] = useState([]);


    // Função que obtem o dinheiro em conta usando o token do usuario
    const fetchAccountInfo = async () => {
        console.log("Token:", token);
        try {
            const response = await axios.get(
                "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAccountInfo({
                ...response.data,
                accountBalance: parseFloat(
                    response.data.accountBalance
                ).toFixed(2),
            });
        } catch (error) {
            Alert.alert("Erro", "Falha ao obter informações da conta");
        }
    };

    // Função que obtem o historico de transações do usuario
    const fetchTransactionHistory = async () => {
        console.log("Token transações:", token);
        try {
            const response = await axios.get(
                "https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTransactionHistory(response.data.transfers);
        } catch (error) {
            Alert.alert("Erro", "Falha ao obter histórico de transações");
        }
    };

    // Função que obtem e efetua o login do usuario
    const signIn = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<boolean> => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login",
                {
                    email,
                    password,
                }
            );
            if (response.data.token) {
                setIsLoggedIn(true);
                setUser(response.data.user);
                setToken(response.data.token);
                Alert.alert("Sucesso", "Login realizado com sucesso!");
                return true;
            } else {
                Alert.alert("Erro", "Credenciais inválidas");
                return false;
            }
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao fazer login");
            return false;
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
                    setUser({ name: "", email: "" });
                    setToken("");
                    router.push("/SignIn");
                    console.log("Logout realizado com sucesso!", isLoggedIn);
                },
                fetchAccountInfo,
                fetchTransactionHistory,
                transactionHistory,
                isLoggedIn,
                isLoading,
                user,
                token,
                accountInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
