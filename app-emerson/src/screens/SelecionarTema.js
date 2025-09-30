import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const temas = [
    { label: 'Geral', value: 'geral' },
    { label: 'Alimentos', value: 'alimentos' },
    { label: 'Lugares', value: 'lugares' },
    { label: 'Animais', value: 'animais' },
    { label: 'Objetos', value: 'objetos' },
    // Pode adicionar mais temas aqui que o layout se ajusta automaticamente
];

export default function SelecionarTema({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione um tema!</Text>

            <View style={styles.buttonContainer}>
                {temas.map((tema) => (
                    <TouchableOpacity
                        key={tema.value}
                        style={styles.button}
                        onPress={() => navigation.replace('Game', { tema: tema.value })}
                    >
                        <Text style={styles.buttonText}>{tema.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;
const buttonWidth = (screenWidth - 60) / 2; // para 2 colunas, com margem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10, // funciona a partir do React Native 0.71+
    },
    button: {
        backgroundColor: '#ffa200ff',
        paddingVertical: 16,
        borderRadius: 8,
        margin: 5,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
