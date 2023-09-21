import { Page } from "@playwright/test";
import CheckoutPageActions from "./CheckoutPage.act";
import CompleteOrderPageActions from "./CompleteOrderPage.act";
import ItemPageActions from "./ItemPage.act";
import LoginPageActions from './LoginPage.act';
import ProductsPageActions from "./ProductsPage.act";
import ShoppingCartActions from "./ShoppingCart.act";

export default class ActionsContainer {
    readonly page: Page;
    readonly loginPageActions: LoginPageActions;
    readonly productsPageActions: ProductsPageActions;
    readonly shoppingCartActions: ShoppingCartActions;
    readonly checkoutPageActions: CheckoutPageActions;
    readonly completeOrderPageActions: CompleteOrderPageActions;
    readonly itemPageActions: ItemPageActions;

    constructor(page: Page) {
        this.page = page;
        this.loginPageActions = new LoginPageActions(page);
        this.productsPageActions = new ProductsPageActions(page);
        this.shoppingCartActions = new ShoppingCartActions(page);
        this.checkoutPageActions = new CheckoutPageActions(page);
        this.completeOrderPageActions = new CompleteOrderPageActions(page);
        this.itemPageActions = new ItemPageActions(page);
    }
}
