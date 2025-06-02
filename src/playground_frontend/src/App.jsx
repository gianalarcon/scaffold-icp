import { useState, useEffect } from 'react';
import { createActor, playground_backend } from '../../declarations/playground_backend';
import { Actor } from '@dfinity/agent';
import { renderInput, renderValue } from '@dfinity/candid';

function App() {
  const [methods, setMethods] = useState([]);
  const [results, setResults] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState({});
  const [count, setCount] = useState(0);
  const [inputBoxes, setInputBoxes] = useState({});
  const [activeTab, setActiveTab] = useState('query');

  useEffect(() => {
    const interval = setInterval(() => {
      playground_backend.getCount().then((count) =>{
        setCount(Number(count))
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const availableMethods = Actor.interfaceOf(playground_backend)._fields
      .sort(([a], [b]) => (a > b ? 1 : -1));
    setMethods(availableMethods);

    const boxes = {};
    availableMethods.forEach(([name, info]) => {
      if (info.argTypes.length > 0) {
        boxes[name] = info.argTypes.map(type => renderInput(type));
      }
    });
    setInputBoxes(boxes);
  }, []);

  const handleMethodCall = async (methodName) => {
    setLoading(prev => ({ ...prev, [methodName]: true }));
    setErrors(prev => ({ ...prev, [methodName]: null }));
    setResults(prev => ({ ...prev, [methodName]: null }));

    try {
      const methodInfo = methods.find(([name]) => name === methodName);
      const boxes = inputBoxes[methodName] || [];
      
      const args = boxes.map(box => box.parse());
      const isReject = boxes.some(box => box.isRejected());
      
      if (isReject) {
        throw new Error('Invalid input values');
      }

      const callResult = await playground_backend[methodName](...args);
      setResults(prev => ({ ...prev, [methodName]: callResult }));
    } catch (err) {
      setErrors(prev => ({ ...prev, [methodName]: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, [methodName]: false }));
    }
  };

  const getMethodDisplay = (methodInfo) => {
    const [name, info] = methodInfo;
    const args = info.argTypes.map(type => type.name.toLowerCase()).join(', ');
    return `${name}(${args})`;
  };

  const renderMethodInputs = (methodInfo) => {
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

  const renderMethod = (methodInfo) => {
    const [name, info] = methodInfo;
    const needsInput = info.argTypes.length > 0;
    const isQuery = info.annotations.includes('query');
    
    return (
      <div key={name} style={{ 
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
            onClick={() => handleMethodCall(name)}
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

  const queryMethods = methods.filter(([_, info]) => info.annotations.includes('query'));
  const updateMethods = methods.filter(([_, info]) => !info.annotations.includes('query'));

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <img src="/logo2.svg" alt="DFINITY logo" style={{ maxWidth: '200px' }} />
      
      <div style={{ marginTop: '20px' }}>
        <h2>Counter: {count}</h2>
      </div>

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
            ? queryMethods.map(renderMethod)
            : updateMethods.map(renderMethod)
          }
        </div>
      </div>
    </main>
  );
}

export default App;
