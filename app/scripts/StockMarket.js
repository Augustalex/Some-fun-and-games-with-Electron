
function StockMarket(){

}

function Account(){
    this.investments = {};

    this.newInvestment = function(company, money){
        if(this.investments[company.name])
           return console.log("You already have an investment in this company.");

        this.investments[company.name] = new Investment(company);
        this.investments[company.name].buyShares(money / company.getShareValue());
    }
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

function Company(name, value){
    this.name = name;

    this.value = value;
    this.shares = 1000;
    this.freeShares = this.shares;

    this.getShareValue = function(){
        return (this.shares / this.value);
    };

    this.addShares = function(newShares){
        this.shares += newShares;
    };

    this.buyShares = function(shares){
        this.freeShares -= shares;
    };

    this.sellShares = function(shares){
        this.freeShares += shares;
    };
}