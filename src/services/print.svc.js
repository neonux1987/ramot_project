import { openItem } from './mainProcess.svc';
import './Assistant-Regular-normal';
import html2canvas from 'html2canvas';
export const print = (element) => {

  return import('jspdf')
    .then(({ jsPDF }) => {

      const path = require('path');
      const fs = require('fs');
      const os = require('os');

      const doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: "a4"
      });

      doc.setFont("Assistant-Regular");

      return new Promise((resolve, reject) => {

        doc.html(element, {
          callback: function (doc) {
            //doc.autoPrint({ variant: 'non-conform' });

            const outputPath = path.join(os.tmpdir(), "print.pdf");

            const pdfBlob = doc.output('bloburl');

            fs.writeFile(outputPath, doc.output(), function (err) {
              if (err) {
                console.log(err);
                reject();
              } else {
                //openItem(outputPath);
                resolve(pdfBlob);
                console.log('PDF Generated Successfully');
              }
            });


            //doc.save("test");
          },
          x: 0,
          y: 0,
          html2canvas: {
            scale: 0.18,
            width: element.scrollWidth,
            height: element.scrollHeight
          }
        });

      });

    });


};