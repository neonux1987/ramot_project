async function execute() {
  const { parentPort, workerData } = require("worker_threads");

  const { PDFDocument } = require("pdf-lib");

  const doc = await PDFDocument.load(workerData);
  const pages = doc.getPages();

  for (let i = 0; i < pages.length; i++) {
    pages[i].drawText(`${i + 1}/${pages.length}`, {
      x: 10,
      y: 10,
      size: 14
    });
  }

  parentPort.postMessage({ pageCount: pages.length, output: await doc.save() });
}

execute();
