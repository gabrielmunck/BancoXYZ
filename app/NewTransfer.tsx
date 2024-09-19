import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const NewTransfer: React.FC = () => {
    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const router = useRouter();

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Transfer submitted:', { value, name, date });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nova Transferência</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Valor</Text>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
                    placeholder="Digite o valor"
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Nome do destinatário</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Digite o nome"
                />
                <Text style={styles.label}>Data</Text>
                <TextInput
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                    placeholder="DD/MM/AAAA"
                />
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Transferir</Text>
                </Pressable>
            </View>
            <View style={styles.backButtonContainer}>
                        <Pressable
                            style={styles.backButton}
                            onPress={() => router.push("/Home")}
                        >
                            <Ionicons name="home" size={24} color="#181C14" />
                            <Text style={styles.backButtonText}>Home</Text>
                        </Pressable>
                    </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181C14',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ECDFCC',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        backgroundColor: '#3C3D37',
        padding: 20,
        borderRadius: 10,
    },
    label: {
        fontSize: 16,
        color: '#ECDFCC',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#697565',
        color: '#ECDFCC',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#697565',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ECDFCC',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButtonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
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

export default NewTransfer;
