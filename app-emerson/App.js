import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import { Audio } from 'expo-av';  // <-- Importa o Audio
import alimentos from './src/data/alimento.json';
import lugares from './src/data/lugares.json'
import objetos from './src/data/objetos.json'
import animais from './src/data/animais.json'
import palavras from './src/data/palavras.json';

import obterCorAleatoria from './src/utils/obterCorAleatoria';

import { loadSounds, tocarSomAcerto, tocarSomPulo, unloadSounds } from './src/utils/gerenciaSons';

import TelaJogo from './src/screens/TelaJogo'
import TelaFinal from './src/screens/TelaFinal'
import TelaInicial from './src/screens/TelaInicial';
import TelaPermissao from './src/screens/TelaPermissao'
import { StackScreen } from 'react-native-screens';
import SelecionarTema from './src/screens/SelecionarTema';
import LogoEles from './src/screens/LogoEles';
import Instrucoes from './src/screens/Instrucoes'

// Função para sortear cor diferente da atual

// const obterCorAleatoria = (corAtual) => {
//     const cores = [
//         '#FF5733', '#33FF57', '#3357FF', '#FF8C00',
//         '#FF33F6', '#006400', '#008080', '#0000CD', '#4B0082'
//     ];
//     const outrasCores = cores.filter(cor => cor !== corAtual);
//     return outrasCores[Math.floor(Math.random() * outrasCores.length)];
// };

const Stack = createStackNavigator();

 export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={TelaInicial} />
                <Stack.Screen name="Permission" component={TelaPermissao} />
                <Stack.Screen name="Game" component={TelaJogo} />
                <Stack.Screen name="End" component={TelaFinal} />
                <Stack.Screen name="SelectTheme" component={SelecionarTema}/>
                <Stack.Screen name="LogoEles" component={LogoEles}/>
                <Stack.Screen name="Instrucoes" component={Instrucoes}/>
            </Stack.Navigator>
        </NavigationContainer>
    );    
 }


    // const [palavra, definirPalavra] = useState('');
    // const [corFundo, definirCorFundo] = useState('#FFFFFF');
    // const [corTexto, definirCorTexto] = useState('#000000');
    // const [inscricao, definirInscricao] = useState(null);
    // const [telaInicial, definirTelaInicial] = useState(true);
    // const [permiteSensor, definirPermiteSensor] = useState(false);
    // const [pontos, definirPontos] = useState(0);
    // const [ultimaTroca, setUltimaTroca] = useState(Date.now());
    // const [tempoRestante, setTempoRestante] = useState(60);
    // const [timerAtivo, setTimerAtivo] = useState(false);
    // const [sentidoUltimaRotacao, setSentidoUltimaRotacao] = useState(null);

    // Estados para sons
    // const [acertoSound, setAcertoSound] = useState(null);
    // const [puloSound, setPuloSound] = useState(null);

    // Carregar os sons
    // useEffect(() => {
    //     async function carregarSons() {
    //         const { sound: acerto } = await Audio.Sound.createAsync(
    //             require('./assets/correct-sound.mp3')  // <-- coloque o caminho correto aqui
    //         );
    //         const { sound: pulo } = await Audio.Sound.createAsync(
    //             require('./assets/wrong-sound.mp3')  // <-- coloque o caminho correto aqui
    //         );
    //         setAcertoSound(acerto);
    //         setPuloSound(pulo);
    //     }
    //     carregarSons();

    //     // Descarregar sons quando o componente desmontar
    //     return () => {
    //         if (acertoSound) acertoSound.unloadAsync();
    //         if (puloSound) puloSound.unloadAsync();
    //     };
    // }, []);

    // Usar a função de gerência de sons
//     useEffect(() => {
//         loadSounds();
//         return () => {
//             unloadSounds();
//         };
//     }, []);


    
//     useEffect(() => {
//         if (permiteSensor && timerAtivo) {
//             sortearPalavra();
//             iniciarSensor();
//             const timer = setInterval(() => {
//                 setTempoRestante((tempo) => {
//                     if (tempo <= 1) {
//                         clearInterval(timer);LogoEles
//                         finalizarJogo();
//                         return 0;
//                     }
//                     return tempo - 1;
//                 });
//             }, 1000);
//             return () => clearInterval(timer);
//         }
//     }, [permiteSensor, timerAtivo]);

//     const iniciarSensor = () => {
//         Gyroscope.setUpdateInterval(1000);

//         const sub = Gyroscope.addListener(({ y, x }) => {
//             const agora = Date.now();
//             const intervalo = agora - ultimaTroca;

//             if (intervalo < 500) return;

//             if (y < -1.3 && sentidoUltimaRotacao !== 'baixo') {
//                 setUltimaTroca(agora);
//                 setSentidoUltimaRotacao('baixo');
//                 definirPontos(pontos => pontos + 1);
//                 trocarPalavra();
//                 tocarSomAcerto();  // <-- toca som de acerto
//             }
//             else if (x > 1.0 && sentidoUltimaRotacao !== 'lado') {
//                 setUltimaTroca(agora);
//                 setSentidoUltimaRotacao('lado');
//                 trocarPalavra();
//                 tocarSomPulo();  // <-- toca som de pulo
//             }
//         });

