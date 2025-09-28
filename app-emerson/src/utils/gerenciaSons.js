import { Audio } from 'expo-av';

let acertoSound, puloSound;

export const loadSounds = async () => {
  const { sound: acerto } = await Audio.Sound.createAsync(require('../../assets/acertoPluh.mp3'));
  const { sound: pulo } = await Audio.Sound.createAsync(require('../../assets/puloOhHellNah.mp3'));
  acertoSound = acerto;
  puloSound = pulo;
};

export const tocarSomAcerto = async () => {
  if (acertoSound) await acertoSound.replayAsync();
};

export const tocarSomPulo = async () => {
  if (puloSound) await puloSound.replayAsync();
};

export const unloadSounds = async () => {
  if (acertoSound) await acertoSound.unloadAsync();
  if (puloSound) await puloSound.unloadAsync();
}; //liberar memoria

export default { loadSounds, tocarSomAcerto, tocarSomPulo, unloadSounds };