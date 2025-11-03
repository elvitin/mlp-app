import fs from 'node:fs';
import readline from 'node:readline';

async function getLines(path: string): Promise<string[]> {
  const fileStream = fs.createReadStream(path, { encoding: 'utf-8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const lines: string[] = [];
  for await (const line of rl) {
    lines.push(line);
  }
  rl.close();
  fileStream.close(e => {
    if (e) console.error('falha ao fechar stream de arquivo');
  });
  return lines;
}

export { getLines };
