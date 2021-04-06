import { useState, useEffect } from 'react';
import { print } from '../services/print.svc';

const usePrint = () => {

  const [generating, setGenerating] = useState(true);
  const [output, setOutput] = useState(null);

  useEffect(() => {
    print().then((data) => {
      setGenerating(false);
      setOutput(data);
    });
  }, []);


  return [generating, output];
}

export default usePrint;