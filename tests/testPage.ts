import { test as baseTest} from '@playwright/test';
import ActionsContainer from './lib/PagesActions/ActionsContainer.act';

const test = baseTest.extend<{
    testPage: ActionsContainer;
}>({
    testPage: async ({ page }, use) => {
        await use(new ActionsContainer(page));
    }
})

export default test;