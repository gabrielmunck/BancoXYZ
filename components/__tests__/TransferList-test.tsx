import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import TransferList from "@/app/(app)/(root)/TransferList";
import { SessionProvider } from "@/context/SessionContext";
import { useRouter } from "expo-router";

jest.mock("@/context/SessionContext", () => ({
    ...jest.requireActual("@/context/SessionContext"),
    useSession: () => ({
        token: "mock-token",
        transactionHistory: [
            {
                payeer: { name: "John Doe", document: "123" },
                value: 100,
                date: "2023-05-01",
                currency: "USD",
            },
            {
                payeer: { name: "Jane Smith", document: "456" },
                value: 200,
                date: "2023-05-02",
                currency: "USD",
            },
        ],
        fetchTransactionHistory: jest.fn(),
    }),
}));

jest.mock("expo-router", () => ({
    useRouter: jest.fn(),
}));

// Mock any other dependencies used in TransferList

describe("<TransferList />", () => {
    it("Renderiza corretamente", () => {
        const { getByText } = render(
            <SessionProvider>
                <TransferList />
            </SessionProvider>
        );

        expect(getByText("Transferências")).toBeTruthy();
    });

    it("Filtro funcionando corretamente", () => {
        const { getByPlaceholderText, getByText } = render(
            <SessionProvider>
                <TransferList />
            </SessionProvider>
        );

        const filterInput = getByPlaceholderText("Filtre por nome");
        fireEvent.changeText(filterInput, "John");

        expect(getByText("John Doe")).toBeTruthy();
        expect(() => getByText("Jane Smith")).toThrow();
    });

    it("Renderiza corretamente as transações", () => {
        const { getByText } = render(
            <SessionProvider>
                <TransferList />
            </SessionProvider>
        );

        expect(getByText("John Doe")).toBeTruthy();
        expect(getByText("123")).toBeTruthy();
        expect(getByText("USD: 100,00")).toBeTruthy();
        expect(getByText("2023-05-01")).toBeTruthy();

        expect(getByText("Jane Smith")).toBeTruthy();
        expect(getByText("456")).toBeTruthy();
        expect(getByText("USD: 200,00")).toBeTruthy();
        expect(getByText("2023-05-02")).toBeTruthy();
    });

    it("Navegação para a tela home", () => {
        const mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
            isReady: true,
        });

        const { getByText } = render(
            <SessionProvider>
                <TransferList />
            </SessionProvider>
        );

        const homeButton = getByText("Home");
        fireEvent.press(homeButton);

        expect(mockPush).toHaveBeenCalledWith("/Home");
    });

    it("Troca o tipo do filtro", () => {
        const { getByTestId, getByPlaceholderText } = render(
            <SessionProvider>
                <TransferList />
            </SessionProvider>
        );

        const filterTypePicker = getByTestId("filter-type-picker");
        fireEvent(filterTypePicker, "onValueChange", "valor");

        waitFor(() => {
            expect(getByPlaceholderText("Filtre por valor")).toBeTruthy();
        });

        fireEvent(filterTypePicker, "onValueChange", "data");

        waitFor(() => {
            expect(getByPlaceholderText("Filtre por data")).toBeTruthy();
        });
    });
});
