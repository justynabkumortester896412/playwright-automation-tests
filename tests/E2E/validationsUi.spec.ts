import { LoginUser, ProductName, Sorting } from '../data/data';
import test from '../testPage';

const chance = require('chance').Chance();

test('Validation 1.1', async ({ testPage }) => {
const firstName = 'Adam';
const lastName = 'Kowalski';
const postalCode = '55555';
const expectedTotalCount = '123.07';
const orderCompleteInformation = 'Thank you for your order!';

  await test.step('Log in as a `standard user`', async () => {
    await testPage.loginPageActions.navigateTo.loginPage();
    await testPage.loginPageActions.assertLoginPageIsDisplayed();
    await testPage.loginPageActions.loginUser(LoginUser.standard_user, LoginUser.password);
    await testPage.productsPageActions.assertProductsPageIsDisplayed();
  });
  await test.step('Add all item to the cart', async () => {
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.SauceLabsBackpack);
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.SauceLabsBikeLight);
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.SauceLabsBoltTShirt);
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.SauceLabsFleeceJacket);
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.SauceLabsOnesie);
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.TestAllTheThingsTShirtRed);
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
    await testPage.checkoutPageActions.assertCheckoutListContainItem(ProductName.SauceLabsBackpack);
    await testPage.checkoutPageActions.assertCheckoutListContainItem(ProductName.SauceLabsBikeLight);
    await testPage.checkoutPageActions.assertCheckoutListContainItem(ProductName.SauceLabsFleeceJacket);
    await testPage.checkoutPageActions.assertCheckoutListContainItem(ProductName.SauceLabsOnesie);
    await testPage.checkoutPageActions.assertCheckoutListContainItem(ProductName.TestAllTheThingsTShirtRed);
    await testPage.checkoutPageActions.assertCheckoutListNotContainItem(ProductName.SauceLabsBoltTShirt);
  });
  await test.step('Validate in the Checkout Overview that: The Item Total is right', async () => {
    await testPage.checkoutPageActions.assertTotalLabelIsProperly(expectedTotalCount);
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
    await testPage.productsPageActions.assertProductsAreSorted
    .byName(ProductName.SauceLabsBackpack,ProductName.TestAllTheThingsTShirtRed);
    await testPage.productsPageActions.sortProduct.expandSortOptions();
    await testPage.productsPageActions.sortProduct.byName(Sorting.Dsc);
    await testPage.productsPageActions.assertProductsAreSorted
    .byName(ProductName.TestAllTheThingsTShirtRed,ProductName.SauceLabsBackpack)
  });
});

test('Validation 1.4', async ({ testPage }) => {
  const hightestPrice = '49.99';
  const lowestPrice = '7.99';
  
  await test.step('Log in as a `standard user`', async () => {
    await testPage.loginPageActions.navigateTo.loginPage();
    await testPage.loginPageActions.assertLoginPageIsDisplayed();
    await testPage.loginPageActions.loginUser(LoginUser.standard_user, LoginUser.password);
    await testPage.productsPageActions.assertProductsPageIsDisplayed();
  });
  await test.step('Sort products by price and validate that the sorting is right', async () => {
    await testPage.productsPageActions.sortProduct.expandSortOptions();
    await testPage.productsPageActions.sortProduct.byPrice(Sorting.Asc);
    await testPage.productsPageActions.assertProductsAreSorted.byPrice(lowestPrice,hightestPrice);
    await testPage.productsPageActions.sortProduct.expandSortOptions();
    await testPage.productsPageActions.sortProduct.byPrice(Sorting.Dsc);
    await testPage.productsPageActions.assertProductsAreSorted.byPrice(hightestPrice,lowestPrice);
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
  const firstName = 'Adam';
  const lastName = 'Kowalski';
  const postalCode = '55555';
  const expectedTotalCount = '123.07';
  const orderCompleteInformation = 'Thank you for your order!';

  await test.step('Log in as a `performance_glitch_user`', async () => {
    await testPage.loginPageActions.navigateTo.loginPage();
    await testPage.loginPageActions.assertLoginPageIsDisplayed();
    await testPage.loginPageActions.loginUser(LoginUser.performance_glitch_user, LoginUser.password);
    await testPage.productsPageActions.assertProductsPageIsDisplayed();
  });
  await test.step('Add all item to the cart', async () => {
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.SauceLabsBackpack);
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.SauceLabsBikeLight);
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.SauceLabsBoltTShirt);
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.SauceLabsFleeceJacket);
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.SauceLabsOnesie);
    await testPage.productsPageActions.addItemToShoppingCart(ProductName.TestAllTheThingsTShirtRed);
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
    await testPage.checkoutPageActions.assertCheckoutListContainItem(ProductName.SauceLabsBackpack);
    await testPage.checkoutPageActions.assertCheckoutListContainItem(ProductName.SauceLabsBikeLight);
    await testPage.checkoutPageActions.assertCheckoutListContainItem(ProductName.SauceLabsFleeceJacket);
    await testPage.checkoutPageActions.assertCheckoutListContainItem(ProductName.SauceLabsOnesie);
    await testPage.checkoutPageActions.assertCheckoutListContainItem(ProductName.TestAllTheThingsTShirtRed);
    await testPage.checkoutPageActions.assertCheckoutListNotContainItem(ProductName.SauceLabsBoltTShirt);
  });
  await test.step('Validate in the Checkout Overview that: The Item Total is right', async () => {
    await testPage.checkoutPageActions.assertTotalLabelIsProperly(expectedTotalCount);
  });
  await test.step('Finish the purchase', async () => {
    await testPage.checkoutPageActions.clickOnTheFinishButton();
  });
  await test.step('Validate that the website confirms the order', async () => {
    await testPage.completeOrderPageActions.assertWebsiteConfirmsOrder(orderCompleteInformation);
  });
});


