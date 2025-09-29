import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaInicial({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adivinha quem sou?</Text>
            <Text style={styles.subtitle}>Agite o celular para jogar!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('SelectTheme')}>//navigaation.navigate('Game')
                <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
    subtitle: { fontSize: 18, marginBottom: 40 },
    button: { backgroundColor: '#ffa200ff', padding: 16, borderRadius: 8 },
    buttonText: { color: '#fff', fontSize: 18 }
});
