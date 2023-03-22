type Borders = {
    rowMin: number,
    rowMax: number,
    colMin: number,
    colMax: number,
}
export default class LifeMatrix {
    constructor(private _numbers: number[][]) { }
    get numbers() {
        return this._numbers;
    }

    nextStep(): number[][] {
        const getNumberOfLifeCellsInArea = (borders: Borders): number => {
            const { rowMin, rowMax, colMin, colMax } = borders;
            const resAr = this._numbers.slice(rowMin, rowMax).map((m) => m.slice(colMin, colMax)).flat().filter(v => v > 0);
            return resAr.length;
        }

        this._numbers = this._numbers.map((rows, indexR) => rows.map((col, indexC) => getNumber(col, indexC, indexR, this._numbers)))
        return this._numbers;


        function getNumber(initNumber: number, col: number, row: number, array: number[][]): number {
            const borders: Borders = {
                rowMin: row == 0 ? 0 : row - 1,
                rowMax: row == array.length ? array.length + 1 : row + 2,
                colMin: col == 0 ? 0 : col - 1,
                colMax: col == array[0].length ? array[0].length + 1 : col + 2
            }
            const numberOfLifeInArea = getNumberOfLifeCellsInArea(borders);

            return initNumber ? getNumberForLifeCell(numberOfLifeInArea - 1) : getNumberForDeadCell(numberOfLifeInArea);
        }

        function getNumberForLifeCell(number: number): number {
            return (isUnderpopulation(number) || isOvercrowding(number)) ? 0 : 1;
        }

        function getNumberForDeadCell(number: number): number {
            return isReproduction(number) ? 1 : 0;
        }

        function isUnderpopulation(number: number): Boolean {
            return number < 2;
        }

        function isOvercrowding(number: number): Boolean {
            return number > 3;
        }

        function isReproduction(number: number): Boolean {
            return number == 3;
        }
    }
}


 // const rowMin = row == 0 ? 0 : row - 1;
            // const rowMax = row == this._numbers.length ? this._numbers.length + 1 : row + 2;
            // const colMin = col == 0 ? 0 : col - 1;
            // const colMax = col == this._numbers[0].length ? this._numbers[0].length + 1 : col + 2;
            // let count: number = 0;
            // for(let i = row -1; i < row + 2 ; i++) {
            //     for(let j = col -1; j< col+2; j++){
            //        if (this._numbers[i][j] > 0) {
            //            count++;
            //        }
            //     }
            // }
            // return count == 3 ? true : false