//
//
//
//
// switch (b) {
//     case '--create':
// if (!args[3]) {
//     let value = args[1],
//         typeOfcurrency = args[2],
//         newAccount = new Account(value, typeOfcurrency);
//     tempArr.push(newAccount);
//     if (tempArr.length > 0)
//         addAccount(arrOfAccounts, tempArr);
//     newAccount.showAccountInfo();
// }
// else if (args[3]) {
//     let value = args[1],
//         typeOfcurrency = args[2],
//         newAccount = new Account(value, typeOfcurrency);
//     switch (args[3]) {
//         case '+':
//             newAccount.addMoney(parseInt(args[4]));
//             newAccount.showAccountInfo();
//             break;
//         case '-':
//             newAccount.getMoney(parseInt(args[4]));
//             newAccount.showAccountInfo();
//             break;
//         default:
//             console.log('what??!');
//             break;
//     }
// }
//         console.log('use --help');
//         break;
//     default:
//         console.log('use --help');
//         break;
// }
//
//
// function addAccount(in_arr, data) {
//     in_arr[addAccount.cntr] = data;
//     addAccount.cntr++;
// }
//
// addAccount.cntr = 0;
// console.log(arrOfAccounts);
const Account = require('./modules/classAccount'),
    rt = require('console-ultimate'),
    chalk = require('chalk'),
    repl = require('repl'),
    replServer = repl.start({prompt: '> '}),
    success = chalk.keyword('cyan'),
    info = chalk.keyword('magenta'),
    checkId = require('./modules/check');

let currentAcc = {},
    arrOfAccounts = [];

replServer.defineCommand(`create`, {
    help: 'create account and added balance and type of currency',
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

replServer.defineCommand('get', function (data) {
    this.clearBufferedCommand();
    let temp = data.split(' '),
        value = temp[0];
    if (value < currentAcc.value) {
        currentAcc.value -= value;
        console.log(success('Successful operation!'));
    }
    else console.warn('More gold is required!');
    arrOfAccounts[currentAcc.accId] = currentAcc;
    this.displayPrompt();
});

replServer.defineCommand('add', function (data) {
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
});

replServer.defineCommand('send', function (data) {
    this.clearBufferedCommand();
    let temp = data.split(' '),
        accId_1 = temp[0],
        accId_2 = temp[1],
        value = temp[2];
    if (checkId(arrOfAccounts, accId_1, accId_2)) {
        if (arrOfAccounts[accId_1].value > value) {
            arrOfAccounts[accId_1].value -= value;
            arrOfAccounts[accId_2].value += parseInt(value);
            console.log(success(`Successful operation!`));
        }
        else console.warn('More gold is required for transaction!');
    }
    else console.error('One of id`s is wrong! Check your data ...');
    this.displayPrompt();
});

replServer.defineCommand('change', function (data) {
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
});

replServer.defineCommand('show', function () {
    this.clearBufferedCommand();
    for (let key in arrOfAccounts)
        console.log(info(`Acc: ${key}; Acc data: ${arrOfAccounts[key].value} ${arrOfAccounts[key].typeOfCurrency}`));
    this.displayPrompt();
});

replServer.defineCommand('balance', function () {
    this.clearBufferedCommand();
    console.log(info(`Balance: ${currentAcc.value}`));
    this.displayPrompt();
});

replServer.defineCommand('pay', function () {
    this.clearBufferedCommand();

});

replServer.defineCommand('exit', function () {
    this.clearBufferedCommand();
    console.warn('Goodbye!');
    this.close();
});

