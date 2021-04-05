import { openItem } from './mainProcess.svc';
import './Assistant-Regular-normal';
import { withWidth } from '@material-ui/core';
import html2canvas from 'html2canvas';
import { ipcRenderer } from 'electron';

export const print = async (element) => {

  const { jsPDF } = await import('jspdf');

  const path = require('path');
  const fs = require('fs');
  const os = require('os');

  const doc = new jsPDF({
    orientation: 'l',
    unit: 'pt',
    format: "a4"
  });

  doc.setFont("Assistant-Regular");
  //doc.setR2L(true);

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  console.log(width);
  const ratio = width / height;

  const canvas = await html2canvas(element, {
    width: element.scrollWidth,
    height: element.scrollHeight,
    scrollX: element.scrollWidth,
    scrollY: element.scrollHeight,
    x: 0,
    y: 0
  });
  doc.addImage(canvas, 0, 0);

  const pdfBlob = doc.output('bloburl');

  return {
    pages: doc.internal.getNumberOfPages(),
    pdfBlob,
    scale: doc.internal.scaleFactor
  };



};

export const print2 = () => {

  ipcRenderer.send("print-content");


}