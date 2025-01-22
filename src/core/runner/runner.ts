import { hooksManager } from '../hooks/hooks-manages';

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

export const runner = new Runner();
