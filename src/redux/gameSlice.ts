import { createSlice } from "@reduxjs/toolkit";
import { game } from "../config/game-service-config";
import { CellType } from "../model/CellType";

const initialState: { cells: CellType[] | string } = {
    cells: game.getInitialRow()
}
const gameSlice = createSlice({
    initialState,
    name: "gameRow",
    reducers: {
        move: (state, data) => {
            state.cells = game.move(data.payload);
        },
        reset: (state) => {
            state.cells = game.getInitialRow();
        }
    }
})
export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;