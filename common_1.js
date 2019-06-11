const Account = require('./modules/classAccount'),
    DiscountCard = require('./modules/classDiscountCard'),
    consoleUltimate = require('console-ultimate'),
    chalk = require('chalk'),
    repl = require('repl'),
    replServer = repl.start({prompt: '> '}),
    success = chalk.keyword('cyan'),
    info = chalk.keyword('magenta'),
    checkId = require('./modules/check'),
    checkBalance = require('./modules/check');

let currentAcc = {},
    arrOfAccounts = [],
    newDiscountCard = new DiscountCard(777);

replServer.defineCommand(`create`, {
    help: 'Create account and added balance and type of currency',
    action(data) {
        this.clearBufferedCommand();
        let temp = data.split(' '),
            value = temp[0],
            typeOfCurrency = temp[1],
            newAccount = new Account(value, typeOfCurrency),
            tempObj = {};
        tempObj.accId = newAccount.accId;
        tempObj.value = newAccount.value;
        tempObj.typeOfCurrency = newAccount.typeOfCurrency;
        newAccount.showAccountInfo();
        currentAcc = tempObj;
        arrOfAccounts[tempObj.accId] = tempObj;
        console.log(success('Account created successfully!'));
        console.warn(arrOfAccounts);
        this.displayPrompt();
    }
});

replServer.defineCommand('get', {
    help: 'Get money from the account',
    action(data) {
        this.clearBufferedCommand();
        let temp = data.split(' '),
            value = temp[0];
        if (checkBalance(value, currentAcc.value)) {
            currentAcc.value -= value;
            console.log(success('Successful operation!'));
        }
        else console.warn('More gold is required!');
        arrOfAccounts[currentAcc.accId] = currentAcc;
        this.displayPrompt();
    }
});

replServer.defineCommand('add', {
    help: 'Add money to the account',
    action(data) {
        this.clearBufferedCommand();
        let temp = data.split(' '),
            value = temp[0];
        if (value > 0) {
            currentAcc.value += parseInt(value);
            console.log(success('Successful operation!'));
        }
        else console.error('Wrong value!');
        arrOfAccounts[currentAcc.accId] = currentAcc;
        this.displayPrompt();
    }
});

replServer.defineCommand('send', {
    help: 'Transaction from account to another account',
    action(data) {
        this.clearBufferedCommand();
        let temp = data.split(' '),
            value = temp[0],
            accId = temp[1];
        if (checkId(arrOfAccounts, accId)) {
            if (arrOfAccounts[accId].value > value) {
                currentAcc.value -= value;
                arrOfAccounts[accId].value += parseInt(value);
                console.log(success(`Successful operation!`));
                arrOfAccounts[currentAcc.accId] = currentAcc;
            }
            else console.warn('More gold is required for transaction!');
        }
        else console.error('One of id`s is wrong! Check your data ...');
        this.displayPrompt();
    }
});

replServer.defineCommand('change', {
    help: 'Change current account',
    action(data) {
        this.clearBufferedCommand();
        let temp = data.split(' '),
            accId = temp[0];
        if (checkId(arrOfAccounts, accId)) {
            currentAcc.accId = accId;
            currentAcc.value = arrOfAccounts[accId].value;
            currentAcc.typeOfCurrency = arrOfAccounts[accId].typeOfCurrency;
            console.log(success('Successful operation!'));
            console.log(info(`Your current account: ${currentAcc.accId}`))
        }
        else console.error('One of id`s is wrong! Check your data ...');
        this.displayPrompt();
    }
});

replServer.defineCommand('show', {
    help: 'Show information about current account',
    action() {
        this.clearBufferedCommand();
        for (let key in arrOfAccounts)
            console.log(info(`Acc id: ${key}; Acc balance: ${arrOfAccounts[key].value} ${arrOfAccounts[key].typeOfCurrency}`));
        this.displayPrompt();
    }
});

replServer.defineCommand('balance', {
    help: 'Show balance of account',
    action() {
        this.clearBufferedCommand();
        console.log(info(`Balance: ${currentAcc.value}${currentAcc.typeOfCurrency}`));
        this.displayPrompt();
    }
});

replServer.defineCommand('pay', {
    help: 'Pay bills from current account. Key: -y - we have discount; -n - discount is absent',
    action(data) {
        this.clearBufferedCommand();
        let temp = data.split(' '),
            value = temp[0],
            key = temp[1];
        if (key === '-n')
            currentAcc.value -= value;
        else if (key === '-y') {
            console.log(success('Successful operation!'));
            currentAcc.value -= newDiscountCard.makeDiscount(value);
            console.log(success(`Balance: ${currentAcc.value}${currentAcc.typeOfCurrency}`));
            newDiscountCard.set_amountOfPurchases(value);
            newDiscountCard.showDiscountInfo(info);
            newDiscountCard.showNextPointForDiscount(info);
        }
        arrOfAccounts[currentAcc.accId] = currentAcc;
    }
});

replServer.defineCommand('exit', {
    help: 'Exit from program',
    action() {
        this.clearBufferedCommand();
        console.warn('Goodbye!');
        this.close();
    }
});

