import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export default function TelaInicial({ navigation }) {
    return (
        <ImageBackground
            source={require('../img/teste3.png')} // ajuste o caminho se necessário
            style={styles.background}
            resizeMode="strech" // ou "contain", dependendo do efeito desejado
        >
            <View style={styles.container}>
                <Text style={styles.title}>esquizogame todo doido</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.replace('SelectTheme')}>
                    <Text style={styles.buttonText}>{"> "} Jogar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Instrucoes')}>
                    <Text style={styles.buttonText}>{"> "} Instruções</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogoEles')}>
                    <Text style={styles.buttonText}>{"> "} LogoEles</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      //  backgroundColor: 'rgba(255,255,255,0.6)', // opcional: leve fundo branco com transparência por cima da imagem
        padding: 20,
    },
    title: {
        fontSize: 42,
        borderRadius: 10,
        fontWeight: 'bold',
        marginBottom: 40,
        backgroundColor: 'rgba(0,0,0,0.6)', // fundo translúcido
        color: '#fff'
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 40
    },
    button: {
        padding: 16,
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.6)', // fundo translúcido
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    }
});
