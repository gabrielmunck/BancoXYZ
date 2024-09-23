import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from "@/components/LoginScreen";
import * as SessionContext from "@/context/SessionContext";

const mockSignIn = jest.fn();
const mockUseRouter = jest.fn();

jest.mock("@/context/SessionContext", () => ({
    ...jest.requireActual("@/context/SessionContext"),
    useSession: () => ({
        signIn: mockSignIn,
        isLoading: false,
        isLoggedIn: false,
    }),
}));

jest.mock("expo-router", () => ({
    useRouter: () => mockUseRouter,
}));

describe("<LoginScreen />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Renderiza os elementos corretamente", () => {
        const { getByText, getByPlaceholderText } = render(<LoginScreen />);
        expect(getByText("BancoXYZ")).toBeTruthy();
        expect(getByPlaceholderText("Email")).toBeTruthy();
        expect(getByPlaceholderText("Senha")).toBeTruthy();
    });

    it("Faz os inputs válidos e chama signIn", async () => {
        const { getByPlaceholderText } = render(<LoginScreen />);
        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Senha");

        fireEvent.changeText(emailInput, "test@example.com");
        fireEvent.changeText(passwordInput, "password123");

        expect(emailInput.props.value).toBe("test@example.com");
        expect(passwordInput.props.value).toBe("password123");
    });

    it("Mostra as mensagens de erro após click", async () => {
        const { getByText } = render(<LoginScreen />);
        const loginButton = getByText("Entrar");
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(getByText("Um email é necessário para ter acesso")).toBeTruthy();
            expect(getByText("Uma senha é necessária para ter acesso")).toBeTruthy();
        });
    });

    it("Usa as credenciais certas para fazer o login", async () => {
        const { getByText, getByPlaceholderText } = render(<LoginScreen />);
        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Senha");
        const loginButton = getByText("Entrar");

        fireEvent.changeText(emailInput, "test@example.com");
        fireEvent.changeText(passwordInput, "password123");
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith({ email: "test@example.com", password: "password123" });
        });
    });
});
