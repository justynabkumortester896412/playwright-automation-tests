import { test as baseTest} from '@playwright/test';
import ReqresApi from '../tests/lib/ApiActions/restApiActions.act';

const test = baseTest.extend<{
    restApi: ReqresApi;
}>({
    restApi: async ({ request }, use) => {
        await use(new ReqresApi(request));
    }
})

export default test;