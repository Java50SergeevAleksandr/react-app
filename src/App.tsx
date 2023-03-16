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
    {!(authState)
      ? <Login />
      : (authState.includes("admin"))
        ? <>
          <CounterUpdater operand={10} />
          <CounterMultiply factor={2} />
          <CounterSquare />
          <Logout />
        </>
        : <>
          <CounterUpdater operand={10} />
          <CounterSquare />
          <Logout />
        </>
    }
  </div>
}

export default App;