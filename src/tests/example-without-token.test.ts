import { authorizationToken } from '../auth/authentication';
import { testcase, testsuite, runTests, beforeAll } from '../index';
import { EntityService } from '../services/entity-service';

const entity = new EntityService();
let token = '';

beforeAll(async () => {
    token = await authorizationToken.getToken();
});

testsuite('API Tests example', () => {

    testcase('Testando o get List da api crocodiles', async () => {
        await entity.getList('/public/crocodiles/', 200);
    }, { skip: true });

    testcase('Testando o get com validacao token', async () => {
        await entity.getList('/my/crocodiles/', 200, token);
    });

});

runTests();