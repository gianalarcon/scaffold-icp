"use client";

import React from 'react';
import { MethodItemProps } from '../types/method';

const MethodItem: React.FC<MethodItemProps> = ({ 
  methodInfo, 
  inputBoxes, 
  loading, 
  errors, 
  results, 
  onMethodCall 
}) => {
  const [name, info] = methodInfo;
  const needsInput = info.argTypes.length > 0;
  const isQuery = info.annotations.includes('query');

  const getMethodDisplay = (methodInfo: [string, MethodItemProps['methodInfo'][1]]): string => {
    const [name, info] = methodInfo;
    const args = info.argTypes.map(type => type.name.toLowerCase()).join(', ');
    return `${name}(${args})`;
  };

  const renderMethodInputs = (methodInfo: [string, MethodItemProps['methodInfo'][1]]) => {
    const [name, info] = methodInfo;
    const boxes = inputBoxes[name] || [];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {boxes.map((box, index) => (
          <div key={index} ref={el => {
            if (el && !el.hasChildNodes()) {
              box.render(el);
            }
          }} />
        ))}
      </div>
    );
  };

  return (
    <div style={{ 
      padding: '15px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      marginBottom: '10px'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <h4 style={{ margin: '0 0 5px 0' }}>{getMethodDisplay(methodInfo)}</h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {needsInput && renderMethodInputs(methodInfo)}

        <button 
          onClick={() => onMethodCall(name)}
          disabled={loading[name]}
          style={{ 
            padding: '8px 16px',
            backgroundColor: isQuery ? '#4caf50' : '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading[name] ? 'not-allowed' : 'pointer',
            opacity: loading[name] ? 0.7 : 1,
            minWidth: '100px',
            alignSelf: 'flex-start'
          }}
        >
          {loading[name] ? 'Calling...' : (isQuery ? 'Query' : 'Call')}
        </button>
      </div>

      {errors[name] && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          color: '#c62828',
          borderRadius: '4px'
        }}>
          Error: {errors[name]}
        </div>
      )}

      {results[name] !== null && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px', 
          backgroundColor: '#e8f5e9', 
          borderRadius: '4px'
        }}>
          Result: {JSON.stringify(results[name], (key, value) => 
            typeof value === 'bigint' ? value.toString() : value
          )}
        </div>
      )}
    </div>
  );
};

export default MethodItem; 