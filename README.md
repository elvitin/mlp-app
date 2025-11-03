# Algorítimo MLP



- Quantidade de atributos identificados é igual o número de entradas.
- Quantidade de valores distintos indica o número de neurônios
- Apenas uma camada oculta
- O neurônio que apresentar o maior valor é oque é escolhido.

OS CSVs
- Entradas sempre numéricas
- Ultima coluna é sempre a classe

UI USUÁRIO
- Permitir que o usuário defina se o critério de parada é
	- Quantidade máxima de época (Até 3000 época)
	- Erro mínimo tolerado (Ex. tx erro inferior a 0.001)
(O que acontecer primeiro)


- Escolher a taxa de aprendizado (Varia de 0 a 1). (0 > tx <= 1)

- Definir a funções de saída
	- Linear
	- Logistica
	- Tangente hiperbólica
- A função será a mesma para todos as camadas

- A quantidade de elementos da camada oculta é (Entr+Said)/2 (Sempre arredondado para cima)

### Separação do arquivo

##### Se for arquivo único

- Separar o arquivo entre treino e teste
- 30% para teste e 70% para treino
  - Obter 30% de cada classe