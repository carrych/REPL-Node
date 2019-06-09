class DiscountCard {
    constructor(value, typeOfcurrency) {
        this.value = parseInt(value);
        this.typeOfCurrency = typeOfcurrency;
        this.accId = Math.floor(Math.random() * 100000000);
    }

    showAccountInfo() {
        console.log(`Balance:${this.value}, Type of currency:${this.typeOfCurrency}, Account number:${this.accId}`);
    }

    getMoney(howMuch) {

    }

    addMoney(howMuch) {

    }
}

module.exports = DiscountCard;