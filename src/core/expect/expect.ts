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

    ser(expected: T) {
        if (this.actual !== expected) {
            throw new ExpectationError(`Espera ${this.actual} ser ${expected}`);
        }
    }

    naoSer(expected: T) {
        if (this.actual === expected) {
            throw new ExpectationError(`Espera ${this.actual} não ser ${expected}`);
        }
    }

    serIgual(expected: T) {
        if (JSON.stringify(this.actual) !== JSON.stringify(expected)) {
            throw new ExpectationError(
                `Espera ${JSON.stringify(this.actual)} ser igual a ${JSON.stringify(expected)}`
            );
        }
    }

    naoSerIgual(expected: T) {
        if (JSON.stringify(this.actual) === JSON.stringify(expected)) {
            throw new ExpectationError(
                `Espera ${JSON.stringify(this.actual)} não ser igual a ${JSON.stringify(expected)}`
            );
        }
    }

    serMaiorQue(expected: number) {
        if (typeof this.actual !== 'number') {
            throw new ExpectationError(`Espera um número, mas recebeu ${typeof this.actual}`);
        }
        if (this.actual <= expected) {
            throw new ExpectationError(`Espera ${this.actual} ser maior que ${expected}`);
        }
    }

    serMenorQue(expected: number) {
        if (typeof this.actual !== 'number') {
            throw new ExpectationError(`Espera um número, mas recebeu ${typeof this.actual}`);
        }
        if (this.actual >= expected) {
            throw new ExpectationError(`Espera ${this.actual} ser menor que ${expected}`);
        }
    }

    queExista() {
        if (this.actual === null || this.actual === undefined) {
            throw new ExpectationError(`Espera que o valor exista, mas recebeu ${this.actual}`);
        }
    }

    queContenha(expected: Record<string, unknown>) {
        if (typeof this.actual !== 'object' || this.actual === null) {
            throw new ExpectationError(`Espera um objeto, mas recebeu ${typeof this.actual}`);
        }

        for (const key of Object.keys(expected)) {
            if (!Object.prototype.hasOwnProperty.call(this.actual, key)) {
                throw new ExpectationError(`Falta a chave "${key}" no objeto atual`);
            }
            if ((this.actual as Record<string, unknown>)[key] !== expected[key]) {
                throw new ExpectationError(
                    `Esperado que "${key}" tenha valor ${expected[key]}, mas recebeu ${
                        (this.actual as Record<string, unknown>)[key]
                    }`
                );
            }
        }
    }
}

export function espera<T>(actual: T) {
    return new Expect(actual);
}
