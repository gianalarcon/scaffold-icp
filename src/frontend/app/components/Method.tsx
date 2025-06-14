"use client";

import React, { useState, useEffect } from 'react';
import { Actor, ActorSubclass } from '@dfinity/agent';
import { renderInput } from '@dfinity/candid';
import { backend } from '@/app/declarations/backend';
import MethodList from './MethodList';
import QueryMethods from './QueryMethods';
import { MethodInfo } from '../types/method';
import { _SERVICE } from '@/app/declarations/backend/backend.did';

export type Backend = ActorSubclass<_SERVICE> & {
  [key: string]: (...args: any[]) => Promise<any>;
};

const Method: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [methods, setMethods] = useState<[string, MethodInfo['info']][]>([]);
  const [results, setResults] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [inputBoxes, setInputBoxes] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const initActor = async () => {
      try {        
        const availableMethods = Actor.interfaceOf(backend)._fields
          .sort(([a], [b]) => (a > b ? 1 : -1));

        // Filter out query methods without arguments
        const updateMethods = availableMethods.filter(([_, info]) => {
          // Keep methods that either:
          // 1. Have arguments (argTypes.length > 0)
          // 2. Are not query methods (!info.annotations.includes('query'))
          return info.argTypes.length > 0 || !info.annotations.includes('query');
        });

        setMethods(updateMethods);

        const boxes: Record<string, any[]> = {};
        updateMethods.forEach(([name, info]) => {
          if (info.argTypes.length > 0) {
            boxes[name] = info.argTypes.map(type => renderInput(type));
          }
        });
        setInputBoxes(boxes);
      } catch (error) {
        console.error("Failed to initialize actor:", error);
      }
    };

    setMounted(true);
    initActor();
  }, [backend]);

  const handleMethodCall = async (methodName: string): Promise<void> => {
    if (!backend) {
      setErrors(prev => ({ ...prev, [methodName]: 'Actor not initialized' }));
      return;
    }

    setLoading(prev => ({ ...prev, [methodName]: true }));
    setErrors(prev => ({ ...prev, [methodName]: null }));
    setResults(prev => ({ ...prev, [methodName]: null }));

    try {
      const boxes = inputBoxes[methodName] || [];
      
      const args = boxes.map(box => box.parse());
      const isReject = boxes.some(box => box.isRejected());
      
      if (isReject) {
        throw new Error('Invalid input values');
      }

      const callResult = await (backend as Backend)[methodName](...args);
      setResults(prev => ({ ...prev, [methodName]: callResult }));
    } catch (err) {
      setErrors(prev => ({ ...prev, [methodName]: err instanceof Error ? err.message : 'Unknown error' }));
    } finally {
      setLoading(prev => ({ ...prev, [methodName]: false }));
    }
  };

  if (!mounted || !backend) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <QueryMethods />
      <MethodList
        methods={methods}
        inputBoxes={inputBoxes}
        loading={loading}
        errors={errors}
        results={results}
        onMethodCall={handleMethodCall}
      />
    </div>
  );
};

export default Method; 