import 'reflect-metadata';

export function TestSuite(name: string) {
      Reflect.defineMetadata('testSuite:name', name, {});
    };

  export function TestCase(target: any, propertyKey: string) {
    const testCases = Reflect.getMetadata('testSuite:testCases', target.constructor) || [];
    testCases.push(propertyKey);
    Reflect.defineMetadata('testSuite:testCases', testCases, target.constructor);
}

export function Critical(target: any, propertyKey: string) {
    Reflect.defineMetadata('critical', true, target, propertyKey);
}

export function Bug(bugId: string) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata('bug', bugId, target, propertyKey);
    };
}