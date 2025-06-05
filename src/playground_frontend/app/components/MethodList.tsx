"use client";

import React, { useState } from 'react';
import MethodItem from './MethodItem';
import { MethodListProps } from '../types/method';

const MethodList: React.FC<MethodListProps> = ({ 
  methods, 
  inputBoxes, 
  loading, 
  errors, 
  results, 
  onMethodCall 
}) => {
  const [activeTab, setActiveTab] = useState<'query' | 'update'>('query');

  const queryMethods = methods.filter(([_, info]) => info.annotations.includes('query'));
  const updateMethods = methods.filter(([_, info]) => !info.annotations.includes('query'));

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        <button
          onClick={() => setActiveTab('query')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'query' ? '#4caf50' : '#e0e0e0',
            color: activeTab === 'query' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Query Methods ({queryMethods.length})
        </button>
        <button
          onClick={() => setActiveTab('update')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'update' ? '#2196f3' : '#e0e0e0',
            color: activeTab === 'update' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Update Methods ({updateMethods.length})
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {activeTab === 'query' 
          ? queryMethods.map(methodInfo => (
              <MethodItem
                key={methodInfo[0]}
                methodInfo={methodInfo}
                inputBoxes={inputBoxes}
                loading={loading}
                errors={errors}
                results={results}
                onMethodCall={onMethodCall}
              />
            ))
          : updateMethods.map(methodInfo => (
              <MethodItem
                key={methodInfo[0]}
                methodInfo={methodInfo}
                inputBoxes={inputBoxes}
                loading={loading}
                errors={errors}
                results={results}
                onMethodCall={onMethodCall}
              />
            ))
        }
      </div>
    </div>
  );
};

export default MethodList; 