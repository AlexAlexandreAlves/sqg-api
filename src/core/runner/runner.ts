import { hooksManager } from '../hooks/hooks-manages';
import fs from 'fs';
import path from 'path';
import { runTests } from '../../index';

class Runner {
  private tests: (() => Promise<void>)[] = [];

  registerTest(test: () => Promise<void>): void {
    this.tests.push(test);
  }

  async execute(): Promise<void> {
    // Executa os hooks globais antes de todos os testes
    await hooksManager.executeBeforeAll();

    for (const test of this.tests) {
      // Executa os hooks antes de cada teste
      await hooksManager.executeBeforeEach();

      try {
        await test(); // Executa o teste
      } finally {
        // Executa os hooks após cada teste
        await hooksManager.executeAfterEach();
      }
    }

    // Executa os hooks globais após todos os testes
    await hooksManager.executeAfterAll();
  }
}

// Função para importar dinamicamente todos os arquivos de teste
function importTestFiles(dir: string, runner: Runner, specificFile?: string): void {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      importTestFiles(fullPath, runner, specificFile); // Recursivamente importa arquivos em subdiretórios
    } else if (file.endsWith('.test.ts')) {
      if (!specificFile || fullPath.endsWith(specificFile)) {
        require(fullPath); // Importa o arquivo de teste
      }
    }
  });
}

// Cria uma instância do Runner
const runner = new Runner();

// Verifica se um arquivo específico foi passado como argumento
const specificFile = process.argv[2];

// Importa todos os arquivos de teste na pasta 'tests' ou um arquivo específico
importTestFiles(path.join(__dirname, '../../tests'), runner, specificFile);

// Executa os testes automaticamente
runner.execute().catch(error => {
  console.error('Erro ao executar os testes:', error);
  process.exit(1);
});

runTests();