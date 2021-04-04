import { openItem } from './mainProcess.svc';
import './Assistant-Regular-normal';
import { withWidth } from '@material-ui/core';

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

  const ratio = width / height;

  /* const canvas = await html2canvas(element, {
    scale: 0.65,
    width: element.scrollWidth,
    height: element.scrollHeight
  });
  doc.addImage(canvas, 0, 0);

  const pdfBlob = doc.output('bloburl');

  return {
    pages: doc.internal.getNumberOfPages(),
    pdfBlob,
    scale: doc.internal.scaleFactor
  }; */

  return new Promise((resolve, reject) => {

    doc.html(element, {
      callback: function (doc) {
        //doc.autoPrint({ variant: 'non-conform' });

        const outputPath = path.join(os.tmpdir(), "print.pdf");

        const pdfBlob = doc.output('bloburl');
        resolve({
          pages: doc.internal.getNumberOfPages(),
          pdfBlob,
          scale: doc.internal.scaleFactor
        });
        /* fs.writeFile(outputPath, doc.output(), function (err) {
          if (err) {
            console.log(err);
            reject();
          } else {
            //openItem(outputPath);
            resolve(pdfBlob);
            console.log('PDF Generated Successfully');
          }
        }); */


        //doc.save("test");
      },
      margin: 80,
      x: 0,
      y: 0,
      html2canvas: {
        scale: 0.5,
        width,
        height
      }
    });

  });

};