import React from "react";
import '../css/CounterUpdater.css';
import { useDispatch } from 'react-redux';
import { counterActions } from "../redux/counterSlice";
import { useSelector } from 'react-redux';
type Props = {
    operand: number
}
export const CounterUpdater: React.FC<Props> = ({ operand }) => {
    const dispatch = useDispatch();
    const authState = useSelector<any, string>(state => state.auth.authUser);
    let className = 'button-inactive';
    if (authState.includes("admin")) {
        className = 'button-active';
    }
    return <div style={{
        width: "30%",
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-around',
    }}>
        <button onClick={() => dispatch(counterActions.increment(operand))}>
            Increment</button>
        <button onClick={() => dispatch(counterActions.decrement(operand))}>
            Decrement</button>
        <button className={className} onClick={() => dispatch(counterActions.reset())}>
            Reset</button>
    </div>
}