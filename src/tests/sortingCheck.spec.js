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
        const sortedItemNames = itemNames.sort();
        expect(itemNames).toEqual(sortedItemNames);
    });

    test('Sort items in descending order (Z-A)', async ({ inventoryPage }) => {
        await inventoryPage.sortItems('za');
        const itemNames = await inventoryPage.getItemNames();
        const sortedItemNames = itemNames.sort().reverse();
        expect(itemNames).toEqual(sortedItemNames);
    });

    test('Check item names without sorting', async ({ inventoryPage }) => {
        const itemNames = await inventoryPage.getItemNames();
        const sortedItemNames = itemNames.sort();
        expect(itemNames).not.toEqual(sortedItemNames);
    });
});
