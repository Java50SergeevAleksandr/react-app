import React, { ReactNode } from 'react';

import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import { CellType } from './model/CellType';
import { Cell } from './components/Cell';
import { gameActions } from './redux/gameSlice';


function App() {
  const st1: React.CSSProperties = { color: "red", fontSize: "1.5em", marginBottom: "2vw"};
  const cells = useSelector<any, CellType[] | string>(state => state.gameRow.cells);
  const dispatch = useDispatch();
  const status =  (typeof cells == "string");
  function getRow(): ReactNode {
    if (status) {
      return <p style={st1}>Game is over</p>
    }
    return cells.map(cell => <Cell width={'5vw'} cell={cell}
      clickFn={function (id: number): void {
        dispatch(gameActions.move(id))
      }} />)
  }
  return <>
    <div style={{ display: 'flex' }}>
      {getRow()}
    </div>
    {status && <button onClick={()=> dispatch(gameActions.reset())} style={{fontSize: "1.5em"}}>Restart</button>}
  </>
}

export default App;