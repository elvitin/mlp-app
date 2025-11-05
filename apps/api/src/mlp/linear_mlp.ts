import { BaseMlp } from './base_mlp';

class LinearMlp extends BaseMlp {
  calcActivation(net: number): number {
    throw new Error('Method not implemented.');
  }
}

export { LinearMlp };
