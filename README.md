
- [sqg-api Framework](#sqg-api-framework)
  - [Features](#features)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
    - [1. How to run your tests:](#1-how-to-run-your-tests)
  - [2. Assertions](#2-assertions)
  - [3. Hooks](#3-hooks)
  - [4. Test Methods](#4-test-methods)
  - [5. How to use the Test Methods](#5-how-to-use-the-test-methods)
  - [6. HTML Report](#6-html-report)
  - [Included Packages](#included-packages)
  - [Customization](#customization)
  - [Contribution](#contribution)
  - [Future implemantations:](#future-implemantations)
  - [License](#license)

# sqg-api Framework

sqg-api framework is a complete and flexible project built using *TypeScript*. The project was built based on the *jest* and *supertest* frameworks, allowing the use of assertions like toBe, toEqual, etc., and simulating calls from HTTP and HTTPS APIs like supertest. The framework was created to combine the best of both libraries into one. You'll be able to design, run, and check your test results using only this framework.


## Features

- Faster API testing compared to other frameworks.
- All-in-one framework: Best usage in a single installation framework that allows building API tests and executing HTTP requests.
- Easy-to-Use: Simplifies API testing with preconfigured setups.
- Extensible: Allows customization of validations to match specific requirements.
- TypeScript Support: Ensures type safety and enhanced developer experience.

## Installation
First run to install the framework via npm:

```
npm install sqg-api
```

After run to install to install @types/node
```
npm i --save-dev @types/node
```

Now, let's create the tsconfig.json file:
```
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules"]
}
```

- Finally set up the package.json file like that:

```
 "scripts": {
    "test": "ts-node node_modules/sqg-api/src/core/runner/runner.ts"
  },
```

## Getting Started

### 1. How to run your tests:

- We can use the next command to run all tests:
   
```
npm test
```

- Or we can use the next command to run a single test:
```
npm test {my-test-here.test.ts}
```


## 2. Assertions

The framework allows the use of various assertions, comparing the actual result with the expected result. Below is a complete guide to using the assertions:

```toBe``` 
```notBe```
```beEqual```
```notBeEqual```
```beBiggerThan```
```beMinorThan```
```shouldExists```
```toContain```


## 3. Hooks
The framework has hooks that can be used like beforeEach, beforeAll, afterEach, and afterAll:

```
beforeEach(async () => {
    console.log('beforeEach executed');
});

```
## 4. Test Methods 

- A test file will be similtar to that:

```
testsuite('Asserts test example', () => {

    testcase('Get request using toBe', async () => {
        let req = request(BASE_URL).get('/my/endpoint-here/');
        const response = await req.execute();

        expect(response.status).toBe(200);

        //We need to return the content like this because that's the way to show on the report
        return { body: response.body, status: response.status };
    });
});
```

- Additionally, the project has some test methods that can be used to build your test suite quickly. These methods have a pre-setup and expect some data as parameters, for example:

```
  public async getList(route: string, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(BASE_URL).get(route);

        if (token) {
            req = req.set('Authorization', `Bearer ${token}`);
        }

        const response = await req.execute();

        espera(response.status).toBe(statusCode);

        if (content) {
            espera(response.body).shouldExists();
            espera(response.body).toContain(content)
        }

        if (checkResponseMessage) {
            espera(response.body.message).toBe(checkResponseMessage);
        }

        return response;
    }
```

- As we can see, the test method is almost ready to use; we just need to provide the mandatory **baseUrl**, **route**, and **status code**. If you need to set up a **token**, you can define it in the method, updating the type of token you'll need to use, like Bearer or Basic auth.
  
- The **status code** is already being checked and compared with the status code returned in the request.
  
- The **content** parameter is the content body that you expect in the response. It isn't mandatory, but if provided, it will check the expected data and compare it with the response body in the request.

- The **checkResponseMessage** parameter is also not mandatory, but it is prepared to check and compare with the response message in the request.
  
- To use these methods, you just need to initialize an Entity class like this: ***const entity = new EntityService();***

## 5. How to use the Test Methods

You'll be able to use five different types of almost ready Test Methods: **getById, getList, create, update and delete.**

Follow the ***getList*** example bellow:

```
  testcase('Get testing with token authentication', async () => {
        await entity.getList('BASEURL/my/endpoint/', 200, token);
    });
```

- You can see more test examples on this repository: https://github.com/AlexAlexandreAlves/test-example-sqg-api

## 6. HTML Report
The framework has an HTML test report that will be created after the test execution. (The report is still in the improvement phase).


## Included Packages

The following dependencies are included in the framework:

1.```@types/node```

2.```ts-node```

## Customization

Feel free to extend and adapt the framework to suit your testing needs:

1. **Adding Custom Test Cases:** Add your own test files in the designated test directory.
2. **Configuring Authentication:** Modify the existing examples or create new configurations for different authentication mechanisms.
3. **Modify the test report as you want using HTML**.

## Contribution

Contributions are welcome! If you encounter any issues or have ideas for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/AlexAlexandreAlves/api-test-framework).

## Future implemantations:

1. New assert test methods.
2. Implement tags
3. Improve the report

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/AlexAlexandreAlves/sqg-api/blob/master/LICENSE) file for more details.
