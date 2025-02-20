import { authorizationToken } from '../auth/authentication';
import { test, scenario, runTests, beforeAll, beforeEach } from '../index';
import { EntityService } from '../services/entity-service';


const entity = new EntityService();
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

scenario('API Tests example', () => {

    test('Testando o get List da api crocodiles', async () => {
        return await entity.getList('/public/crocodiles/', 200);
    }, { skip: true });

    test('Testando o get com validacao token', async () => {
        return await entity.getList('/my/crocodiles/', 200, token);
    });

    test('Testando o post efetuando login', async () => {
        return await entity.create('/auth/token/login/', data.loginData, 200);

    });

});
