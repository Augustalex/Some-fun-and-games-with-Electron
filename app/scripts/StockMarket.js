var FluxEngine = require("./FluxEngine.js");
var Company = require("./Company.js");
var View = require("./View.js");

function StockMarket(){
    var self = this;

    this.view = new View("StockMarket", self);

    var companies = {};
    var accounts = {};

    this.fluxEngine = new FluxEngine(this);

    this.init = function(){
        self.newCompany("August Inc", 10);
        self.newCompany("Josef Inc", 10);
        self.newCompany("Apple Inc", 100);
    };

    this.tick = function(){
        self.fluxEngine.tick();
    };

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

    this.getCompanies = function(){
        return companies;
    };

    /*  Debug Functions         */

    this.printReport = function(){
        for(name in companies){
            var company = companies[name];
            console.log("Company: " + company.name + "\tValue: " + company.value);
        }

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