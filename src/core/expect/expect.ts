class ExpectationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ExpectationError';
    }
}

class Expect<T> {
    private actual: T;

    constructor(actual: T) {
        this.actual = actual;
    }

    toBe(expected: T) {
        if (this.actual !== expected) {
            throw new ExpectationError(`Returned ${this.actual} but expected ${expected}`);
        }
    }

    notBe(expected: T) {
        if (this.actual === expected) {
            throw new ExpectationError(`Returned ${this.actual} but expected not be ${expected}`);
        }
    }

    beEqual(expected: T) {
        if (JSON.stringify(this.actual) !== JSON.stringify(expected)) {
            throw new ExpectationError(
                `Returned ${JSON.stringify(this.actual)} but expected to be equal ${JSON.stringify(expected)}`
            );
        }
    }

    notBeEqual(expected: T) {
        if (JSON.stringify(this.actual) === JSON.stringify(expected)) {
            throw new ExpectationError(
                `Returned ${JSON.stringify(this.actual)} but expected not be equal ${JSON.stringify(expected)}`
            );
        }
    }

    beBiggerThan(expected: number) {
        if (typeof this.actual !== 'number') {
            throw new ExpectationError(`Expect a number, but received ${typeof this.actual}`);
        }
        if (this.actual <= expected) {
            throw new ExpectationError(`Returned ${this.actual} but expected be bigger than ${expected}`);
        }
    }

    beMinorThan(expected: number) {
        if (typeof this.actual !== 'number') {
            throw new ExpectationError(`Expect a number, but received ${typeof this.actual}`);
        }
        if (this.actual >= expected) {
            throw new ExpectationError(`Returned ${this.actual} but expected be minor than ${expected}`);
        }
    }

    shouldExists() {
        if (this.actual === null || this.actual === undefined) {
            throw new ExpectationError(`Expect the content exists, but received ${this.actual}`);
        }
    }

    toContain(expected: Record<string, unknown> | string) {
        if (!Array.isArray(this.actual)) {
            throw new ExpectationError(`Expect an array, but received ${typeof this.actual}`);
        }

        if (typeof expected === 'string') {
            const found = (this.actual as unknown[]).some(actualItem =>
                typeof actualItem === 'object' && actualItem !== null && expected in actualItem
            );
            if (!found) {
                throw new ExpectationError(`Expect array to contain an object with key "${expected}", but it does not`);
            }
        } else {
            const found = (this.actual as unknown[]).some(actualItem =>
                JSON.stringify(actualItem) === JSON.stringify(expected)
            );
            if (!found) {
                throw new ExpectationError(`Expect array to contain ${JSON.stringify(expected)}, but it does not`);
            }
        }
    }
}

export function expect<T>(actual: T) {
    return new Expect(actual);
}
