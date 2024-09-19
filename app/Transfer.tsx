import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useSession } from "../context/SessionContext";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const Transfer = () => {

    const { fetchTransactionHistory, transactionHistory } = useSession();
    const router = useRouter();

    useEffect(() => {
        fetchTransactionHistory();
    }, []);

    const renderItem = ({ item }:{ item: {value: number;date: string;currency: string;payeer: {document: string;name: string;};} }) => (
        <View style={styles.transactionItem}>
            <Text style={styles.transactionTitle}>Nome:</Text>
            <Text style={styles.transactionText}>{item.payeer.name}</Text>
            <Text style={styles.transactionTitle}>RG:</Text>
            <Text style={styles.transactionText}>{item.payeer.document}</Text>
            <Text style={styles.transactionTitle}>Valor:</Text>
            <Text style={styles.transactionText}>{item.currency}: {parseFloat(item.value.toString()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            <Text style={styles.transactionTitle}>Data:</Text>
            <Text style={styles.transactionText}>{item.date}</Text>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Transferências</Text>
                </View>
                <View style={styles.transferContainer}>
                    <FlatList 
                        style={{width: "100%"}}
                        showsVerticalScrollIndicator={false}
                        data={transactionHistory}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={styles.backButtonContainer}>
                        <Pressable style={styles.backButton} onPress={() => router.push('/Home')}>
                            <Ionicons name="home" size={24} color="#181C14" />
                            <Text style={styles.backButtonText}>Home</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#181C14",
    },
    container: {
        flex: 1,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3C3D37",
    },
    transferContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        height: 100,
        width: "100%",
        backgroundColor: "#697565",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        alignItems: "center",
        fontSize: 32,
        color: "#ECDFCC",
        marginBottom: 20,
    },
    transactionItem: {
        width: "100%",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ECDFCC",
    },
    transactionTitle: {
        color: "#ECDFCC",
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold",
    },
    transactionText: {
        color: "#ECDFCC",
        fontSize: 16,
        marginBottom: 5,
    },
    backButtonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#ECDFCC",
        padding: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
    },
    backButtonText: {
        color: "#181C14",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
});

export default Transfer;
