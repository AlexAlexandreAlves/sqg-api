# sqg-api Framework

sqg-api framework is a complete and flexible project built with *typeScript*. The project is based on *jest* validations like toBe, toEqual and etc, and also agree you make calls from api's http and https requests like supertest. The framework was created thinking in join the best of the two libraries in only one. You'll able to designed, run and check your test result using only this framework. 

## Features

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

- The project includes two test examples to get you started.

- One of the examples demonstrates token-based authentication.

### 2. Set up your environment

- The test example are running from the base url https://test-api.k6.io/.
- The test example are running to two endpoints open source from k6.
- If you're using a specific type of authentication, you can set up this on authentication file, currently the project are set up to use a Bearer token auth as example.
  

### 3. Run Your Tests:

-  Use the following command to execute the tests:
   
```
npm run test
```

## Included Packages

The following dependencies are included in the framework:

1.```@types/node```

2.```ts-node```

These packages provide a comprehensive testing environment, covering everything from type definitions to advanced reporting.

## Customization

Feel free to extend and adapt the framework to suit your testing needs:

1. **Adding Custom Test Cases:** Add your own test files in the designated test directory.

2. **Configuring Authentication:** Modify the existing examples or create new configurations for different authentication mechanisms.

## Contribution

Contributions are welcome! If you encounter any issues or have ideas for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/AlexAlexandreAlves/api-test-framework).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/AlexAlexandreAlves/sqg-api/blob/master/LICENSE) file for more details.