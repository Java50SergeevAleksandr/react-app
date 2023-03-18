import { CellType } from "../model/CellType";
import { getColors } from "../util/colors";
import { getRandomElement } from "../util/random";
import GameRow from "./GameRow";

export default class GameRowSimpleColors implements GameRow {
    row!: CellType[];
    constructor(readonly nCells: number) {
    }
    getInitialRow(): CellType[] {
        this.row = Array.from({ length: this.nCells })
            .map((__, index) => (
                {
                    cellColor: getRandomElement(getColors()), borderColor: "black",
                    cellContent: '', id: index
                }));
        return this.row;
    }
    move(id: number): string | CellType[] {
        let res: string | CellType[];
        if (this.isOver()) {
            res = "game is over"
        } else {
            const resAr = JSON.parse(JSON.stringify(this.row)) as CellType[];
            resAr[id].cellColor = "black";
            this.row = resAr;
            res = this.row;
        }
        return res;
    }
    isOver(): boolean {
        return this.row.every(cell => cell.cellColor == 'black')
    }

}