import error from '../assets/audio/error.wav';
import message from '../assets/audio/message.wav';
import welcome from '../assets/audio/welcome.wav';
import update from '../assets/audio/update.mp3';
import localStore from '../customHooks/localStore';

export const soundTypes = {
  error: "error",
  message: "message",
  welcome: "welcome",
  update: "update"
}

export const soundManager = () => {

  const { getItem } = localStore();
  const settings = getItem("settings").notifications;

  var audio = new Audio();
  audio.currentTime = 0;

  const types = {
    error: "error",
    message: "message",
    welcome: "welcome",
    update: "update"
  }

  const play = (type = types.message) => {
    console.log(settings.soundEnabled);
    if (settings.soundEnabled)
      playSound(type);
  };

  return {
    play,
    types
  }

};

export const playSound = (type) => {

  var audio = new Audio();
  audio.currentTime = 0;

  switch (type) {
    case "error":
      audio.src = error;
      audio.volume = 0.1;
      break;
    case "message":
      audio.src = message;
      audio.volume = 0.15;
      break;
    case "welcome":
      audio.src = welcome;
      audio.volume = 0.15;
      break;
    case "update":
      audio.src = update;
      audio.volume = 0.15;
      break;
    default:
      audio.src = message;
      audio.volume = 0.15;
  }

  audio.play();

}