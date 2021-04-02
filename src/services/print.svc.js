import { openItem } from './mainProcess.svc';

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

      doc.setFont("sans-serif");

      doc.html(element, {
        callback: function (doc) {
          doc.autoPrint({ variant: 'non-conform' });

          const outputPath = path.join(os.tmpdir(), "print.pdf");

          fs.writeFile(outputPath, doc.output(), function (err) {
            if (err) {
              console.log(err);
            } else {
              //openItem(outputPath);
              console.log('PDF Generated Successfully');
            }
          });


          //doc.save("test");
        },
        x: 0,
        y: 0,
        fontFaces: [{
          family: "sans-serif"
        }],
        html2canvas: {
          scale: 0.245
        }
      });

      //doc.addImage(dataUrl, 'JPEG', 0, 0, width, height);
      //doc.save(path.join(SystemPaths.paths.user_main_folder, "dada.pdf"));

    });


};