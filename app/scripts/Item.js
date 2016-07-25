function Item(name, price, amount, cost){
    this.name = name;
    this.price = price;
    this.cost = cost || 0;

    this.inStock = amount;

    this.setCost = function(cost){
        this.cost = cost;
    };

    this.restock = function(amount){
        this.inStock += amount;
    };

    this.use = function(amount){
        this.inStock -= amount;
        return this.inStock;
    };
}

module.exports = Item;