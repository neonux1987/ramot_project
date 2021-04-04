import { useState, useEffect, useCallback } from 'react';
import { print } from '../services/print.svc';

const usePrint = (id) => {

  const [generating, setGenerating] = useState(true);
  const [output, setOutput] = useState(null);

  useEffect(() => {
    const element = document.getElementById(id);

    print(element).then((data) => {
      setGenerating(false);
      setOutput(data);
    });
  }, [id]);


  return [generating, output];
}

export default usePrint;