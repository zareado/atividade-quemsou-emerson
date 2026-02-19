import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EndScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const { pontos } = route.params || { pontos: 0 };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>⏱ Tempo Esgotado!</Text>
            <Text style={styles.score}>Pontuação Final: {pontos}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.replace('Home')}
            >
                <Text style={styles.buttonText}>Jogar Novamente</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    score: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#ffa200ff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
