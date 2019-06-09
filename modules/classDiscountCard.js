class Account {
    constructor(value, typeOfcurrency) {
        this.value = parseInt(value);
        this.typeOfCurrency = typeOfcurrency;
        this.accId = Math.floor(Math.random() * 100000000);
    }

    showAccountInfo() {
        console.log(`Balance:${this.value}, Type of currency:${this.typeOfCurrency}, Account number:${this.accId}`);
    }

    getMoney(howMuch) {
        if (howMuch < 0) {
            console.log(`Wrong data!`);
        }
        else if (howMuch > this.value)
            console.log(`Not enought funds! Your balance: ${this.value}`);
        else {
            this.value -= howMuch;
            console.log(`Your balance: ${this.value}`);
        }
    }

    addMoney(howMuch) {
        if (howMuch < 0) {
            console.log(`Wrong data!`);
        }
        else {
            this.value += howMuch;
            console.log(`Your balance: ${this.value}`);
        }
    }
}

module.exports = Account;