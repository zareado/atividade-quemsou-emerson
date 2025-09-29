import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useNavigation, useRoute } from '@react-navigation/native';

import alimento from '../data/alimento.json';
import lugares from '../data/lugares.json';
import objetos from '../data/objetos.json';
import animais from '../data/animais.json';
import palavras from '../data/palavras.json';
import teste from '../data/teste.json';

import obterCorAleatoria from '../utils/obterCorAleatoria';
import { loadSounds, tocarSomAcerto, tocarSomPulo, unloadSounds } from '../utils/gerenciaSons';

export default function GameScreen() {
    const [listaPalavras, setListaPalavras] = useState([]);
    const [palavraAtual, setPalavraAtual] = useState('');
    const [corFundo, setCorFundo] = useState('#FFFFFF');
    const [corTexto, setCorTexto] = useState('#000000');
    const [pontos, setPontos] = useState(0);
    const [tempoRestante, setTempoRestante] = useState(60);
    const [ultimaTroca, setUltimaTroca] = useState(Date.now());
    const [sentidoUltimaRotacao, setSentidoUltimaRotacao] = useState(null);
    const [inscricao, setInscricao] = useState(null);

    const navigation = useNavigation();
    const route = useRoute();
    const { tema } = route.params;

    // Define a lista de palavras com base no tema
    useEffect(() => {
        switch (tema) {
            case 'alimentos':
                setListaPalavras(alimento);
                break;
            case 'lugares':
                setListaPalavras(lugares);
                break;
            case 'objetos':
                setListaPalavras(objetos);
                break;
            case 'animais':
                setListaPalavras(animais);
            case 'teste':
                setListaPalavras(teste)
                break;
            default:
                setListaPalavras(palavras);
        }
    }, [tema]);

    // Sorteia a primeira palavra e inicia o sensor
    useEffect(() => {
        if (listaPalavras.length > 0) {
            sortearPalavra();
            iniciarSensor();

            const timer = setInterval(() => {
                setTempoRestante((tempo) => {
                    if (tempo <= 1) {
                        clearInterval(timer);
                        pararSensor();
                        navigation.replace('End', { pontos });
                        return 0;
                    }
                    return tempo - 1;
                });
            }, 1000);

            return () => {
                clearInterval(timer);
                pararSensor();
            };
        }
    }, [listaPalavras]);

    // Sons
    useEffect(() => {
        loadSounds();
        return () => unloadSounds();
    }, []);

    const iniciarSensor = () => {
        Gyroscope.setUpdateInterval(1000);
        const sub = Gyroscope.addListener(({ y, x }) => {
            const agora = Date.now();
            const intervalo = agora - ultimaTroca;
            if (intervalo < 500) return;

            if (y < -1.3 && sentidoUltimaRotacao !== 'baixo') {
                setUltimaTroca(agora);
                setSentidoUltimaRotacao('baixo');
                setPontos((prev) => prev + 1);
                trocarPalavra();
                tocarSomAcerto();
            } else if (x > 1.0 && sentidoUltimaRotacao !== 'lado') {
                setUltimaTroca(agora);
                setSentidoUltimaRotacao('lado');
                trocarPalavra();
                tocarSomPulo();
            }
        });

        setInscricao(sub);
    };

    const pararSensor = () => {
        if (inscricao) {
            inscricao.remove();
            setInscricao(null);
        }
    };

    const trocarPalavra = () => {
        if (listaPalavras.length === 0) return;
        const nova = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
        setPalavraAtual(nova);
        setCorTexto((prev) => (prev === '#000000' ? '#FFFFFF' : '#000000'));
        setCorFundo((prev) => obterCorAleatoria(prev));
    };

    const sortearPalavra = () => {
        if (listaPalavras.length === 0) return;
        const nova = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
        setPalavraAtual(nova);
        setCorTexto((prev) => (prev === '#000000' ? '#FFFFFF' : '#000000'));
        setCorFundo((prev) => obterCorAleatoria(prev));
    };

    return (
        <View style={[styles.container, { backgroundColor: corFundo }]}>
            <Text style={[styles.palavra, { color: corTexto }]}>{palavraAtual}</Text>
            <Text style={[styles.pontos, { color: corTexto }]}>Pontos: {pontos}</Text>
            <Text style={[styles.timer, { color: corTexto }]}>Tempo: {tempoRestante}s</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    palavra: {
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    pontos: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
    },
    timer: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
