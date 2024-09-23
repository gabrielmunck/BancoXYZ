import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import NewTransfer from "@/app/(app)/(root)/NewTransfer";
import { SessionProvider } from "@/context/SessionContext";
import { useRouter } from "expo-router";

jest.mock("@/context/SessionContext", () => ({
    ...jest.requireActual("@/context/SessionContext"),
    useSession: () => ({
        token: "mock-token",
    }),
}));

jest.mock("expo-router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("axios", () => ({
    post: jest.fn(),
}));

describe("<NewTransfer />", () => {
    it("Renderiza corretamente", () => {
        const { getByText, getByPlaceholderText } = render(
            <SessionProvider>
                <NewTransfer />
            </SessionProvider>
        );

        expect(getByText("Nova Transferência")).toBeTruthy();
        expect(getByPlaceholderText("Digite o valor")).toBeTruthy();
        expect(getByPlaceholderText("Digite o documento")).toBeTruthy();
        expect(getByPlaceholderText("DD/MM/YYYY")).toBeTruthy();
        expect(getByText("Transferir")).toBeTruthy();
    });

    it("Valida os inputs", async () => {
        const { getByText } = render(
            <SessionProvider>
                <NewTransfer />
            </SessionProvider>
        );

        const transferButton = getByText("Transferir");
        fireEvent.press(transferButton);

        await waitFor(() => {
            expect(getByText("Valor é obrigatório")).toBeTruthy();
            expect(getByText("Documento é obrigatório")).toBeTruthy();
            expect(getByText("Data inválida. Use o formato DD/MM/YYYY, exemplo: 01/01/2023")).toBeTruthy();
        });
    });

    it("Submit do forms funciona corretamente", async () => {
        const mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    
        const { getByText, getByPlaceholderText } = render(
            <SessionProvider>
                <NewTransfer />
            </SessionProvider>
        );
    
        fireEvent.changeText(getByPlaceholderText("Digite o valor"), "100");
        fireEvent.changeText(getByPlaceholderText("Digite o documento"), "123456");
        fireEvent.changeText(getByPlaceholderText("DD/MM/YYYY"), "01/01/2023");
    
        const transferButton = getByText("Transferir");
        fireEvent.press(transferButton);
    
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith("/Home");
        });
    });
});
