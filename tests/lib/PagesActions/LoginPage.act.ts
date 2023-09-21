import { Page, expect } from '@playwright/test';
import data from '../../data/data';
import loginPage from '../../pages/loginPage.po';

export default class LoginPageActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    navigateTo = {
        loginPage: async (): Promise<void> => {
            await this.page.goto(data.url.loginPage);
        }
    }
    
    async assertLoginPageIsDisplayed(): Promise<void>  {
        await expect(this.page.locator(loginPage.pageTitle), 'The Page is not displayed properly').toBeVisible();
    }

    async loginUser(login: string, password: string ): Promise<void> {
        await this.page.locator(loginPage.userName).click();
        await this.page.keyboard.type(login);
        await this.page.keyboard.press('Tab');
        await this.page.locator(loginPage.password).click();
        await this.page.keyboard.type(password);
        await this.page.keyboard.press('Tab');
        await this.page.locator(loginPage.loginButton).click();
    }
}