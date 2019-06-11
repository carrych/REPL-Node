function checkId(arrOfAcc, ...id) {
    let check = 0;

    if (id.length === 1) {

        for (let key in arrOfAcc)
            if (key === id[0])
                return true;
        return false;
    }

    for (let key in arrOfAcc) {

        if (key === id[0]) {
            check++;
        }

        if (key === id[1]) check++;
    }

    if (check === 2) return true;
    else return false;
}

function checkBalance(in_value,in_balance) {
    if (in_value < 0) return false;
    return (in_balance > in_value) ? true : false;
}

module.exports = checkId;
module.exports = checkBalance;