import error from '../assets/audio/error.wav';
import message from '../assets/audio/message.wav';
import welcome from '../assets/audio/welcome.wav';
import update from '../assets/audio/update.mp3';

const remote = require('electron').remote;

const TYPES = {
  error: "error",
  message: "message",
  welcome: "welcome",
  update: "update"
}

class SoundManager {

  settings = remote.getGlobal("sharedObject").settings.notifications;
  types = TYPES;

  play = (type) => {
    if (this.settings.soundEnabled)
      playSound(type);
  }

  reload = () => {
    this.settings = remote.getGlobal("sharedObject").settings.notifications;
  }



}

export default new SoundManager();

const playSound = (type) => {

  var audio = new Audio();
  audio.currentTime = 0;

  switch (type) {
    case TYPES.error:
      audio.src = error;
      audio.volume = 0.1;
      break;
    case TYPES.message:
      audio.src = message;
      audio.volume = 0.15;
      break;
    case TYPES.welcome:
      audio.src = welcome;
      audio.volume = 0.15;
      break;
    case TYPES.update:
      audio.src = update;
      audio.volume = 0.15;
      break;
    default:
      audio.src = message;
      audio.volume = 0.15;
  }

  audio.play();

}