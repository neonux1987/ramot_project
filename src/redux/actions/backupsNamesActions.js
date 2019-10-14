import { ipcRenderer } from 'electron';
import React from 'react';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';
import ToastRender from '../../components/ToastRender/ToastRender';

/**
 * fetch general settings
 * @param {*} params 
 */
const fetchBackupsNames = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSettings());

    //request request to backend to get the data
    ipcRenderer.send("get-backups-names");
    //listen when the data comes back
    ipcRenderer.once("backups-names-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveSettings(arg.data));
      }
    });
  }
};

const requestSettings = function () {
  return {
    type: "REQUEST_BACKUPS_NAMES"
  }
};

const receiveSettings = function (data) {
  return {
    type: "RECEIVE_BACKUPS_NAMES",
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "BACKUPS_NAMES_FETCHING_FAILED",
    payload: error
  }
};






export default {
  fetchBackupsNames
};