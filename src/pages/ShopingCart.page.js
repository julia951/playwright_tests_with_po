const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getCartItems() {
        const itemCount = await this.cartItems.count();
        const items = [];

        for (let i = 0; i < itemCount; i++) {
            const item = this.cartItems.nth(i);
            const name = await item.locator('.inventory_item_name').innerText();
            const description = await item.locator('.inventory_item_desc').innerText();
            const priceText = await item.locator('.inventory_item_price').innerText();
            const price = parseFloat(priceText.replace('$', ''));
            items.push({ name, description, price });
        }

        return items;
    }

    async checkout() {
        await this.page.click('.checkout_button');
    }

    async navigate() {
        await this.page.click('.shopping_cart_link');
    }
}
