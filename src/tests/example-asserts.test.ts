import { beforeEach, testcase, testsuite } from '../index';
import { BASE_URL } from '../constants/constants';
import { expect } from '../core/expect/expect';
import { request } from '../core/http/http-request';


export const data = [
    {
        postData: {
            username: 'usuarioteste02',
            password: '1234hh'
        },
        updateData: {
            title: 'Activity updated',
        }
    }
];

beforeEach(async () => {
    console.log('beforeEach executed');
});

testsuite('Asserts test example', () => {

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
        let req = request(BASE_URL).get('/public/crocodiles');
        const response = await req.execute();

        expect(response.status).notBeEqual(401);

        return { body: response.body, status: response.status };
    });

    testcase('Test using beBiggerThan', async () => {
        let req = request(BASE_URL).get('/public/crocodiles/');
        const response = await req.execute();

        expect(response.status).toBe(200);
        expect(response.body).beBiggerThan(7);

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
            .send(data[0].postData);
        const response = await req.execute();

        expect(response.statusCode).toBe(200);
        expect(response.body).toContain('refresh');
        expect(response.body).toContain('access');

        return { body: response.body, status: response.statusCode };
    });

    testcase('Test using put request', async () => {
        let req = request("https://fakerestapi.azurewebsites.net").put('/api/v1/Activities/1')
            .send(data[0].updateData);
        const response = await req.execute();

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Activity updated");

        return { body: response.body, status: response.statusCode };
    });

    testcase('Get request using delete method', async () => {
        let req = request("https://fakerestapi.azurewebsites.net").delete('/api/v1/Activities/2');
        const response = await req.execute();

        expect(response.status).toBe(200);

        return { body: response.body, status: response.status };
    });

});