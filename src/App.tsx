import React, { ReactNode } from 'react';

import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import { CellType } from './model/CellType';
import { Cell } from './components/Cell';
import { gameActions } from './redux/gameSlice';


function App() {
  const cells = useSelector<any, CellType[] |string>(state=>state.gameRow.cells);
  const dispatch = useDispatch();
  function getRow(): ReactNode {
    if(typeof cells == "string") {
      return <p>Game is over</p>
    }
        return cells.map(cell => <Cell width={'5vw'} cell={cell}
         clickFn={function (id: number): void {
         dispatch(gameActions.move(id))
        } }/>)
  }
return <div style={{display:'flex'}}>
    {getRow()}
</div>
}

export default App;