module.exports = function(){
    var inventory = new Inventory();

    this.init = function(){
        var newItems = [
            new Item("iPhone", 6000, 1),
            new Item("Laptop", 12000, 1),
            new Item("Apartment", 300000, 1),
            new Item("Small House", 1200000, 1),
            new Item("Large House", 8000000, 1),
            new Item("Greece", 10000000, 1)
        ];

        for(item in newItems)
            inventory.addItem(item);
    }

};

function Inventory(){
    var items = {};

    this.getItem = function(itemName){
        if(items[itemName])
            return items[itemName];
        else
            return null;
    };

    this.addItem = function(item){
        if(items[name])
            return console.log("Item already exists.");
        else
            items[name] = item;
    };

    this.addNewItem = function(name, price, amount){
        if(items[name])
            items[name].restock(amount);
        else
            items[name] = new Item(name, price, amount);
    };

    this.restockItem = function(name, amount){
        if(!items[name])
            return console.log("Item is not registered.");

        items[name].restock(amount);
    };

    this.useItem = function(name, amount){
        if(items[name])
            items[name].use(amount);
        else
            return 0;

    }


}

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