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
    async assertCheckoutListNotContainItem(itemName: string): Promise<void> {
        await expect(this.page.locator(checkoutPage.itemName, { hasText: itemName })).toBeHidden();
    }
    async assertTotalLabelIsProperly(expectedTotal: string): Promise<void> {
        await expect(this.page.locator(checkoutPage.total, { hasText: expectedTotal })).toBeVisible();
    }
    async clickOnTheFinishButton(): Promise<void> {
        await this.page.locator(checkoutPage.finishButton).click();
    }
}