# sqg-api Framework

sqg-api framework is a completed and flexible project built using *typeScript*. The project is based has asserts similar to *jest* framework, like toBe, toEqual and etc. It also allows you to make calls from http and https api's like supertest. The framework was created thinking in join the best of the two libraries in only one. You'll able to designed, run and check your test result using only this framework. 

## Features

- All-in-one framework: Best usage in only an installation framework that allows you build api tests and execute http requests.
- Easy-to-Use: Simplifies API testing with preconfigured setups.
- Extensible: Allows you to customize validations to match your specific requirements.
- TypeScript Support: Ensures type safety and enhanced developer experience.

## Installation
Install the framework via npm:

```
npm install sqg-api
```

## Getting Started

### 1. Explore Example Tests:

- The project includes a test example to help you start.

- One of the examples demonstrates how you can use a pre-setup test with a token authentication.

### 2. Set up your environment

- The test example can be running from the base url https://test-api.k6.io/ or https://fakerestapi.azurewebsites.net/index.html, two open sources test api's.
- If you're using a specific type of authentication, you can set up this on authentication file, currently the project are set up to use a Bearer token auth as example.
  

### 3. Run Your Tests:

-  Use the following command to execute the tests:
   
```
npm run test
```

## Asserts

The framework allows you use a lot of asserts, comparing the result you gave with the expected result. Follow to see the complete guide to use the asserts:

```ser``` 
```naoSer```
```serIgual```
```naoSerIgual```
```serMaiorQue```
```serMenorQue```
```queExista```
```queContenha```

## Test methods 

The project also has some test methods that you can use to build your test suite really quickly. These methods has a pre-setup and expect some data as a parameter, for example:

```
  public async getList(route: string, statusCode: number, token?: string, content?: any, checkResponseMessage?: string) {
        let req = request(BASE_URL).get(route);

        if (token) {
            req = req.set('Authorization', `Bearer ${token}`);
        }

        const response = await req.execute();

        espera(response.status).ser(statusCode);

        if (content) {
            espera(response.body).queExista();
            espera(response.body).queContenha(content)
        }

        if (checkResponseMessage) {
            espera(response.body.message).ser(checkResponseMessage);
        }

        return response;
    }
```

- As you can see, the test method it's almost ready, you just need to inform as obligatory the **route** and **status code** you expect. If you need to setup any **token**, you can define into the method, updating the type of token you'll need to use, like a Bearer or Basic auth.
  
- The **status code** it's already been checked and comparing with the status code returned in the request.
  
- The **content** parameter its the body content you see on the response. It isn't obligatory, buf if informed it's going check if exists and it's going compare with the response body on the request.

- The **checkResponseMessage** parameter it's also isn't obligatory, but is prepared to check and comparing with the response message in the request.
  
- To use these methods you just need to initialize a Entity class like that: ***const entity = new EntityService();***


## How to use the Test Methods

You'll be able to use five different types of almost ready Test Methods: **getById, getList, create, update and delete.**

Follow the ***getList*** example bellow:

```
  testcase('Testing get with token validation', async () => {
        await entity.getList('/my/endpoint/', 200, token);
    });
```


## Included Packages

The following dependencies are included in the framework:

1.```@types/node```

2.```ts-node```

## Customization

Feel free to extend and adapt the framework to suit your testing needs:

1. **Adding Custom Test Cases:** Add your own test files in the designated test directory.

2. **Configuring Authentication:** Modify the existing examples or create new configurations for different authentication mechanisms.

## Contribution

Contributions are welcome! If you encounter any issues or have ideas for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/AlexAlexandreAlves/api-test-framework).

## Future implemantations:

1. New assert test methods.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/AlexAlexandreAlves/sqg-api/blob/master/LICENSE) file for more details.