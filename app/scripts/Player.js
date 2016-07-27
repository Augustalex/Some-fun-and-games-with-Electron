var Item = require("./Item.js");
var View = require("./View.js");

function Player(name, age){
	var self = this;

	this.view = new View("Player", this);
	this.view.addSubView("PlayerStats");
	this.view.addSubView("PlayerAccount");
	this.view.addSubView("PlayerInventory");

	var startBalance = 100;

	this.name = name;
	this.age = age;
	this.balance = startBalance;

    this.init = function(){

    };

	this.pay = function(price){
		if(price > self.balance){
			return null;
		}
		else{
			self.balance -= price;
			return true;
		}
	};

	this.inventory = function(){
		var items = {};

		this.addItem = function(item){
			if(items[item.name])
				return console.log("Item already exists.");

			items[item.name] = item;
		};

		this.restock = function(name, amount){
			if(!items[name]) {
				console.log("Can't restock nonexisting item: " + name);
			}

			else{
				items[name].restock(amount);
			}
		};

		this.useItem = function(name, amount){
			if(!items[name]) 
				console.log("No such Item in inventory: " + name);
			else
				items[name].use(amount);
		};

		this.calculateOutcome = function(){
			var outcome = 0;

			for(var i = 0; i < items.length(); i ++)
				outcome += items[i].cost

			return outcome;
		};

	};

}

module.exports = Player;