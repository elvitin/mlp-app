// import { E } from '@elvitin/utils';
// import { add } from '@elvitin/utils/add';

// console.info({ sum: add(2, 3) });
// console.info({ E });

import { MlpBuilder } from './mlp_builder';

console.info('Multilayer Perceptron Lab');

const mlpBuilder = new MlpBuilder('base_treino/base_treinamento.csv', { inputSeparator: ',' });

mlpBuilder
  .build()
  .then(() => {
    console.info('MLP built successfully.', mlpBuilder['attributes']);
  })
  .catch(err => {
    console.error('Error building MLP:', err);
  })
  .finally(() => {
    console.info('MLP build process completed.');
  });
