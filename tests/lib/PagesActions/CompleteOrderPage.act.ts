import { Page, expect } from '@playwright/test';
import completeOrderPage from '../../pages/completeOrderPage.po';

export default class CompleteOrderPageActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async assertWebsiteConfirmsOrder(orderInformation: string): Promise<void> {
            await expect(this.page.locator(completeOrderPage.completeOrderInformation, { hasText: `${orderInformation}`})).toBeVisible();
        }
}