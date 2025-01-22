import { authorizationToken } from '../auth/authentication';
import { testcase, testsuite, runTests, beforeAll, beforeEach } from '../index';
import { EntityService } from '../services/entity-service';
import { data } from '../data/general-data';


const entity = new EntityService();
let token = '';

// beforeEach(async () => {
//     token = await authorizationToken.getToken();
// });

testsuite('API Tests example', () => {

    // testcase('Testando o get List da api crocodiles', async () => {
    //     await entity.getList('/public/crocodiles/', 200);
    // }, { skip: true });

    // testcase('Testando o get com validacao token', async () => {
    //     await entity.getList('/my/crocodiles/', 200, token);
    // });

    testcase('Testando o post efetuando login', async () => {
        await entity.create('/auth/token/login/', data.loginData, 200);
        
    });

});

runTests();