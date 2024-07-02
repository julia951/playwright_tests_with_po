class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', postalCode);
    }

    async continue() {
        await this.page.click('#continue');
        await this.page.waitForLoadState('networkidle'); 
    }

    async getCheckoutItems() {
        const items = await this.page.$$('.checkout_item');
        return Promise.all(items.map(async item => ({
            name: await item.$eval('.inventory_item_name', el => el.innerText),
            description: await item.$eval('.inventory_item_desc', el => el.innerText),
            price: parseFloat(await item.$eval('.inventory_item_price', el => el.innerText.replace('$', '')))
        })));
    }

    async calculateTotalPrice() {
        const itemPrices = await this.page.$$eval('.inventory_item_price', items =>
            items.map(item => parseFloat(item.innerText.replace('$', '')))
        );
        const totalPrice = itemPrices.reduce((acc, price) => acc + price, 0);
        return totalPrice;
    }

    async getDisplayedTotalPrice() {
        const totalText = await this.page.$eval('.summary_total_label', el => el.innerText);
        return parseFloat(totalText.replace('Total: $', ''));
    }
}

module.exports = { CheckoutPage };
