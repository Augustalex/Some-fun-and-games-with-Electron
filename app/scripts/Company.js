function Company(name, value){
    this.name = name;

    this.value = value;
    this.shares = value;
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

module.exports = Company;