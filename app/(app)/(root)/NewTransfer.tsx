import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSession } from '../../../context/SessionContext';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const NewTransfer: React.FC = () => {
    const [value, setValue] = useState('');
    const [document, setDocument] = useState('');
    const [date, setDate] = useState('');
    const [valueError, setValueError] = useState('');
    const [documentError, setDocumentError] = useState('');
    const [dateError, setDateError] = useState('');
    const { token } = useSession();
    const router = useRouter();

    // Função para lidar com o envio do formulário
    const handleSubmit = async () => {
        const isValueValid = validateValue(value);
        const isDocumentValid = validateDocument(document);
        const isDateValid = validateDate(date);
        if(isValueValid && isDocumentValid && isDateValid){
            try {
                const response = await axios.post(
                'https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer',
                {
                    value: parseFloat(value),
                    currency: 'USD',
                    payeerDocument: document,
                    transferDate: date.split('/').reverse().join('-') // Convertendo DD/MM/YYYY para YYYY-MM-DD
                },
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
            );
    
                router.push('/Home');
            } catch (error) {
            }
        }
    };

    const validateValue = (val: string) => { // Função para validar o valor da transferência
        if (!val) {
            setValueError('Valor é obrigatório');
            return false;
        }
        if (isNaN(parseFloat(val)) || parseFloat(val) <= 0) {
            setValueError('Valor deve ser um número positivo');
            return false;
        }
        setValueError('');
        return true;
    };
    
    const validateDocument = (doc: string) => { // Função para validar o documento do destinatário
        if (!doc) {
            setDocumentError('Documento é obrigatório');
            return false;
        }
        // Add more specific document validation if needed
        setDocumentError('');
        return true;
    };
    
    const validateDate = (date: string) => { // Função para validar a data e o formato da transferência usando regex
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!date || !regex.test(date)) {
            setDateError('Data inválida. Use o formato DD/MM/YYYY, exemplo: 01/01/2023');
            return false;
        }
        setDateError('');
        return true;
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
                    inputMode='decimal'
                />
                {valueError ? <Text style={styles.errorText}>{valueError}</Text> : null}
                <Text style={styles.label}>RG</Text>
                <TextInput
                    style={styles.input}
                    value={document}
                    onChangeText={setDocument}
                    placeholder="Digite o documento"
                />
                {documentError ? <Text style={styles.errorText}>{documentError}</Text> : null}
                <Text style={styles.label}>Data</Text>
                <TextInput
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                    placeholder="DD/MM/YYYY"
                />
                {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Transferir</Text>
                </Pressable>
            </View>
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
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textwhite,
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        backgroundColor: colors.secondary,
        padding: 20,
        borderRadius: 10,
    },
    label: {
        fontSize: 16,
        color: colors.textwhite,
        marginBottom: 5,
    },
    input: {
        backgroundColor: colors.textwhite,
        color: colors.background,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    errorText: {
        color: 'red',
        backgroundColor: colors.textwhite,
        padding: 10,
        borderRadius: 5,
        fontSize: 14,
        marginBottom: 10,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: colors.textwhite,
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
        backgroundColor: colors.accent,
        padding: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
    },
    backButtonText: {
        color: colors.textwhite,
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
});

export default NewTransfer;
