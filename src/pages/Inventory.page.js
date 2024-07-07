const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    inventoryItemsName = '.inventory_item_name';

    inventoryItemsPrice = '.inventory_item_price';

    inventoryItemsDescription = '.inventory_item_desc';
    
    get headerTitle() { return this.page.locator('.title'); }

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get sortDropdown() { return this.page.locator('.product_sort_container'); }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    async sortItems(option) {
        await this.sortDropdown.selectOption(option);
    }

    async getItemNames() {
        return this.inventoryItems.locator('.inventory_item_name').allTextContents();
    }

    async getItemPrices() {
        const prices = await this.page.$$eval('.inventory_item_price', items =>
            items.map(item => parseFloat(item.innerText.replace('$', '')))
        );
        return prices;
    }

    async addItemsToCart(randomItems) {
        for (const item of randomItems) {
            await this.addItemToCartById(item);
        }
    }

    async getItemsDetails(selectedItemsIndexes) {
        const details = await Promise.all([
            this.getInventoryItemsNames(selectedItemsIndexes),
            this.getInventoryItemsDescriptions(selectedItemsIndexes),
            this.getInventoryItemsPrices(selectedItemsIndexes),
        ]);

        return details[0].map((name, index) => ({
            name,
            description: details[1][index],
            price: details[2][index],
        }));
    }

    async getInventoryItemsNames(selectedItemsIndexes) {
        return await Promise.all(selectedItemsIndexes.map(async (index) => await this.page.locator(this.inventoryItemsName).nth(index).textContent()));
    }

    async getInventoryItemsDescriptions(selectedItemsIndexes) {
        return await Promise.all(selectedItemsIndexes.map(async (index) => await this.page.locator(this.inventoryItemsDescription).nth(index).textContent()));
    }

    async getInventoryItemsPrices(selectedItemsIndexes) {
        return await Promise.all(selectedItemsIndexes.map(async (index) => {
            const priceText = await this.page.locator(this.inventoryItemsPrice).nth(index).textContent();
            return parseFloat(priceText.replace('$', ''));
        }));
    }

    // async addRandomProductsToCart(count) {
    //     const products = await this.page.locator('.inventory_item');

    //     for (let i = 0; i < count; i++) {
    //         const randomIndex = Math.floor(Math.random() * products.length);
    //         const product = products[randomIndex];
            
    //         const addToCartButton = await product.locator('.btn_inventory');
    //         if (addToCartButton) {
    //             await addToCartButton.click();
    //         } else {
    //             throw new Error('Add to cart button not found');
    //         }
    //     }
    // }
}
