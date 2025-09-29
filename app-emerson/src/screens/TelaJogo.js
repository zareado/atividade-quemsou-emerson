import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Audio } from 'expo-av';  // <-- Importa o Audio
import alimento from '../data/alimento.json';
import lugares from '../data/lugares.json'
import objetos from '../data/objetos.json'
import animais from '../data/animais.json'
import palavras from '../data/palavras.json';

import obterCorAleatoria from '../utils/obterCorAleatoria';

import { loadSounds, tocarSomAcerto, tocarSomPulo, unloadSounds } from '../utils/gerenciaSons';

import TelaJogo from '../screens/TelaJogo'
import TelaFinal from '../screens/TelaFinal'
import TelaInicial from '../screens/TelaInicial';
import TelaPermissao from '../screens/TelaPermissao'
import { StackScreen } from 'react-native-screens';

export default function GameScreen() {
    const [palavra, setPalavra] = useState('');
    const [corFundo, setCorFundo] = useState('#FFFFFF');
    const [corTexto, setCorTexto] = useState('#000000');
    const [pontos, setPontos] = useState(0);
    const [tempoRestante, setTempoRestante] = useState(60);
    const [ultimaTroca, setUltimaTroca] = useState(Date.now());
    const [sentidoUltimaRotacao, setSentidoUltimaRotacao] = useState(null);
    const [inscricao, setInscricao] = useState(null);

    const navigation = useNavigation();

    // troca para o tema selecionado
    const route = useRoute();
    const { tema } = route.params;

    switch (tema) {
        case 'alimentos':
            setPalavra(alimento);
            break;
        case 'lugares':
            setPalavra(lugares);
            break;
        case 'objetos':
            setPalavra(objetos);
            break;
        case 'animais':
            setPalavra(animais);
            break;
        default:
            setPalavra(palavras);
    }

    // Carrega os sons ao iniciar
    useEffect(() => {
        loadSounds();

        return () => {
            unloadSounds();
        };
    }, []);

    // Inicia o jogo
    useEffect(() => {
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
                playAcerto();
            } else if (x > 1.0 && sentidoUltimaRotacao !== 'lado') {
                setUltimaTroca(agora);
                setSentidoUltimaRotacao('lado');
                trocarPalavra();
                playPulo();
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
        const novaPalavra = palavra[Math.floor(Math.random() * palavra.length)]; // substituir palavras (importado do tema geral) por variavel de palavra dependendo do select de tema
        setPalavra(novaPalavra);
        setCorTexto((prev) => (prev === '#000000' ? '#FFFFFF' : '#000000'));
        setCorFundo((prev) => obterCorAleatoria(prev));
    };

    const sortearPalavra = () => {
        const novaPalavra = palavra[Math.floor(Math.random() * palavra.length)];
        setPalavra(novaPalavra);
        setCorTexto((prev) => (prev === '#000000' ? '#FFFFFF' : '#000000'));
        setCorFundo((prev) => obterCorAleatoria(prev));
    };

    return (
        <View style={[styles.container, { backgroundColor: corFundo }]}>
            <Text style={[styles.palavra, { color: corTexto }]}>{palavra}</Text>
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
