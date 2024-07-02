// InventoryPage.js
const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

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

    async addRandomProductsToCart(count) {
        // Get all product elements
        const products = await this.page.$$('.inventory_item');

        // Add random products to the cart
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * products.length);
            const product = products[randomIndex];
            
            // Find and click the 'Add to cart' button for the product
            const addToCartButton = await product.$('.btn_inventory');
            if (addToCartButton) {
                await addToCartButton.click();
            } else {
                throw new Error('Add to cart button not found');
            }
        }
    }
}
