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

module.exports = checkId;