import error from '../assets/audio/error.wav'
import message from '../assets/audio/message.wav'
import welcome from '../assets/audio/welcome2.wav'

export const soundTypes = {
  error: "error",
  message: "message",
  welcome: "welcome"
}

export const playSound = (type) => {

  var audio = new Audio();
  audio.currentTime = 0;
  let delayTime = 0;

  switch (type) {
    case "error":
      audio.src = error;
      audio.volume = 0.1;
      delayTime = 0;
      break;
    case "message":
      audio.src = message;
      audio.volume = 0.15;
      delayTime = 0;
      break;
    case "welcome":
      audio.src = welcome;
      audio.volume = 0.05;
      break;
    default:
      audio.src = message;
      audio.volume = 0.15;
      delayTime = 0;
  }

  setTimeout(() => {
    audio.play();
  }, delayTime);

}