import { LoginUser, ProductName, Sorting } from '../data/data';
import test from '../testPage';

const chance = require('chance').Chance();

test('TEST-25 Validation 1.1', async ({ testPage }) => {
const firstName = chance.name().split(" ")[0];
const lastName = chance.name().split(" ")[1];
const postalCode = chance.natural({ min: 1, max: 88888 });
const orderCompleteInformation = 'Thank you for your order!';

  await test.step('Log in as a `standard user`', async () => {
    await testPage.loginPageActions.navigateTo.loginPage();
    await testPage.loginPageActions.assertLoginPageIsDisplayed();
    await testPage.loginPageActions.loginUser(LoginUser.standard_user, LoginUser.password);
    await testPage.productsPageActions.assertProductsPageIsDisplayed();
  });
  await test.step('Add all item to the cart', async () => {
    await testPage.productsPageActions.addItemsToShoppingCart();
    await testPage.productsPageActions.assertAllItemsAreAddedToShoppingCart();
  });
  await test.step('Go to the cart', async () => {
    await testPage.productsPageActions.navigateTo.shoppingCart();
    await testPage.shoppingCartActions.assertShoppingCartIsDisplayed();
  });
  await test.step('Find third item by name, then remove it from the cart', async () => {
    await testPage.shoppingCartActions.removeItemFromTheCart(ProductName.SauceLabsBoltTShirt);
  });
  await test.step('Validate in the Checkout Overview that: It only contains the items that you want to purchase', async () => {
    await testPage.shoppingCartActions.navigateTo.checkoutOverviewPage();
    await testPage.checkoutPageActions.fillInPageOfYourInformation(firstName,lastName,postalCode.toString());
    await testPage.checkoutPageActions.assertCheckoutListContainItems();
    await testPage.checkoutPageActions.assertCheckoutListNotContainItem(ProductName.SauceLabsBoltTShirt);
  });
  await test.step('Validate in the Checkout Overview that: The Item Total is right', async () => {
    await testPage.checkoutPageActions.assertTotalLabelIsProperly();
  });
  await test.step('Finish the purchase', async () => {
    await testPage.checkoutPageActions.clickOnTheFinishButton();
  });
  await test.step('Validate that the website confirms the order', async () => {
    await testPage.completeOrderPageActions.assertWebsiteConfirmsOrder(orderCompleteInformation);
  });
});

test('Validation 1.2', async ({ testPage }) => {
  await test.step('Log in as a `problem_user`', async () => {
    await testPage.loginPageActions.navigateTo.loginPage();
    await testPage.loginPageActions.assertLoginPageIsDisplayed();
    await testPage.loginPageActions.loginUser(LoginUser.problem_user,LoginUser.password);
    await testPage.productsPageActions.assertProductsPageIsDisplayed();
  });
  await test.step('Find one item by name, click on the item', async () => {
    await testPage.productsPageActions.openItem(ProductName.SauceLabsBikeLight);
    await testPage.itemPageActions.assertProductPageIsDisplayed();
  });
  await test.step('Add it to the cart from item page', async () => {
    await testPage.itemPageActions.addItemToShoppingCart();
  });
  await test.step('Go to the cart', async () => {
    await testPage.itemPageActions.navigateTo.shoppingCart();
    await testPage.shoppingCartActions.assertShoppingCartIsDisplayed();
  });
  await test.step('Validate that item was added', async () => {
    await testPage.shoppingCartActions.assertItemIsAddedToTheCart(ProductName.SauceLabsBikeLight)
  });
});

test('Validation 1.3', async ({ testPage }) => {
  await test.step('Log in as a `standard user`', async () => {
    await testPage.loginPageActions.navigateTo.loginPage();
    await testPage.loginPageActions.assertLoginPageIsDisplayed();
    await testPage.loginPageActions.loginUser(LoginUser.standard_user, LoginUser.password);
    await testPage.productsPageActions.assertProductsPageIsDisplayed();
  });
  await test.step('Sort products by name and validate that the sorting is right', async () => {
    await testPage.productsPageActions.sortProduct.expandSortOptions();
    await testPage.productsPageActions.sortProduct.byName(Sorting.Asc);
    await testPage.productsPageActions.assertProductsAreSortedByName(Sorting.Asc);
    await testPage.productsPageActions.sortProduct.expandSortOptions();
    await testPage.productsPageActions.sortProduct.byName(Sorting.Dsc);
    await testPage.productsPageActions.assertProductsAreSortedByName(Sorting.Dsc)
  });
});

