const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('Inventory Page Sorting', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');
    });

    test('Sort items in ascending order (A-Z)', async ({ inventoryPage }) => {
        await inventoryPage.sortItems('az');
        const itemNames = await inventoryPage.getItemNames();
        itemNames.sort();  
        expect(itemNames).toEqual(itemNames);
    });

    test('Sort items in descending order (Z-A)', async ({ inventoryPage }) => {
        await inventoryPage.sortItems('za');
        const itemNames = await inventoryPage.getItemNames();
        itemNames.sort().reverse(); 
        expect(itemNames).toEqual(itemNames);
    });

    test('Sort items by price in ascending order', async ({ inventoryPage }) => {
        await inventoryPage.sortItems('lohi');
        const itemPrices = await inventoryPage.getItemPrices();
        itemPrices.sort((a, b) => a - b);  
        expect(itemPrices).toEqual(itemPrices);
    });

    test('Sort items by price in descending order', async ({ inventoryPage }) => {
        await inventoryPage.sortItems('hilo');
        const itemPrices = await inventoryPage.getItemPrices();
        itemPrices.sort((a, b) => b - a);  
        expect(itemPrices).toEqual(itemPrices);
    
    });
});