//         definirInscricao(sub);
//     };

//     const tocarSomAcerto = async () => {
//         if (acertoSound) {
//             try {
//                 await acertoSound.replayAsync();
//             } catch (error) {
//                 console.log('Erro ao tocar som de acerto:', error);
//             }
//         }
//     };

//     const tocarSomPulo = async () => {
//         if (puloSound) {
//             try {
//                 await puloSound.replayAsync();
//             } catch (error) {
//                 console.log('Erro ao tocar som de pulo:', error);
//             }
//         }
//     };

//     const pararSensor = () => {
//         if (inscricao) {
//             inscricao.remove();
//             definirInscricao(null);
//         }
//     };

//     const trocarPalavra = () => {
//         const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
//         definirPalavra(novaPalavra);
//         definirCorTexto(prev => prev === '#000000' ? '#FFFFFF' : '#000000');
//         definirCorFundo(prev => obterCorAleatoria(prev));
//     };

//     const sortearPalavra = () => {
//         const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
//         definirPalavra(novaPalavra);
//         definirCorTexto(prev => prev === '#000000' ? '#FFFFFF' : '#000000');
//         definirCorFundo(prev => obterCorAleatoria(prev));
//     };

//     const reiniciarJogo = () => {
//         setTempoRestante(60);  
//         definirPontos(0);     
//         definirCorFundo('#FFFFFF'); 
//         definirCorTexto('#000000'); 
//         definirTelaInicial(true); 
//         setTimerAtivo(false);   
//         definirPermiteSensor(false); 
//         setSentidoUltimaRotacao(null); 
//     };

//     const finalizarJogo = () => {
//         setTimerAtivo(false); 
//     };

//     // Renderizações e funções de render seguem o mesmo padrão do seu código original
//     if (telaInicial) return renderTelaInicial();
//     if (!permiteSensor) return renderPermissao();
//     if (tempoRestante === 0) return renderTelaFinal();

//     return renderPalavra();

//     function renderTelaInicial() {
//         return (
//             <View style={[estilos.tela, { backgroundColor: '#FFFFFF' }]}>
//                 <Text style={estilos.titulo}>Adivinha quem sou?</Text>
//                 <Text style={estilos.instrucao}>Agite o celular para jogar!</Text>
//                 <Text style={estilos.instrucao}>👉 Vire para CIMA para pular a palavra</Text>
//                 <Text style={estilos.instrucao}>👉 Vire para BAIXO para marcar ponto</Text>
//                 <Text style={estilos.inscricao}>O tempo ou limite de rodadas é definido pelos jogadores. Boa sorte!</Text>

//                 <TouchableOpacity style={estilos.botao} onPress={() => { 
//                     definirTelaInicial(false);
//                     setTimerAtivo(true);
//                     definirPermiteSensor(true);
//                 }}>
//                     <Text style={estilos.textoBotao}>Continuar</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }

//     function renderPermissao() {
//         return (
//             <View style={[estilos.tela, { backgroundColor: '#FFFFFF' }]}>
//                 <Text style={estilos.titulo}>Permitir uso do giroscópio?</Text>
//                 <TouchableOpacity style={estilos.botao} onPress={() => definirPermiteSensor(true)}>
//                     <Text style={estilos.textoBotao}>Permitir</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }

//     function renderTelaFinal() {
//         return (
//             <View style={[estilos.tela, { backgroundColor: '#FFFFFF' }]}>
//                 <Text style={estilos.titulo}>Tempo Esgotado!</Text>
//                 <Text style={estilos.pontos}>Pontuação Final: {pontos}</Text>
//                 <TouchableOpacity style={estilos.botao} onPress={reiniciarJogo}>
//                     <Text style={estilos.textoBotao}>Jogar Novamente</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }

//     function renderPalavra() {
//         return (
//             <View style={[estilos.tela, { backgroundColor: corFundo }]}>
//                 <Text style={[estilos.palavra, { color: corTexto }]}>{palavra}</Text>
//                 <Text style={[estilos.pontos, { color: corTexto }]}>Pontos: {pontos}</Text>
//                 <Text style={[estilos.timer, { color: corTexto }]}>Tempo: {tempoRestante}s</Text>
//             </View>
//         );
//     }
// }LogoEles

// const estilos = StyleSheet.create({
//     tela: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingHorizontal: 20,
//     },
//     palavra: {
//         fontSize: 60,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 30,
//     },
//     titulo: {
//         fontSize: 36,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     instrucao: {
//         fontSize: 18,
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     inscricao: {
//         fontSize: 16,
//         textAlign: 'center',
//         marginBottom: 40,
//     },
//     botao: {
//         backgroundColor: '#ffa200ff',
//         paddingVertical: 12,
//         paddingHorizontal: 24,
//         borderRadius: 8,
//     },
//     textoBotao: {
//         color: '#FFFFFF',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     pontos: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginTop: 20,
//     },
//     timer: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginTop: 10,
//     },
// });
