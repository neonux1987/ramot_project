import error from '../assets/audio/error.wav'
import message from '../assets/audio/message.wav'
import welcome from '../assets/audio/welcome2.wav'

export const soundTypes = {
  error: "error",
  message: "message",
  welcome: "welcome"
}

export const playSound = (type) => {

  var audio = null;

  switch (type) {
    case "error":
      setTimeout(() => {
        audio = new Audio(error);
        audio.volume = 0.1;
        audio.currentTime = 0;
        audio.play();
      }, 200);
      break;
    case "message":
      setTimeout(() => {
        audio = new Audio(message);
        audio.volume = 0.15;
        audio.currentTime = 0;
        audio.play();
      }, 200);
      break;
    case "welcome":
      audio = new Audio(welcome);
      audio.volume = 0.05;
      audio.currentTime = 0;
      audio.play();
      break;
    default:
      setTimeout(() => {
        audio = new Audio(message);
        audio.volume = 0.15;
        audio.currentTime = 0;
        audio.play();
      }, 200);
  }


}