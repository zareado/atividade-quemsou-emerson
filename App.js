import React, {useState, useEffect} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, _View} from 'react-native'

import {Gyroscope} from 'expo-sensors';

import palavras from './palavras.json'


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

    useEffect( ()=> {
        if (permiteSensor) {
            sortearPalavra();
            iniciarSensor();
            return () => pararSensor();
        }
    }, [permiteSensor]);

    const iniciarSensor = () => {
        Gyroscope,setUpdateInterval(500);

        Gyroscope.addListener(({x,y,z}) => {
            const agora = Date.now();

            //console.log(´Movimento detectado - x: ${x.toFixed(2}, y: ${y.toFixed(2)}, z: ${$.toFixed(2)}´);

            if (z < -2 && agora - ultimaTroca > 1000) {
                ultimaTroca = agora;

                const novaPalavra = palavras[Math.floor(Math.random() * palavra.length)]

                const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';

                const novaCorFundo = obterCorAleatoria(corFundo);

                console.log(`Palavra trocada: ${novaPalavra}, Cor de fundo: ${novaCorFundo}`)

                definirPalavra(novaPalavra);
                definirCorTexto(novaCorTexto);
                definirCorFundo(novaCorFundo);
            }
        })
    };

    const pararSensor = () => {
        inscricao && inscricao.remove();
        definirInscricao(null);
    };

    const sortearPalavra = () =>{

        const novaPalavra = palavra[Math.floor(Math.random() * palavra.length)];

        const novaCorTexto = corTexto === '#000000' ? '#FFFFFF' : '#000000';

        const novaCorFundo = obterCorAleatoria(corFundo);

        definirPalavra(novaPalavra);
        definirCorTexto(novaCorTexto);
        definirCorFundo(novaCorFundo);
    }

};

//----------------------------
// Parte V

const renderTelaInicial = () => {
    <View>

    </View
};