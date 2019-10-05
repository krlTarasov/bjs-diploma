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
        return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}), (err, data) => {
            console.log(`Converting ${currency} to ${targetAmount} ${targetCurrency}`)
            callback(err, data);
        }
    }

    transferToken({to, amount} ,callback) {
        return ApiConniector.transferMoney({to, amount}, (err, data) => {
            console.log(`Transfering ${amount} to ${to}`)
            callback(err, data);
        })
    }
}
let stocks;
function getStocks() {
    stocks = ApiConnector.getStocks();
}

function main(){
    const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
                });
    Ivan.addNewUser((err, data) => {
        if (err) {
            console.error(`Error`)
        }
    })

    Ivan.logIn((err, data) => {
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

    
}

main();