interface MlpOpts {
  inputLayerSize: number;
  outputLayerSize: number;
  hiddenLayerSize: number;
}

export class Mlp {
  private readonly matrixOfHiddenLayer: number[][];
  private readonly matrixOfOutputLayer: number[][];

  private readonly inputLayerSize;
  private readonly hiddenLayerSize;
  constructor({ inputLayerSize, hiddenLayerSize, outputLayerSize }: MlpOpts) {
    this.inputLayerSize = inputLayerSize;
    this.hiddenLayerSize = hiddenLayerSize;
    this.matrixOfHiddenLayer = Array.from({ length: inputLayerSize }, (): number[] => Array(hiddenLayerSize).fill(0));
    this.matrixOfOutputLayer = Array.from({ length: hiddenLayerSize }, (): number[] => Array(outputLayerSize).fill(0));
    this.initMatrices();
  }

  public calcNet(inputs: number[]): void {
    const nets = [];
    for (let y = 0; y < this.hiddenLayerSize; y++) {
      let sum = 0;
      for (let x = 0; x < this.inputLayerSize; x++) {
        sum += inputs[x] * this.matrixOfHiddenLayer[x][y];
      }
      nets.push(sum);
    }
  }

  private genRandomWeight(): number {
    return Math.random() * 2 - 1;
  }

  private initMatrices(): void {
    this.initMatrix(this.matrixOfOutputLayer);
    this.initMatrix(this.matrixOfHiddenLayer);
  }

  private initMatrix(matrix: number[][]): void {
    for (const line of matrix) {
      for (const index in line) {
        line[index] = this.genRandomWeight();
      }
    }
  }

  public displayMatrices(): void {
    this.displayMatrix(this.matrixOfHiddenLayer);
    console.info();
    this.displayMatrix(this.matrixOfOutputLayer);
  }

  private displayMatrix(matrix: number[][]): void {
    for (const elem of matrix) {
      for (const cell of elem) {
        process.stdout.write(`[${cell.toFixed(2)}]`);
      }
      console.info();
    }
  }
}
