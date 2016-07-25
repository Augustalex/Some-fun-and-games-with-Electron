var globalPath = "./app/scripts/";
var StockMarket = require(globalPath + "StockMarket.js");
var Player = require(globalPath + "Player.js");
var Ebay = require(globalPath + "Ebay.js");

function Game(){
    var self = this;
    this.stockMarket = new StockMarket();
    this.player = new Player();
    this.ebay = new Ebay();

    this.start = function(){
        
    };
}