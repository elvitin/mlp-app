import type { MlpRepository } from '../repository/mlp-repository';

interface MlpOpts {
  inputLayerSize: number;
  outputLayerSize: number;
  hiddenLayerSize: number;
  repository: MlpRepository;

  epochLimit: number;
}
interface Mlp {
  calcNets({ inputs, weightMatrix }: { inputs: number[]; weightMatrix: number[][] }): number[];
}

abstract class BaseMlp implements Mlp {
  private readonly matrixOfHiddenLayer: number[][];
  private readonly matrixOfOutputLayer: number[][];
  private readonly inputLayerSize;
  private readonly hiddenLayerSize;
  private readonly epochLimit: number;
  private readonly repository: MlpRepository;
  constructor({ inputLayerSize, hiddenLayerSize, outputLayerSize, repository, epochLimit }: MlpOpts) {
    this.epochLimit = epochLimit;
    this.repository = repository;
    this.inputLayerSize = inputLayerSize;
    this.hiddenLayerSize = hiddenLayerSize;
    this.matrixOfHiddenLayer = this.allocMatrix(inputLayerSize, hiddenLayerSize);
    this.matrixOfOutputLayer = this.allocMatrix(hiddenLayerSize, outputLayerSize);
    this.initMatrices();
  }

  private allocMatrix(rowsLen: number, colsLen: number): number[][] {
    return Array.from({ length: rowsLen }, () => this.allocArray(colsLen));
  }

  private start(): void {
    let epoch = 0;
    while (epoch < this.epochLimit) {
      while (this.repository.hasNext()) {
        const inputs = this.repository.getNext();
        const netsFromHiddenLayer = this.calcNets({ inputs, weightMatrix: this.matrixOfHiddenLayer });

        // 5
        const actsFromHiddenLayer = this.calcActivationOfNets(netsFromHiddenLayer);

        const netsFromOutputLayer = this.calcNets({
          inputs: actsFromHiddenLayer,
          weightMatrix: this.matrixOfOutputLayer
        });

        const actValuesFromOutputLayer = this.calcActivationOfNets(netsFromOutputLayer);
      }
      this.repository.reset();
      epoch++;
    }
  }

  private allocArray(len: number): number[] {
    return Array(len).fill(0);
  }

  public calcNets({ inputs, weightMatrix }: { inputs: number[]; weightMatrix: number[][] }): number[] {
    const nets = [];
    for (let y = 0; y < weightMatrix[0].length; y++) {
      let sum = 0;
      for (let x = 0; x < weightMatrix.length; x++) {
        sum += inputs[x] * this.matrixOfHiddenLayer[x][y];
      }
      nets.push(sum);
    }

    return nets;
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

  private calcActivationOfNets(nets: number[]): number[] {
    return nets.map(net => this.calcActivation(net));
  }

  abstract calcActivation(net: number): number;
}

export { BaseMlp };
