import { BaseMlp } from './base_mlp';

class HyperbolicMlp extends BaseMlp {
  calcActivation(net: number): number {
    throw new Error('Method not implemented.');
  }
}

export { HyperbolicMlp };
