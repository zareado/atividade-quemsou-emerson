import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import palavras from './palavras.json';

const obterCorAleatoria = (corAtual) => {
    const cores = ['#FF5733', '#33FF57', '#3357FF', '#FF8C00', '#FF33F6', '#006400', '#008080', '#0000CD', '#4B0082'];
    const outrasCores = cores.filter(cor => cor !== corAtual);
    return outrasCores[Math.floor(Math.random() * outrasCores.length)];
};

export default function App() {
    const [palavra, definirPalavra] = useState('');
    const [corFundo, definirCorFundo] = useState('#FFFFFF');
    const [corTexto, definirCorTexto] = useState('#000000');
    const [inscricao, definirInscricao] = useState(null);
    const [telaInicial, definirTelaInicial] = useState(true);
    const [permiteSensor, definirPermiteSensor] = useState(false);

    let ultimaTroca = Date.now();

    useEffect(() => {
        if (permiteSensor) {
            sortearPalavra();
            iniciarSensor();
            return () => pararSensor();
        }
    }, [permiteSensor]);

    const iniciarSensor = () => {
        Gyroscope.setUpdateInterval(500);

        const sub = Gyroscope.addListener(({ x, y, z }) => {
            const agora = Date.now();

            if (z < -2 && agora - ultimaTroca > 1000) {
                ultimaTroca = agora;

                const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
                const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
                const novaCorFundo = obterCorAleatoria(corFundo);

                definirPalavra(novaPalavra);
                definirCorTexto(novaCorTexto);
                definirCorFundo(novaCorFundo);
            }
        });

        definirInscricao(sub);
    };

    const pararSensor = () => {
        if (inscricao) {
            inscricao.remove();
            definirInscricao(null);
        }
    };

    const sortearPalavra = () => {
        const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
        const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';
        const novaCorFundo = obterCorAleatoria(corFundo);

        definirPalavra(novaPalavra);
        definirCorTexto(novaCorTexto);
        definirCorFundo(novaCorFundo);
    };

    if (telaInicial) return renderTelaInicial();
    if (!permiteSensor) return renderPermissao();
    return renderPalavra();

    function renderTelaInicial() {
        return (
            <View style={[estilos.tela, { backgroundColor: '#FFFFFF' }]}>
                <Text style={estilos.titulo}>Adivinha quem sou?</Text>
                <Text style={estilos.instrucao}>Agite levemente o celular para trocar de palavra</Text>
                <Text style={estilos.instrucao}>Podemos jogar de duas formas diferente:</Text>
                <Text style={estilos.instrucao}>1. Tentar descobrir por pista, onde a pessoa passa estas pistas sem falar a palavra:</Text>
                <Text style={estilos.instrucao}>2. Tentar descobrir por mímicas, onde a pessoa irá imitar ou demonstrar sem falar a palavra:</Text>
                <Text style={estilos.inscricao}>O limite de tentativas ou tempo é definido pelos jogadores com um acordo. Divirtam-se!</Text>

                <TouchableOpacity style={estilos.botao} onPress={() => definirTelaInicial(false)}>
                    <Text style={estilos.textoBotao}>Continuar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function renderPermissao() {
        return (
            <View style={[estilos.tela, { backgroundColor: '#FFFFFF' }]}>
                <Text style={estilos.titulo}>Permitir uso do giroscópio?</Text>
                <TouchableOpacity style={estilos.botao} onPress={() => definirPermiteSensor(true)}>
                    <Text style={estilos.textoBotao}>Permitir</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function renderPalavra() {
        return (
            <View style={[estilos.tela, { backgroundColor: corFundo }]}>
                <Text style={[estilos.palavra, { color: corTexto }]}>{palavra}</Text>
            </View>
        );
    }
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
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
    },
    instrucao: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
    },
    inscricao: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    botao: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    textoBotao: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
