import error from '../assets/audio/error.wav';
import message from '../assets/audio/message.wav';
import welcome from '../assets/audio/welcome.wav';
import update from '../assets/audio/update.mp3';

export const soundTypes = {
  error: "error",
  message: "message",
  welcome: "welcome",
  update: "update"
}

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