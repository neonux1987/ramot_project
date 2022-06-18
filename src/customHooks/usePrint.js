import { useCallback, useState } from "react";
import { printPreview, print as printSvc } from "../services/print.svc";
import { toastManager } from "../toasts/toastManager";

const usePrint = () => {
  const [generatingPreview, setGeneratingPreview] = useState(true);
  const [output, setOutput] = useState(null);

  // Send print preview request to the Main process
  const generatePreview = useCallback((componentRef, options) => {
    return new Promise(() => {
      const printableHTML = createPrintableHtml(componentRef);

      let blob = new Blob([printableHTML], {
        type: "text/html;charset=utf-8"
      });
      let url = URL.createObjectURL(blob);

      printPreview(options, url).then((result) => {
        setGeneratingPreview(false);
        setOutput(result);
      });
    });
  }, []);

  // Send print request to the Main process
  const print = useCallback(
    (options) => {
      if (output === null) {
        toastManager.error("תצוגת הדפסה עדיין לא מוכנה");
        return;
      }

      printSvc(options, output);
    },
    [output]
  );

  return {
    generatePreview,
    generatingPreview,
    output,
    print
  };
};

export default usePrint;

function createPrintableHtml(componentRef) {
  let ownerDocument = componentRef.current.ownerDocument;
  const headElement = ownerDocument.head.cloneNode(true);
  const targetElement = componentRef.current.cloneNode(true);

  const doc = document.implementation.createDocument(
    "http://www.w3.org/1999/xhtml",
    "html",
    null
  );
  doc.documentElement.appendChild(headElement);
  const body = doc.createElementNS("http://www.w3.org/1999/xhtml", "body");
  doc.documentElement.appendChild(body);
  body.append(targetElement);

  return doc.documentElement.outerHTML;
}
