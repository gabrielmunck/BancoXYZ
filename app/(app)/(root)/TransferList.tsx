import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from "react-native";
import { useSession } from "../../../context/SessionContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

const Transfer = () => {
    const { fetchTransactionHistory, transactionHistory } = useSession();
    const [filter, setFilter] = useState("");
    const [filterType, setFilterType] = useState("nome");

    const router = useRouter();

    useEffect(() => {
        fetchTransactionHistory();
    }, []);

    const renderItem = ({
        item,
    }: {
        item: {
            value: number;
            date: string;
            currency: string;
            payeer: { document: string; name: string };
        };
    }) => (
        <View style={styles.transactionItem}>
            <Text style={styles.transactionTitle}>Nome:</Text>
            <Text style={styles.transactionText}>{item.payeer.name}</Text>
            <Text style={styles.transactionTitle}>RG:</Text>
            <Text style={styles.transactionText}>{item.payeer.document}</Text>
            <Text style={styles.transactionTitle}>Valor:</Text>
            <Text style={styles.transactionText}>{item.currency}:{" "}{parseFloat(item.value.toString()).toLocaleString("pt-BR", {minimumFractionDigits: 2,maximumFractionDigits: 2,})}</Text>
            <Text style={styles.transactionTitle}>Data:</Text>
            <Text style={styles.transactionText}>{item.date}</Text>
        </View>
    );

    const filteredTransactions = transactionHistory.filter((item) => {
        if (filterType === "nome") {
            return item.payeer.name
                .toLowerCase()
                .includes(filter.toLowerCase());
        } else if (filterType === "valor") {
            return item.value.toString().includes(filter);
        } else if (filterType === "data") {
            return item.date.includes(filter);
        }
        return true;
    });

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Transferências</Text>
                </View>
                <View style={styles.filterContainer}>
                    <TextInput
                        style={styles.filterInput}
                        value={filter}
                        onChangeText={setFilter}
                        placeholder={`Filtre por ${filterType}`}
                    />
                    <Picker
                        selectedValue={filterType}
                        onValueChange={(itemValue) => setFilterType(itemValue)}
                        style={styles.filterTypePicker}
                    >
                        <Picker.Item label="Nome" value="nome" />
                        <Picker.Item label="Valor" value="valor" />
                        <Picker.Item label="Data" value="data" />
                    </Picker>
                </View>

                <View style={styles.transferContainer}>
                    <FlatList
                        style={{ width: "100%" }}
                        showsVerticalScrollIndicator={false}
                        data={filteredTransactions}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={styles.backButtonContainer}>
                        <Pressable
                            style={styles.backButton}
                            onPress={() => router.push("/Home")}
                        >
                            <Ionicons name="home" size={24} color="#f0f0f0" />
                            <Text style={styles.backButtonText}>Home</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

const colors = {
    text: '#aaf2ff',
    textwhite:'#f0f0f0',
    background:'#101010',
    primary: '#0F4C75',
    secondary:'#1B262C',
    accent: '#3282B8',
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.secondary,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    filterInput: {
        flex: 1,
        height: 48,
        borderColor: colors.accent,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: colors.textwhite,
    },
    filterTypePicker: {
        width: 80,
        height: 48,
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: colors.accent,
        color: colors.textwhite,
    },
    transferContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        height: 120,
        width: "100%",
        backgroundColor: colors.primary,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        alignItems: "center",
        fontSize: 32,
        color: colors.textwhite,
        fontWeight: "bold",
        marginBottom: 20,
    },
    transactionItem: {
        width: "100%",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.accent,
    },
    transactionTitle: {
        color: colors.textwhite,
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold",
    },
    transactionText: {
        color: colors.textwhite,
        fontSize: 16,
        marginBottom: 5,
    },
    backButtonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.accent,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    backButtonText: {
        color: colors.textwhite,
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
});

export default Transfer;
