export default {
    url: {
        loginPage: `https://www.saucedemo.com/`,
    }
}

export enum LoginUser {
    standard_user = "standard_user",
    locked_out_user = "locked_out_user",
    problem_user = "problem_user",
    performance_glitch_user = "performance_glitch_user",
    password = "secret_sauce",
}

export enum ProductName {
    SauceLabsBackpack = "Sauce Labs Backpack",
    SauceLabsBikeLight = "Sauce Labs Bike Light",
    SauceLabsBoltTShirt = "Sauce Labs Bolt T-Shirt",
    SauceLabsFleeceJacket = "Sauce Labs Fleece Jacket",
    SauceLabsOnesie = "Sauce Labs Onesie",
    TestAllTheThingsTShirtRed  = "Test.allTheThings() T-Shirt (Red)",
}

export enum Sorting {
    Asc = "ASC",
    Dsc = "DSC",
}
