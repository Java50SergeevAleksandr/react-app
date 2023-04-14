import LifeMatrix from "./service/LifeMatrix";
test("test square", () => {
    const matrix = [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ];
    const lifeMatrix = new LifeMatrix(matrix);
    
    expect(lifeMatrix.nextStep()).toEqual(matrix);
})

test("test vertical line", () => {
    const matrix = [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,0,0,0]
    ];
    const matrixRes = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];
    const lifeMatrix = new LifeMatrix(matrix);
    
    expect(lifeMatrix.nextStep()).toEqual(matrixRes);
})
test("test vertical line in cycle", () => {
    const matrix = [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,0,0,0]
    ];
    let numbers;
    const lifeMatrix:any = new LifeMatrix(matrix);
    for (let index = 0; index < 8; index++) {
        numbers = lifeMatrix.nextStep();
        
    }
    
    expect(numbers).toEqual(matrix);
})

test("test square in cycle", () => {
    const matrix = [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ];
    let numbers;
    const lifeMatrix:any = new LifeMatrix(matrix);
    for (let index = 0; index < 8; index++) {
        numbers = lifeMatrix.nextStep();
        
    }
    
    expect(numbers).toEqual(matrix);
})
test("test  snake in cycle", () => {
    const matrix = [
        [0,0,0,0,0,0],
        [0,1,1,0,1,0],
        [0,1,0,1,1,0],
        [0,0,0,0,0,0]
    ];
    let numbers;
    const lifeMatrix:any = new LifeMatrix(matrix);
    for (let index = 0; index < 8; index++) {
        numbers = lifeMatrix.nextStep();
        
    }
    
    expect(numbers).toEqual(matrix);
})
test("test fumarola in cycle(period 5)", () => {
    const matrix = [
        [0,0,0,1,1,0,0,0],
        [0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0],
        [0,0,1,0,0,1,0,0],
        [1,0,1,0,0,1,0,1],
        [1,1,0,0,0,0,1,1]
    ];
    let numbers;
    const lifeMatrix:any = new LifeMatrix(matrix);
    for (let index = 0; index < 5; index++) {
        numbers = lifeMatrix.nextStep();        
    }
    
    expect(numbers).toEqual(matrix);
})