import { testcase, testsuite, runTests } from '../index';
import { EntityService } from '../services/entity-service';

const entity = new EntityService();

testsuite('API Tests example', () => {

    testcase('Testando o get List da api crocodiles', async () => {
        await entity.getList('public/crocodiles/', 200);
    })

});

runTests();