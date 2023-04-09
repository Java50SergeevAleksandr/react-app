import { CellType } from "../model/CellType";
import GameRowSimpleColors from "./GameRowSimpleColors";

export class GameRowSwapColors extends GameRowSimpleColors {
    count!: number;
    firstIndex!: number;
    constructor(nCells: number) {
        super(nCells);
    }
    getInitialRow(): CellType[] {
        this.count = 0;
        this.firstIndex = -1;
        return super.getInitialRow();
    }
    move(id: number): string | CellType[] {
        let res: string | CellType[];
        this.count++;
        if (this.isOver()) {
            res = "game is over";
        } else if (this.firstIndex == -1) {
            this.firstIndex = id;
            res = this.row;
        } else {
            const resAr = JSON.parse(JSON.stringify(this.row)) as CellType[];
            [resAr[id].cellColor, resAr[this.firstIndex].cellColor] = [resAr[this.firstIndex].cellColor, resAr[id].cellColor];
            this.firstIndex = -1;
            this.row = resAr;
            res = this.row;
        }
        return res;
    }
    isOver(): boolean {
        return this.count == this.row.length;
    }
}