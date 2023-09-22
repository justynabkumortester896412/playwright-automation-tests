import { Page, expect } from '@playwright/test';
import shoppingCartPage from '../../pages/shoppingCart.po';

export default class ShoppingCartActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    navigateTo = {
        productsPage: async (): Promise<void> => {
            await this.page.locator(shoppingCartPage.continueShoppingButton).click();
        },
        checkoutOverviewPage: async (): Promise<void> => {
            await this.page.locator(shoppingCartPage.checkoutButton).click();
        }
    }
    
    async assertShoppingCartIsDisplayed(): Promise<void> {
         await expect(this.page.locator(shoppingCartPage.shoppingCartContent), 
         'The Shopping cart is not displayed').toBeVisible();
    }

    async assertItemIsAddedToTheCart(itemName: string): Promise<void> {
        await expect(this.page.locator(shoppingCartPage.item, { hasText: itemName }), 
        'The product is not added to the shopping cart').toBeVisible();
    }

    async removeItemFromTheCart(): Promise<void> {
        let itemsNames: Array<string> = [];
        for(let item of  await this.page.locator(shoppingCartPage.itemName).all()){
            let name = await item.textContent();
            itemsNames.push(name!);
        }

        const itemName = itemsNames[2];

        await this.page.locator(shoppingCartPage.item, { hasText: itemName})
        .locator(shoppingCartPage.removeButton).click();
        await expect(this.page.locator(shoppingCartPage.item, { hasText: itemName })
        , 'The item is still in the Shopping cart').toBeHidden();
    }
}