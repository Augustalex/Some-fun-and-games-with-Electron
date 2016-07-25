var globalPath = "./";
var StockMarket = require(globalPath + "StockMarket.js");
var Player = require(globalPath + "Player.js");
var Ebay = require(globalPath + "Ebay.js");

function Game(){
    var self = this;
    this.stockMarket = new StockMarket();
    this.player = new Player();
    this.ebay = new Ebay();

    var timeLoop = null;
    var timeDelay = 5000;
    var timeFunction = self.stockMarket.tick();

    var testCompany = null;

    this.start = function(){
        timeLoop = setInterval(timeFunction, timeDelay);
        stockMarket.stickProv(testCompany);
    };

    this.init = function(){
        stockMarket.newCompany("August Inc", 1000);
        testCompany = stockMarket.companies["August Inc"];
    };
}

module.exports = Game;