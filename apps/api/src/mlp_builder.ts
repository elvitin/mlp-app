import fs from 'node:fs';
import { createInterface } from 'node:readline';

interface MlpBuilderConfig {
  inputSeparator?: string;
}

interface AtributeRange {
  min: number;
  max: number;
}

export class MlpBuilder {
  private readonly attributes = new Map<string, AtributeRange>();
  private readonly classes = new Set<string>();
  private attributesRangeList!: AtributeRange[];
  private readonly inputSeparator: string;
  private readonly dataFilePath: string;
  private firstLineProcessed = false;

  constructor(filePath: string, config: MlpBuilderConfig = {}) {
    this.inputSeparator = config.inputSeparator ?? ',';
    this.dataFilePath = filePath;
  }

  public async build() {
    await this.firstPassAnalyze();
    await this.secondPassNormalize();
  }

  private firstPassAnalyze(): Promise<void> {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(this.dataFilePath, { encoding: 'utf-8', autoClose: true });
      const rl = createInterface({ input: fileStream, crlfDelay: Infinity });

      rl.on('line', this.processLineToAnalyze.bind(this));
      rl.on('close', resolve);
      rl.on('error', reject);
    });
  }

  private processLineToAnalyze(line: string): void {
    const parts = line.split(this.inputSeparator).map(part => part.trim());

    if (!this.firstLineProcessed) {
      // Processa o cabeçalho
      const attributeLabels = parts.slice(0, -1);
      attributeLabels.forEach(label => {
        this.attributes.set(label, { min: Infinity, max: -Infinity });
      });
      this.attributesRangeList = Array.from(this.attributes.values());
      this.firstLineProcessed = true;
      return;
    }

    // Processa as linhas de dados
    const _class = parts[parts.length - 1];
    this.classes.add(_class);

    const inputs = parts.slice(0, -1);
    for (let i = 0; i < this.attributes.size; i++) {
      const num = Number(inputs[i]);
      const attr = this.attributesRangeList[i];
      attr.min = Math.min(attr.min, num);
      attr.max = Math.max(attr.max, num);
    }
  }

  private secondPassNormalize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(this.dataFilePath, { encoding: 'utf-8', autoClose: true });
      const rl = createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      let isFirstLine = true;
      rl.on('line', line => {
        if (isFirstLine) {
          isFirstLine = false;
          return; // Pula o cabeçalho
        }
        this.processLineToNormalize(line);
      });

      rl.on('close', resolve);
      fileStream.on('error', reject);
    });
  }

  private processLineToNormalize(line: string): void {
    const parts = line.split(this.inputSeparator).map(part => part.trim());
    const inputs = parts.slice(0, -1);

    const normalizedInputs: number[] = [];
    for (let i = 0; i < this.attributes.size; i++) {
      const num = Number(inputs[i]);
      const { min, max } = this.attributesRangeList[i];
      // Evita divisão por zero se todos os valores de um atributo forem iguais
      const normalized = max - min === 0 ? 0 : (num - min) / (max - min);
      normalizedInputs.push(normalized);
    }

    // A partir daqui, você pode usar os `normalizedInputs` para o que precisar.
    // Ex: treinar a rede, salvar em outro formato, etc.
    // O console.log abaixo é apenas para demonstração.

    //[0.152381][0.931507][0.636364][0.865672][0.782609][0.863014]
    console.log(`[${normalizedInputs.map(v => v).join('][')}]`);
  }

  public calcHiddenLayerSize(): number {
    const inputSize = this.attributes.size;
    const outputSize = this.classes.size;
    return Math.ceil((inputSize + outputSize) / 2);
  }
}
