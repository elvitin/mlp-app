abstract class MlpRepository {
  abstract reset(): void;
  abstract hasNext(): boolean;
  abstract getNext(): number[];
}

export { MlpRepository };
