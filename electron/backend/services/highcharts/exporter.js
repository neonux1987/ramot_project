async function exportChart(chartExporter, fse, options, filename) {
  return new Promise((resolve, reject) => {
    // Export chart using these options
    chartExporter.export({
      type: "png",
      // By default the width of the chart images is of 600
      // In this case, we want a big image
      width: 1200,
      options
    }, async (err, res) => {
      // Get the image data (base64)
      let imageb64 = res.data;

      // Save the image data to a file
      const result = await fse.writeFile(filename, imageb64, "base64");

      console.log(result);
      if (err)
        reject();
      else
        resolve();

    });
  })

}

module.exports = {
  exportChart
}