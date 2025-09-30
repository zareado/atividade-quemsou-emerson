import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SelecionarTema({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione um tema!</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Game', {tema: 'geral'})}>//navigaation.navigate('Game'))
                <Text style={styles.buttonText}>Geral</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Game', {tema: 'alimentos'})}>//navigaation.navigate('Game')
                <Text style={styles.buttonText}>Alimentos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Game', {tema: 'lugares'})}>//navigaation.navigate('Game')
                <Text style={styles.buttonText}>Lugares</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Game', {tema: 'animais'})}>//navigaation.navigate('Game')
                <Text style={styles.buttonText}>Animais</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Game', {tema: 'objetos'})}>//navigaation.navigate('Game')
                <Text style={styles.buttonText}>Objetos</Text>
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
