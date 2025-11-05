import { BaseMlp } from './base_mlp';

class LogisticMlp extends BaseMlp {
  calcActivation(net: number): number {
    throw new Error('Method not implemented.');
  }
}

export { LogisticMlp };
