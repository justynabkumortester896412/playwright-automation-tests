import { Page, expect } from '@playwright/test';
import completeOrderPage from '../../pages/completeOrderPage.po';

export default class CompleteOrderPageActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async assertItemsAreOrderedSuccessfully(orderInformation: string): Promise<void> {
            await expect(this.page.locator(completeOrderPage.completeOrderInformation, { hasText: `${orderInformation}`}), 
            `Cannot found expected information on the confirm order page: "${orderInformation}"`).toBeVisible();
        }
}