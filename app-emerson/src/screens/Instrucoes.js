import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'; 


export default function LogoEles({ navigation }) {
    return (
        <ImageBackground
                    source={require('../img/instrucoes.png')} // ajuste o caminho se necessário
                    style={styles.background}
                    resizeMode="strech" // ou "contain", dependendo do efeito desejado
                >
            <View style={[estilos.tela]}>
                    <Text style={estilos.titulo}>esquizogame todo doido</Text>
                    <Text style={estilos.instrucao}>vc vai ter que ta mexendo o celular</Text>
                    <Text style={estilos.instrucao}>joga p cima se vc acertar, e p baixo se errar dog!</Text>

                    

                    <Text style={estilos.instrucao2}>1. a tropa vai te dar umas dicas, jae?</Text>
                    <Text style={estilos.instrucao2}>2. capaz da gurizada fazer uma graça, na rlk das mimicas:</Text>


                    <Text style={estilos.inscricao}>se vai ta tendo um minutin p pontuar, pdpa?</Text>


                <TouchableOpacity style={estilos.button} onPress={() => navigation.navigate('Home')}>//navigaation.navigate('Game')
                    <Text style={estilos.textoBotao}> {"< "} Voltar</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    palavra: {
        fontSize: 80,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titulo: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff'
    },
    instrucao: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
        color: '#fff'
    },
    instrucao2: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 30,
        color: '#fff'
    },
    inscricao: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        color: '#fff'
    },
    botao: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        
    },
    textoBotao: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
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
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.6)', // fundo translúcido
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    }
});