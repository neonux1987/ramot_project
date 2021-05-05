async function exportChart({ chartExporter, fse, template, filename }) {
  return new Promise((resolve, reject) => {
    // Export chart using these options
    chartExporter.export({
      type: "png",
      // By default the width of the chart images is of 600
      // In this case, we want a big image
      width: 1200,
      options: template
    }, async (err, res) => {
      if (err)
        reject();

      // Get the image data (base64)
      let imageb64 = res.data;

      try {
        const fileContents = Buffer.from(imageb64, 'base64');
        await fse.writeFile(filename, fileContents);
        resolve();
      } catch (e) {
        console.log(e);
        reject();
      }

    });
  })

}

module.exports = {
  exportChart
}