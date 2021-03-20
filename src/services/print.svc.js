import { remote } from 'electron';

export const saveToPdf = () => {

  const contents = remote.getCurrentWebContents();
  contents.printToPDF({});

};