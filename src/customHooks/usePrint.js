import { useState, useEffect, useCallback } from 'react';
import { generatePreview, print } from '../services/print.svc';

const usePrint = () => {

  const [generating, setGenerating] = useState(true);
  const [output, setOutput] = useState(null);
  const [options, setOptions] = useState(null);

  const generate = useCallback((options) => {
    generatePreview(options).then((data) => {
      setGenerating(false);
      setOutput(data);
    });
  }, []);

  const initiateGeneration = useCallback((options) => {
    setGenerating(true);
    setOptions(options);
  }, []);

  useEffect(() => {
    if (options !== null)
      generate(options);
  }, [options, generate]);

  return [generating, output, initiateGeneration, print];
}

export default usePrint;