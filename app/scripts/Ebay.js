var Item = require("./Item.js");

module.exports = function(){
    var inventory = new Inventory();

    this.init = function(){
        var newItems = [
            new Item("iPhone", 6000, 1),
            new Item("Laptop", 12000, 1),
            new Item("Apartment", 300000, 1, 4000),
            new Item("Small House", 1200000, 1, 10000),
            new Item("Large House", 8000000, 1, 25000),
            new Item("Greece", 10000000, 1, 10000000)
        ];

        for(item in newItems)
            inventory.addItem(item);
    };

    this.getPrice = function(itemName){
        return inventory.getItem(itemName).price;
    };

    this.buy = function(itemName, amount, payFunction){
        var item = inventory.getItem(name);
        if(!item)
            return console.log("Item does not exist.");

        if(payFunction(item.price))
            item.use(amount);
        else
            return console.log("Insufficient funds.");
    };

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
        if(items[item.name])
            return console.log("Item already exists.");
        else
            items[item.name] = item;
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