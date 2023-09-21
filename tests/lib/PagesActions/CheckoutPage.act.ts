import { Page, expect } from '@playwright/test';
import checkoutPage from '../../pages/checkoutPage.po';

export default class CheckoutPageActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async assertCheckoutOverviewPageIsDisplayed(): Promise<void> {
            await expect(this.page.locator(checkoutPage.checkoutYourInformationContent), 'The checkoutOverviewPage is not displayed').toBeVisible();
        }

    async fillInPageOfYourInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.page.locator(checkoutPage.firstName).click();
        await this.page.keyboard.type(firstName);
        await this.page.keyboard.press('Tab');
        await this.page.locator(checkoutPage.lastName).click();
        await this.page.keyboard.type(lastName);
        await this.page.keyboard.press('Tab');
        await this.page.locator(checkoutPage.postalCode).click();
        await this.page.keyboard.type(postalCode);
        await this.page.keyboard.press('Tab');
        await this.page.locator(checkoutPage.continueButton).click();
    }
    async assertCheckoutListContainItem(itemName: string): Promise<void> {
        await expect(this.page.locator(checkoutPage.itemName, { hasText: itemName })).toBeVisible();
    }

    async assertCheckoutListContainItems(): Promise<void> {
        for (const itemLocator of await this.page.locator(checkoutPage.itemName).all())
        await expect(itemLocator).toBeVisible();
    }

    async assertCheckoutListNotContainItem(itemName: string): Promise<void> {
        await expect(this.page.locator(checkoutPage.itemName, { hasText: itemName })).toBeHidden();
    }
    async assertTotalLabelIsProperly(): Promise<void> {
        let itemsPrice: Array<number> = [];
        let sum: number = 0;
        const totalPrice = this.page.locator(checkoutPage.total);
        const totalP = await totalPrice.textContent();
        const total = Number(totalP!.split('$')[1]);
        const taxPrice = this.page.locator(checkoutPage.tax);
        const taxP = await taxPrice.textContent();
        const tax = Number(taxP!.split('$')[1]);

        for(let item of await this.page.locator(checkoutPage.price).all()){
            let itemPrice = await item.textContent();
            itemsPrice.push(Number(itemPrice!.replace('$','')));
        }

        for (let i = 0; i < itemsPrice.length; i++) {
            sum += itemsPrice[i];
        }

        const pricesSum = sum+tax;
        expect(Number(pricesSum.toFixed(2))).toEqual(total);
    }
        
    async clickOnTheFinishButton(): Promise<void> {
        await this.page.locator(checkoutPage.finishButton).click();
    }
}