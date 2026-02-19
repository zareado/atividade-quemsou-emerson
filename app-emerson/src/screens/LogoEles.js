import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';


export default function LogoEles({ navigation }) {
    return (

        <ImageBackground
                    source={require('../img/creditos.png')} // ajuste o caminho se necessário
                    style={styles.background}
                    resizeMode="strech" // ou "contain", dependendo do efeito desejado
                >

            <View style={estilos.container}>
                <Text style={estilos.title}></Text>
                <Text style={estilos.title}></Text>
                <Text style={estilos.title}></Text>
                <Text style={estilos.title}></Text>
                

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>//navigaation.navigate('Game')
                    <Text style={styles.buttonText}> {"< "} Voltar</Text>
                </TouchableOpacity>

            </View>

         </ImageBackground>
    );
}

const estilos = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
    subtitle: { fontSize: 18, marginBottom: 40 },
    button: { /*backgroundColor: '#000000ff', */padding: 16, borderRadius: 4 },
    buttonText: { color: '#000', fontSize: 18 }
});

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
        marginBottom: 1,
        backgroundColor: 'rgba(0,0,0,0.6)', // fundo translúcido
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    }
});

