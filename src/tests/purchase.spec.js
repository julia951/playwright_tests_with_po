// purchase.spec.js
const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { randomChoiceItems } = require('../utils/randomItems');


test.describe('Shopping Cart and Checkout', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');
    });

    test('Add products to cart, checkout, and verify', async ({ inventoryPage, shopingCartPage, checkoutPage }) => { 
        const numItems = await inventoryPage.inventoryItems.count();
        const randomItems = randomChoiceItems(numItems);

        await inventoryPage.addItemsToCart(randomItems);

        const cartItemsDetails = await inventoryPage.getItemsDetails(randomItems);


      //  await inventoryPage.addRandomProductsToCart(3); 
        
        await shopingCartPage.navigate();
        
        const cartItems = await shopingCartPage.getCartItems();

        await shopingCartPage.checkout();

        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.continue();

        const checkoutItems = await checkoutPage.getCheckoutItems();
        expect(cartItems).toEqual(checkoutItems);

        const totalPrice = await checkoutPage.calculateTotalPrice();
        const displayedTotalPrice = await checkoutPage.getDisplayedTotalPrice();
        expect(totalPrice).toEqual(displayedTotalPrice);
    });
});
