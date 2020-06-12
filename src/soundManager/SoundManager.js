import action from '../assets/audio/action.wav';
import error from '../assets/audio/error.wav';
import message from '../assets/audio/message.wav';
import welcome from '../assets/audio/welcome.wav';
import update from '../assets/audio/update.wav';
import { useState } from 'react';
import { useEffect } from 'react';

const remote = require('electron').remote;

const TYPES = {
  action: "action",
  error: "error",
  message: "message",
  welcome: "welcome",
  update: "update",
}

class SoundManager {

  constructor() {
    this.systemSettings = remote.getGlobal("sharedObject").settings.system;
    this.systemSound = null;
  }

  types = TYPES;

  reload = () => {
    this.systemSettings = remote.getGlobal("sharedObject").settings.system;
  }

  play = (type) => {
    const { soundEnabled, soundVolume } = this.systemSettings;
    if (soundEnabled === false)
      return;

    // init for the next sound
    this.systemSound = new Audio();
    this.systemSound.volume = soundVolume;
    this.systemSound.preload = "auto";

    switch (type) {
      case TYPES.action:
        this.systemSound.src = action;
        break;
      case TYPES.error:
        this.systemSound.src = error;
        break;
      case TYPES.message:
        this.systemSound.src = message;
        break;
      case TYPES.welcome:
        this.systemSound.src = welcome;
        break;
      case TYPES.update:
        this.systemSound.src = update;
        break;
      default:
        this.systemSound.src = message;
    }

    this.systemSound.play()
      .catch(() => {
        // Auto-play was prevented
      });

  }

}

export const soundManager = new SoundManager();

export const useSound = (url, options) => {
  const { soundEnabled, soundVolume } = remote.getGlobal("sharedObject").settings.system;

  let audio = null;

  const [localOptions, setLocalOptions] = useState({
    soundEnabled,
    soundVolume,
    src: url,
    currentTime: 0,
    reverse: 0,
    ...options
  });

  useEffect(() => {
    setLocalOptions(prevOptions => ({
      ...prevOptions,
      soundEnabled,
      soundVolume
    }));
  }, [soundEnabled, soundVolume]);

  const setOptions = (options) => {
    setLocalOptions(prevOptions => ({
      ...prevOptions,
      ...options
    }));
  }

  const play = (type) => {
    // let the user pass a type of chosen
    // sounds instead of passing own url
    if ((url === undefined || url === null) && type) {
      soundManager.play(type);
      return;
    }

    audio = new Audio();
    audio.src = localOptions.src;
    audio.volume = localOptions.soundVolume;
    audio.currentTime = localOptions.currentTime;

    // regular sound play
    if (localOptions.soundEnabled && localOptions.reverse === 0) {
      audio.play();
    }

    // play sound on reverse logic
    if (localOptions.reverse === 1 && localOptions.soundEnabled === false) {
      audio.play();
    }
  }

  const pause = () => {
    if (audio !== null)
      audio.pause();
  }

  return {
    play,
    setOptions,
    pause,
    types: soundManager.types
  }
}