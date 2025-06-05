"use client";

import React, { useEffect, useState } from 'react';
import { useQueryCall, useUpdateCall } from '../actor/actor';

const Counter: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { call, data } = useQueryCall({
    functionName: 'getCount',
    args: [],
    refetchOnMount: true,
    refetchInterval: 5000,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ marginTop: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Counter: {data !== undefined ? Number(data) : 'Loading...'}</h2>
    </div>
  );
};

export default Counter; 