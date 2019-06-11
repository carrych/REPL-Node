class DiscountCard {
    constructor(cardId) {
        this.discount = 1;
        this.amountOfPurchases = 0;
        this.cardId = cardId;
    }

    showDiscountInfo(in_info) {
        console.log(in_info(`Card:${this.cardId}, Discount:${this.discount} %`));
    }

    makeDiscount(in_value) {
        return in_value - (in_value * this.discount * 0.01);
    }

    set_amountOfPurchases(value) {
        this.amountOfPurchases += parseInt(value);
        console.log(Math.floor(parseInt(this.amountOfPurchases) / 1000));
        this.discount += Math.floor(parseInt(this.amountOfPurchases) / 1000);
        if (this.amountOfPurchases > 1000)
            this.amountOfPurchases %= 1000;
    }

    showNextPointForDiscount(in_info) {
        if (this.amountOfPurchases < 1000)
            console.log(in_info(`Your discount:${this.discount} %; Next point for discount after:${1000 - this.amountOfPurchases}`));
        else console.log(in_info(`Your discount:${this.discount} %; Next point for discount after:${this.amountOfPurchases % 1000}`));
    }
}

module.exports = DiscountCard;