test('TEST-51 Validation 1.4', async ({ testPage }) => {
  
  await test.step('Log in as a `standard user`', async () => {
    await testPage.loginPageActions.navigateTo.loginPage();
    await testPage.loginPageActions.assertLoginPageIsDisplayed();
    await testPage.loginPageActions.loginUser(LoginUser.standard_user, LoginUser.password);
    await testPage.productsPageActions.assertProductsPageIsDisplayed();
  });
  await test.step('Sort products by price and validate that the sorting is right', async () => {
    await testPage.productsPageActions.sortProduct.expandSortOptions();
    await testPage.productsPageActions.sortProduct.byPrice(Sorting.Asc);
    await testPage.productsPageActions.assertProductsAreSortedByPrice(Sorting.Asc);
    await testPage.productsPageActions.sortProduct.expandSortOptions();
    await testPage.productsPageActions.sortProduct.byPrice(Sorting.Dsc);
    await testPage.productsPageActions.assertProductsAreSortedByPrice(Sorting.Dsc);
  });
});

test('Validation 1.5', async ({ testPage }) => {
  await test.step('Log in as a `locked_out_user` - the validation should fail', async () => {
    await testPage.loginPageActions.navigateTo.loginPage();
    await testPage.loginPageActions.assertLoginPageIsDisplayed();
    await testPage.loginPageActions.loginUser(LoginUser.locked_out_user, LoginUser.password);
    await testPage.productsPageActions.assertProductsPageIsDisplayed();
  });
  await test.step('Add capabilities to your program so it can create reports with screenshots when something fails', async () => {
    // done - you can find it in test-result folder and in the generated report
  });
});

test('Validation 1.6', async ({ testPage }) => {
  const firstName = chance.name().split(" ")[0];
  const lastName = chance.name().split(" ")[1];
  const postalCode = chance.natural({ min: 1, max: 88888 });
  const orderCompleteInformation = 'Thank you for your order!';

  await test.step('Log in as a `performance_glitch_user`', async () => {
    await testPage.loginPageActions.navigateTo.loginPage();
    await testPage.loginPageActions.assertLoginPageIsDisplayed();
    await testPage.loginPageActions.loginUser(LoginUser.performance_glitch_user, LoginUser.password);
    await testPage.productsPageActions.assertProductsPageIsDisplayed();
  });
  await test.step('Add all item to the cart', async () => {
    await testPage.productsPageActions.addItemsToShoppingCart();
    await testPage.productsPageActions.assertAllItemsAreAddedToShoppingCart();
  });
  await test.step('Go to the cart', async () => {
    await testPage.productsPageActions.navigateTo.shoppingCart();
    await testPage.shoppingCartActions.assertShoppingCartIsDisplayed();
  });
  await test.step('Find third item by name, then remove it from the cart', async () => {
    await testPage.shoppingCartActions.removeItemFromTheCart(ProductName.SauceLabsBoltTShirt);
  });
  await test.step('Validate in the Checkout Overview that: It only contains the items that you want to purchase', async () => {
    await testPage.shoppingCartActions.navigateTo.checkoutOverviewPage();
    await testPage.checkoutPageActions.fillInPageOfYourInformation(firstName,lastName,postalCode);
    await testPage.checkoutPageActions.assertCheckoutListContainItems();
    await testPage.checkoutPageActions.assertCheckoutListNotContainItem(ProductName.SauceLabsBoltTShirt);
  });
  await test.step('Validate in the Checkout Overview that: The Item Total is right', async () => {
    await testPage.checkoutPageActions.assertTotalLabelIsProperly();
  });
  await test.step('Finish the purchase', async () => {
    await testPage.checkoutPageActions.clickOnTheFinishButton();
  });
  await test.step('Validate that the website confirms the order', async () => {
    await testPage.completeOrderPageActions.assertWebsiteConfirmsOrder(orderCompleteInformation);
  });
});


