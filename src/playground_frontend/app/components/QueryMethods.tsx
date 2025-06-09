"use client";

import React, { useState, useEffect } from 'react';
import { useQueryCall } from '../actor/actor';
import { Actor } from '@dfinity/agent';
import { playground_backend } from '@/app/declarations/playground_backend';
import { _SERVICE } from '@/app/declarations/playground_backend/playground_backend.did';

const QueryMethods: React.FC = () => {
  const [queryMethods, setQueryMethods] = useState<[string, any][]>([]);

  useEffect(() => {
    const initQueryMethods = () => {
      const availableMethods = Actor.interfaceOf(playground_backend)._fields;
      // Filter for query methods without arguments
      const noArgQueryMethods = availableMethods.filter(([_, info]) => 
        info.annotations.includes('query') && info.argTypes.length === 0
      );
      setQueryMethods(noArgQueryMethods);
    };

    initQueryMethods();
  }, [playground_backend]);

  return (
    <div key={queryMethods.toString()} style={{ marginTop: '20px' }}>
      <h3>Query Methods (Auto-refreshing)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {queryMethods.map(([methodName, _]) => (
          <div key={methodName} style={{ 
            padding: '15px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
          }}>
            <h4>{methodName}()</h4>
            <QueryMethodResult methodName={methodName as keyof _SERVICE} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Separate component for each query method result
const QueryMethodResult: React.FC<{ methodName: keyof _SERVICE }> = ({ methodName }) => {
  const { data, error, refetch } = useQueryCall({
    functionName: methodName,
    args: [],
    refetchOnMount: true,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error.message}</div>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div>
        Result: {data !== undefined ? 
          (typeof data === 'bigint' ? data.toString() : JSON.stringify(data)) 
          : 'Loading...'}
      </div>
      <button
        onClick={() => refetch()}
        style={{
          padding: '4px 8px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9em'
        }}
      >
        Refresh
      </button>
    </div>
  );
};

export default QueryMethods; 