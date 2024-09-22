import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Home from "@/app/(app)/(root)/Home";
import { SessionProvider, useSession } from "@/context/SessionContext";

const mockSignOut = jest.fn();

jest.mock("@/context/SessionContext", () => ({
    ...jest.requireActual("@/context/SessionContext"),
    useSession: () => ({
        user: { name: "Test User" },
        accountInfo: { currency: "USD", accountBalance: 1000.5 },
        fetchAccountInfo: jest.fn(),
        signOut: mockSignOut,
    }),
}));

jest.mock("expo-router", () => ({
    router: {
        push: jest.fn(),
    },
}));

describe("<Home />", () => {
    it("renders main elements correctly", () => {
        const { getByText } = render(
            <SessionProvider>
                <Home />
            </SessionProvider>
        );

        expect(getByText("BancoXYZ")).toBeTruthy();
        expect(getByText("Olá, Test User!")).toBeTruthy();
        expect(getByText("Seu saldo:")).toBeTruthy();
        expect(getByText("Nova Transferência")).toBeTruthy();
        expect(getByText("Lista de Transferências")).toBeTruthy();
        expect(getByText("Sair")).toBeTruthy();
    });

    it("toggles balance visibility", () => {
        const { getByText, getByTestId } = render(
            <SessionProvider>
                <Home />
            </SessionProvider>
        );

        expect(getByText("********")).toBeTruthy();

        const eyeButton = getByTestId("toggle-visibility");
        fireEvent.press(eyeButton);

        expect(getByText("USD: 1.000,50")).toBeTruthy();
    });

    it("navigates to New Transfer screen", () => {
        const { getByText } = render(
            <SessionProvider>
                <Home />
            </SessionProvider>
        );

        const newTransferButton = getByText("Nova Transferência");
        fireEvent.press(newTransferButton);
        expect(require("expo-router").router.push).toHaveBeenCalledWith(
            "/NewTransfer"
        );
    });

    it("navigates to Transfer List screen", () => {
        const { getByText } = render(
            <SessionProvider>
                <Home />
            </SessionProvider>
        );

        const transferListButton = getByText("Lista de Transferências");
        fireEvent.press(transferListButton);
        expect(require("expo-router").router.push).toHaveBeenCalledWith(
            "/TransferList"
        );
    });

    it("calls signOut function when logout button is pressed", () => {
        const { getByText } = render(
            <SessionProvider>
                <Home />
            </SessionProvider>
        );

        const logoutButton = getByText("Sair");
        fireEvent.press(logoutButton);
        expect(mockSignOut).toHaveBeenCalled();
    });
});
