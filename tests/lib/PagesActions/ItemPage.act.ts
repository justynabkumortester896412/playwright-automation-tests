import { Page, expect } from '@playwright/test';
import itemPage from '../../pages/itemPage.po';

export default class ItemPageActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    navigateTo = {
        shoppingCart: async (): Promise<void> => {
            await this.page.locator(itemPage.shoppingCart).click();
        },
    }
    
    async assertProductPageIsDisplayed(): Promise<void> {
        await expect(this.page.locator(itemPage.pageContent),'The Product Page is not displayed').toBeVisible();
    }

    async addItemToShoppingCart(): Promise<void> {
        await this.page.locator(itemPage.addToCartButton).click();
        }
}