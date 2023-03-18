import { CellType } from "../model/CellType";
import { getColors } from "../util/colors";
import { getRandomElement } from "../util/random";
import GameRow from "./GameRow";

export default class GameRowSimpleColors implements GameRow {
    row: CellType[];
    constructor(nCells: number) {
        this.row = Array.from({ length: nCells })
            .map((__, index) => (
                {
                    cellColor: getRandomElement(getColors()), borderColor: "black",
                    cellContent: '', id: index
                }));
    }
    getInitialRow(): CellType[] {
        return this.row;
    }
    move(id: number): string | CellType[] {
        let res: string | CellType[];
        this.isOver()
            ? res = "game is over"
            : this.row[id].cellColor = "black";           
       return res = this.row.slice();
    }
isOver(): boolean {
    return this.row.every(cell => cell.cellColor == 'black')
}

}