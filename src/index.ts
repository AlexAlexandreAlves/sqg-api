import { hooksManager } from './core/hooks/hooks-manager';
import generateReport from './core/report-config/generate-report';

type TestCase = {
    name: string;
    fn: () => { body: any; status: number } | Promise<{ body: any; status: number }>;
    skip?: boolean;
    only?: boolean;
};

type TestSuite = {
    name: string;
    tests: TestCase[];
    skip?: boolean;
    only?: boolean;
};

const testSuites: TestSuite[] = [];

export function testcase(name: string, fn: () => { body: any; status: number } | Promise<{ body: any; status: number }>, options?: { skip?: boolean; only?: boolean }) {
    const currentSuite = testSuites[testSuites.length - 1];
    if (currentSuite) {
        currentSuite.tests.push({ name, fn, ...options });
    } else {
        throw new Error('testcase must be called within a testsuite');
    }
}

export function testsuite(name: string, fn: () => void, options?: { skip?: boolean; only?: boolean }) {
    const suite: TestSuite = { name, tests: [], ...options };
    testSuites.push(suite);
    fn();
}

export async function runTests() {
    const onlySuites = testSuites.filter(suite => suite.only);
    const suitesToRun = onlySuites.length > 0 ? onlySuites : testSuites;

    const results: any[] = [];

    for (const suite of suitesToRun) {
        if (suite.skip) {
            console.log(`\x1b[33mSuite: ${suite.name} (Skipped) ⧖\x1b[0m`); // Amarelo
            results.push({ suite: suite.name, status: 'Skipped', tests: [] });
            continue;
        }

        console.log(`Suite: ${suite.name}`);
        const onlyTests = suite.tests.filter(test => test.only);
        const testsToRun = onlyTests.length > 0 ? onlyTests : suite.tests;

        await hooksManager.executeBeforeAll();

        const suiteResults: any[] = [];

        for (const test of testsToRun) {
            if (test.skip) {
                console.log(`  \x1b[33m⧖ ${test.name} (Skipped)\x1b[0m`); // Amarelo
                suiteResults.push({ test: test.name, status: 'Skipped' });
                continue;
            }

            await hooksManager.executeBeforeEach();

            try {
                const response = await test.fn();
                console.log(`  \x1b[32m✓ ${test.name}\x1b[0m`); // Verde
                suiteResults.push({ test: test.name, status: 'Passed', responseBody: response.body, statusCode: response.status });
            } catch (error) {
                console.error(`  \x1b[31m✗ ${test.name}\x1b[0m`); // Vermelho
                console.error(`    ${error}`);
                suiteResults.push({ test: test.name, status: 'Failed', error: (error as Error).toString() });
            }

            await hooksManager.executeAfterEach();
        }

        results.push({ suite: suite.name, status: 'Completed', tests: suiteResults });

        await hooksManager.executeAfterAll();
    }

    generateReport(results);
}



export function beforeAll(hook: () => Promise<void> | void): void {
    hooksManager.registerBeforeAll(hook);
}

export function beforeEach(hook: () => Promise<void> | void): void {
    hooksManager.registerBeforeEach(hook);
}

export function afterEach(hook: () => Promise<void> | void): void {
    hooksManager.registerAfterEach(hook);
}

export function afterAll(hook: () => Promise<void> | void): void {
    hooksManager.registerAfterAll(hook);
}