import { testcase, testsuite, runTests } from '../index';
import { BASE_URL } from '../constants/constants';
import { expect } from '../core/expect/expect';
import { request } from '../core/http/http-request';



testsuite('Test without using entity class', () => {

    testcase('Simple get request without token', async () => {
        let req = request(BASE_URL).get('/public/crocodiles/');
        const response = await req.execute();

        expect(response.status).toBe(200);

    });

});