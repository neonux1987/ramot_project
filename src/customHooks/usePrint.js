import { useState, useCallback } from "react";
import { generatePreview, print } from "../services/print.svc";

/* 
  this hook manages the state and outpute
  of generating a print preview
*/
const usePrint = () => {
  const [generating, setGenerating] = useState(true);
  const [output, setOutput] = useState(null);

  const generate = useCallback((options) => {
    setGenerating(true);
    generatePreview(options).then((data) => {
      setGenerating(false);
      setOutput(data);
    });
  }, []);

  return [generating, output, generate, print];
};

export default usePrint;
