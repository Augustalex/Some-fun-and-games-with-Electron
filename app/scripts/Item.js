function Item(name, price, amount){
    this.name = name;
    this.price = price;
    this.inStock = amount;

    this.restock = function(amount){
        this.inStock += amount;
    };

    this.use = function(amount){
        this.inStock -= amount;
        return this.inStock;
    };
}

module.exports = Item;