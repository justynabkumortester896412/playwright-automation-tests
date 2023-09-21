import { Page, expect } from '@playwright/test';
import { Sorting } from '../../data/data';
import productsPage from '../../pages/productsPage.po';

export default class ProductsPageActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    navigateTo = {
        shoppingCart: async (): Promise<void> => {
            await this.page.locator(productsPage.shoppingCart).click();
        },
    }
    
    async assertProductsPageIsDisplayed(): Promise<void> {
        await expect(this.page.locator(productsPage.pageContent),'The Products Page is not displayed').toBeVisible();
    }

    sortProduct = {
        expandSortOptions: async (): Promise<void> => {
            await this.page.locator(productsPage.sortSelect).click();
        },
        byName: async (productSorting: Sorting): Promise<void> => {
            switch (productSorting) {
                case Sorting.Asc:
                    await this.selectSortingOption(productsPage.sortByNameAsc);
                    break;
                case Sorting.Dsc:
                    await this.selectSortingOption(productsPage.sortByNameDsc);
            }
        },
        byPrice: async (productSorting: Sorting): Promise<void> => {
            switch (productSorting) {
                case Sorting.Asc:
                    await this.selectSortingOption(productsPage.sortByPriceAsc);
                    break;
                case Sorting.Dsc:
                    await this.selectSortingOption(productsPage.sortByPriceDsc);
            }
        },
    };

    private async selectSortingOption(sortingOption: string): Promise<void> {
        await this.page.locator(productsPage.sortSelect).selectOption(sortingOption);
    }

    assertProductsAreSorted ={
        byName: async (firstProductName: string, lastProductName: string): Promise<void> => {
               await expect(this.page.locator(productsPage.firstItem, { hasText: `${firstProductName}`})).toBeVisible();
               await expect(this.page.locator(productsPage.sixthItem, { hasText: `${lastProductName}`})).toBeVisible();
        },
        byPrice: async (firstProductPrice: string, lastProductPrice: string): Promise<void> => {
            await expect(this.page.locator(productsPage.firstPrice, { hasText: `${firstProductPrice}`})).toBeVisible();
            await expect(this.page.locator(productsPage.sixthPrice, { hasText: `${lastProductPrice}`})).toBeVisible(); 
        },
    };

    async openItem(ItemName: string): Promise<void> {
        await this.page.locator(productsPage.linkOfItem, { hasText: `${ItemName}`}).click();
    }

    async addItemToShoppingCart(productName: string): Promise<void> {
        await this.page.locator(productsPage.item, { hasText: productName}).locator(productsPage.addToCartButton).click();

            // const tab = this.page.locator(productsPage.item); // sprawdzić

            // for (let i = 0; i < tab.all.length; i++) {
            //     await tab.first().locator(productsPage.addToCartButton).click();
            // }
        }

    async assertAllItemsAreAddedToShoppingCart(): Promise<void> {
        const tab = this.page.locator(productsPage.item);

        for (let i = 0; i < tab.all.length; i++) {
                await expect(tab.all[i].locator(productsPage.removeButton), `There is item no added to shopping cart`).toBeVisible();
        }
    }
}
