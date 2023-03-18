import React from 'react';

import './App.css';
import { CounterMultiply } from './components/CounterMultiply';
import { CounterSquare } from './components/CounterSquare';
import { CounterUpdater } from './components/CounterUpdater';
import { useSelector } from 'react-redux';
import { Login } from './components/Login';
import { Logout } from './components/Logout'

function App() {
  const authState = useSelector<any, string>(state => state.auth.authUser);

  return <div style={{

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  }}>
      {authState && <CounterUpdater operand={10}/>}
    {authState.includes('admin') &&<CounterMultiply factor={2}/>}
    {authState && <CounterSquare/>}
    {authState && <Logout/>}
    {!authState && <Login/>}
  </div>
}

export default App;