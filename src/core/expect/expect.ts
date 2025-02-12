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
        if (Array.isArray(this.actual)) {
            if (this.actual.length <= expected) {
                throw new ExpectationError(`Returned array length ${this.actual.length} but expected be bigger than ${expected}`);
            }
        } else if (typeof this.actual === 'number') {
            if (this.actual <= expected) {
                throw new ExpectationError(`Returned ${this.actual} but expected be bigger than ${expected}`);
            }
        } else {
            throw new ExpectationError(`Expect a number or an array, but received ${typeof this.actual}`);
        }
    }

    beMinorThan(expected: number) {
        if (Array.isArray(this.actual)) {
            if (this.actual.length >= expected) {
                throw new ExpectationError(`Returned array length ${this.actual.length} but expected be bigger than ${expected}`);
            }
        } else if (typeof this.actual === 'number') {
            if (this.actual >= expected) {
                throw new ExpectationError(`Returned ${this.actual} but expected be bigger than ${expected}`);
            }
        } else {
            throw new ExpectationError(`Expect a number or an array, but received ${typeof this.actual}`);
        }
    }

    shouldExists() {
        if (this.actual === null || this.actual === undefined) {
            throw new ExpectationError(`Expect the content exists, but received ${this.actual}`);
        }
    }

    shouldNotExists() {
        if (this.actual !== null && this.actual !== undefined) {
            throw new ExpectationError(`Expect the content not to exist, but received ${this.actual}`);
        }
    }

    toContain(expected: Record<string, unknown> | string) {
        if (typeof this.actual !== 'object' || this.actual === null) {
            throw new ExpectationError(`Expect an object, but received ${typeof this.actual}`);
        }

        if (typeof expected === 'string') {
            if (!(expected in this.actual)) {
                throw new ExpectationError(`Expect object to contain key "${expected}", but it does not`);
            }
        } else {
            for (const key in expected) {
                if (!(key in this.actual)) {
                    throw new ExpectationError(`Expect object to contain key "${key}", but it does not`);
                }
                if ((this.actual as Record<string, unknown>)[key] !== expected[key]) {
                    throw new ExpectationError(`Expect object to contain key "${key}" with value "${expected[key]}", but received "${(this.actual as Record<string, unknown>)[key]}"`);
                }
            }
        }
    }
}

export function expect<T>(actual: T) {
    return new Expect(actual);
}
