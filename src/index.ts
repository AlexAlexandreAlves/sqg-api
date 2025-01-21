type TestCase = {
    name: string;
    fn: () => void | Promise<void>;
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

export function testcase(name: string, fn: () => void | Promise<void>, options?: { skip?: boolean; only?: boolean }) {
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

    for (const suite of suitesToRun) {
        if (suite.skip) {
            console.log(`\x1b[33mSuite: ${suite.name} (skipped)\x1b[0m`); // Amarelo
            continue;
        }

        console.log(`Suite: ${suite.name}`);
        const onlyTests = suite.tests.filter(test => test.only);
        const testsToRun = onlyTests.length > 0 ? onlyTests : suite.tests;

        for (const test of testsToRun) {
            if (test.skip) {
                console.log(`  \x1b[33m✗ ${test.name} (skipped)\x1b[0m`); // Amarelo
                continue;
            }

            try {
                await test.fn();
                console.log(`  \x1b[32m✓ ${test.name}\x1b[0m`); // Verde
            } catch (error) {
                console.error(`  \x1b[31m✗ ${test.name}\x1b[0m`); // Vermelho
                console.error(`    ${error}`);
            }
        }
    }
}

runTests();