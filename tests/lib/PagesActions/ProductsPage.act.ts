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

    async assertProductsAreSortedByName(direction: string): Promise<void>{
        let itemsNames: Array<string> = [];
        for(let item of  await this.page.locator(productsPage.itemName).all()){
            let itemName = await item.textContent();
            itemsNames.push(itemName!);
        }

        let sortDirection = this.getSortDirection(itemsNames);
        expect(direction).toEqual(sortDirection);
    }

    async assertProductsAreSortedByPrice(direction: string): Promise<void>{
        let itemsPrice: Array<number> = [];
        for(let item of await this.page.locator(productsPage.price).all()){
            let itemPrice = await item.textContent();
            itemsPrice.push(Number(itemPrice!.replace('$','')));
        }

        const prices = [...itemsPrice];

        if (direction == Sorting.Asc) { 
            prices.sort((a, b) => a - b)
        } ; 
        if (direction == Sorting.Dsc) { 
            prices.sort((a, b) => b - a)
        };
        
        expect(itemsPrice).toEqual(prices);
    }

    private getSortDirection(arr: Array<string>): Sorting | null {
        const c: Array<number> = [];
        for (let i = 1; i < arr.length; i++) {
          c.push(arr[i - 1].localeCompare(arr[i]));
        }
      
        if (c.every((n) => n <= 0)) return Sorting.Asc;
        if (c.every((n) => n >= 0)) return Sorting.Dsc;
      
        return null;
      }

    async openItem(ItemName: string): Promise<void> {
        await this.page.locator(productsPage.linkOfItem, { hasText: `${ItemName}`}).click();
    }

    async addItemsToShoppingCart(): Promise<void> {
        for (const itemLocator of await this.page.locator(productsPage.item).all())
        await itemLocator.locator(productsPage.addToCartButton).click();
        }

    async assertAllItemsAreAddedToShoppingCart(): Promise<void> {
        const tab = this.page.locator(productsPage.item);

        for (let i = 0; i < tab.all.length; i++) {
                await expect(tab.all[i].locator(productsPage.removeButton), `There is item no added to shopping cart`).toBeVisible();
        }
    }
}
