var FluxEngine = require("./FluxEngine.js");
var Company = require("./Company.js");

function StockMarket(){
    var companies = {};
    var accounts = {};

    this.fluxEngine = new FluxEngine(this);

    this.newAccount = function(owner){
        if(accounts[owner])
            return console.log("Owner already has an account.");

        accounts[owner] = new Account(owner);
    };

    this.newCompany = function(name, value){
        if(companies[name])
            return console.log("Company already exists.");

        companies[name] = new Company(name, value);
    };

    this.tick = self.fluxEngine.tick();

    this.stickProv = function(companyName){
        console.log(companyName + ": " + companies[companyName].value);
    };
}

function Account(owner){
    this.owner = owner;

    this.investments = {};

    this.newInvestment = function(company, money, payFunction){
        if(this.investments[company.name])
           return console.log("You already have an investment in this company.");

        if(!payFunction(money))
            return console.log("Insufficient funds.");

        this.investments[company.name] = new Investment(company);
        this.investments[company.name].buyShares(money / company.getShareValue());
    };
}

function Investment(company){
    this.company = company;
    this.shares = 0;

    this.getValue = function(){
        return (this.company.getShareValue() * this.shares);
    };

    this.buyShares = function(shares){
        this.shares += shares;
        this.company.buyShares(shares);
    };

    this.sellShares = function(shares){
        this.shares -= shares;
        this.company.sellShares(shares);
    };
}

module.exports = StockMarket;