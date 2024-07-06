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
        const items = this.page.locator('.checkout_item');
        const itemCount = await items.count();
        const itemList = [];

        for (let i = 0; i < itemCount; i++) {
            const item = items.nth(i);
            const name = await item.locator('.inventory_item_name').innerText();
            const description = await item.locator('.inventory_item_desc').innerText();
            const priceText = await item.locator('.inventory_item_price').innerText();
            const price = parseFloat(priceText.replace('$', ''));
            itemList.push({ name, description, price });
        }

        return itemList;
    }

    async calculateTotalPrice() {
        const prices = await this.page.locator('.inventory_item_price');
        const priceCount = await prices.count();
        let totalPrice = 0;

        for (let i = 0; i < priceCount; i++) {
            const priceText = await prices.nth(i).innerText();
            const price = parseFloat(priceText.replace('$', ''));
            totalPrice += price;
        }

        return totalPrice;
    }

    async getDisplayedTotalPrice() {
        const totalText = await this.page.locator('.summary_total_label').innerText();
        return parseFloat(totalText.replace('Total: $', ''));
    }
}

module.exports = { CheckoutPage };
