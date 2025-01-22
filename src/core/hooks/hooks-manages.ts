type Hook = () => Promise<void> | void;

class HooksManager {
  private beforeAllHooks: Hook[] = [];
  private beforeEachHooks: Hook[] = [];
  private afterEachHooks: Hook[] = [];
  private afterAllHooks: Hook[] = [];

  registerBeforeAll(hook: Hook): void {
    this.beforeAllHooks.push(hook);
  }

  registerBeforeEach(hook: Hook): void {
    this.beforeEachHooks.push(hook);
  }

  registerAfterEach(hook: Hook): void {
    this.afterEachHooks.push(hook);
  }

  registerAfterAll(hook: Hook): void {
    this.afterAllHooks.push(hook);
  }

  async executeBeforeAll(): Promise<void> {
    for (const hook of this.beforeAllHooks) {
      await hook();
    }
  }

  async executeBeforeEach(): Promise<void> {
    for (const hook of this.beforeEachHooks) {
      await hook();
    }
  }

  async executeAfterEach(): Promise<void> {
    for (const hook of this.afterEachHooks) {
      await hook();
    }
  }

  async executeAfterAll(): Promise<void> {
    for (const hook of this.afterAllHooks) {
      await hook();
    }
  }
}

export const hooksManager = new HooksManager();
