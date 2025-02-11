import { testcase, testsuite, runTests } from '../index';
import { BASE_URL } from '../constants/constants';
import { expect } from '../core/expect/expect';
import { request } from '../core/http/http-request';


export const data = {
    loginData: {
        username: 'usuarioteste02',
        password: '1234hh'
    }
};
testsuite('Test without use entity class', () => {

    testcase('Get request using toBe', async () => {
        let req = request(BASE_URL).get('/public/crocodiles/');
        const response = await req.execute();

        expect(response.status).toBe(200);

        return { body: response.body, status: response.status };
    });

    testcase('Negative test - get using notBe', async () => {
        let req = request(BASE_URL).get('/public/crocodiles/');
        const response = await req.execute();

        expect(response.status).notBe(200);

        return { body: response.body, status: response.status };
    });

    testcase('Get using beEqual', async () => {
        let req = request(BASE_URL).get('/public/crocodiles/');
        const response = await req.execute();

        expect(response.status).beEqual(200);

        return { body: response.body, status: response.status };
    });

    testcase('Negative test using notBeEqual', async () => {
        let req = request(BASE_URL).get('/public/crocodilex');
        const response = await req.execute();

        expect(response.status).notBeEqual(401);

        return { body: response.body, status: response.status };
    });

    testcase('Test using beBiggerThan', async () => {
        let req = request(BASE_URL).get('/public/crocodiles/');
        const response = await req.execute();

        expect(response.status).toBe(200);
        expect(response.body).beBiggerThan(9);

        return { body: response.body, status: response.status };
    });

    testcase('Test using beMinorThan', async () => {
        let req = request(BASE_URL).get('/public/crocodiles/');
        const response = await req.execute();

        expect(response.status).toBe(200);
        expect(response.body).beMinorThan(15);

        return { body: response.body, status: response.status };
    });

    testcase('Test using shouldExists', async () => {
        let req = request(BASE_URL).get('/public/crocodiles/');
        const response = await req.execute();

        expect(response.status).toBe(200);
        expect(response.body).shouldExists();

        return { body: response.body, status: response.status };
    });

    testcase('Test using toContain', async () => {
        let req = request(BASE_URL).post('/auth/token/login/')
            .send(data.loginData)
        const response = await req.execute();

        expect(response.statusCode).toBe(200);
        expect(response.body).toContain('refresh');
        expect(response.body).toContain('access');

        return { body: response.body, status: response.statusCode };
    });

});