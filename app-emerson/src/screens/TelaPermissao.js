import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaPermissao({ navigation }) {
    return (
        <View style={[estilos.tela, { backgroundColor: '#FFFFFF' }]}>
            <Text style={estilos.titulo}>Tempo Esgotado!</Text>
            <Text style={estilos.pontos}>Pontuação Final: {pontos}</Text>
            <TouchableOpacity style={estilos.botao} onPress={ ()=> navigation.navigate('TelaJogo')}>
                <Text style={estilos.textoBotao}>Jogar Novamente</Text>
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
