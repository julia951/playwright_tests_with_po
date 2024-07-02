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
        const items = await this.page.$$('.cart_item');
        return Promise.all(items.map(async item => ({
            name: await item.$eval('.inventory_item_name', el => el.innerText),
            description: await item.$eval('.inventory_item_desc', el => el.innerText),
            price: parseFloat(await item.$eval('.inventory_item_price', el => el.innerText.replace('$', '')))
        })));
    }

    async checkout() {
        await this.page.click('.checkout_button');
    }

    async navigate() {
        await this.page.click('.shopping_cart_link');
    }
}
