import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { print as prnt } from '../services/print.svc';

const usePrint = (template) => {

  const [generating, setGenerating] = useState(true);
  const [output, setOutput] = useState(null);
  const [options, setOptions] = useState(true);

  useEffect(() => {
    print();
  }, [options, print]);

  const print = useCallback(() => {
    prnt(template).then((data) => {
      setGenerating(false);
      setOutput(data);
    });
  }, [template]);

  const preview = (options) => {
    setGenerating(true);
    setOptions(options);
  }

  return [generating, output, preview];
}

export default usePrint;