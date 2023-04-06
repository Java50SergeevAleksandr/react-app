import React from 'react';
import './App.css';
import { Timer } from './components/Timer';

function App() {
  return <div className='mainBox'>
    <div className='secondBox'>
      <Timer cityCountry="Minsk" />
      <Timer cityCountry="Israel" />
    </div>
    <div className='secondBox'>
      <Timer cityCountry="Japan" />
      <Timer cityCountry="arto" />
    </div>
  </div>
}

export default App;