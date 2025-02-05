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

    toContain(expected: Record<string, unknown>) {
        if (typeof this.actual !== 'object' || this.actual === null) {
            throw new ExpectationError(`Expect a object, but received ${typeof this.actual}`);
        }

        for (const key of Object.keys(expected)) {
            if (!Object.prototype.hasOwnProperty.call(this.actual, key)) {
                throw new ExpectationError(`It doesn't have a "${key}" at the actual object`);
            }
            if ((this.actual as Record<string, unknown>)[key] !== expected[key]) {
                throw new ExpectationError(
                    `Expect that "${key}" contain the value ${expected[key]}, but received ${
                        (this.actual as Record<string, unknown>)[key]
                    }`
                );
            }
        }
    }
}

export function expect<T>(actual: T) {
    return new Expect(actual);
}
