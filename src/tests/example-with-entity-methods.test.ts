import { authorizationToken } from '../auth/authentication';
import { testcase, testsuite, beforeEach } from '../index';
import { EntityService } from '../services/entity-service';


const entity = new EntityService();
const BASE_URL = 'https://test-api.k6.io'
let token = '';

beforeEach(async () => {
    token = await authorizationToken.getToken();
});

export const data = {
    loginData: {
        username: 'usuarioteste02',
        password: '1234hh'
    }
};

testsuite('API Tests example', () => {

    testcase('Testando o get List da api crocodiles', async () => {
        return await entity.getList(BASE_URL,'/public/crocodiles/', 200);
    }, { skip: true });

    testcase('Testando o get com validacao token', async () => {
        return await entity.getList(BASE_URL,'/my/crocodiles/', 200, token);
    });

    testcase('Testando o post efetuando login', async () => {
        return await entity.create(BASE_URL, '/auth/token/login/', data.loginData, 200);

    });

});
