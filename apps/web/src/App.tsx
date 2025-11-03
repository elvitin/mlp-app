//import { useState } from 'react';

import { add } from '@elvitin/utils/add';
import React from 'react';
import { Button } from '@/components/ui/button';

//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

function App() {
  const sum = React.useCallback(() => add(Math.random() * 1_00, Math.random() * 1_00), []);
  const [sumValue, setSumValue] = React.useState(() => sum());

  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <Button
        onClick={() => {
          setSumValue(Number(sum().toFixed(2)));
        }}>
        Soma: {sumValue}
      </Button>
    </div>
  );
}

export { App };
