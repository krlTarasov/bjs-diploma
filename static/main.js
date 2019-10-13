class Profile {
    constructor({username, name: {firstName, lastName}, password}) {
        this.username = username;
        this.name = {
            firstName: name.firstName,
            lastName: name.lastName
        };
        
        this.password = password;
    }

    addNewUser(callback) {
        return ApiConnector.createUser({
            username: this.username,
            name: this.name,
            password: this.password
        }, (err, data) => {
            console.log(`User ${this.username} has been added`);
            callback(err, data);
        })
    }

    logIn(callback) {
        return ApiConnector.performLogin({
            username: this.username,
            password: this.password,
        }, (err, data) => {
            console.log(`Authorizung user ${this.username}`)
            callback(err, data);
        })
    }

    addMoney({currency, amount}, callback) {
        return ApiConnector.addMoney({currency, amount}, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        })
    }

    сonvertCurrency( {fromCurrency, targetCurrency, targetAmount}, callback ) {
        return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`)
            callback(err, data);
        })
    }

    transferToken({to, amount} ,callback) {
        return ApiConnector.transferMoney({to, amount}, (err, data) => {
            console.log(`Transfering ${amount} to ${to}`)
            callback(err, data);
        })
    }
}

function getRates(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log('Getting rates');
        callback(err, data);
    });
}


function main(){

    let rates = getRates((err, data) => {
        if (err) {
            console.error('error during getRates');
        }
    })

    console.log(rates + '___________________');

    const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
    });

    const Maxim = new Profile({
                    username: 'maxim',
                    name: { firstName: 'Maxim', lastName: 'Ivanov' },
                    password: 'maxpass',
    })

    Ivan.addNewUser((err, data) => {
        if (err) {
            console.error(`Error during addNewUser`);
        }
    })

    Maxim.addNewUser((err, data) => {
        if (err) {
            console.error('Error')
        }
    })

    Ivan.logIn((err, data) => {
        if (err) {
            console.error(`Error`)
        }
    });

    Maxim.logIn((err, data) => {
        if (err) {
            console.error(`Error`)
        }
    });
    
    Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
                console.error('Error during adding money to Ivan');
                console.log(err);
        } else {
                console.log(`Added 500000 euros to Ivan`);
        }
    })

    Ivan.сonvertCurrency({fromCurrency: 'EUR', targetCurrency: 'Netcoins', targetAmount: 3600}, (err,data) => {
        if (err) {
            console.log('error');
        }
    })

    Ivan.transferToken({to: 'maxim', amount: 3600}, (err, data) => {
        if (err) {
            console.log('error');
        }
    })
}

main();