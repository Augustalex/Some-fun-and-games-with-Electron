var globalPath = "./";

var StockMarket = require(globalPath + "StockMarket.js");
var Player = require(globalPath + "Player.js");
var Ebay = require(globalPath + "Ebay.js");

var VRouter = require(globalPath + "VRouter.js");

function Game(){
    var self = this;

    /*      View Routers        */
    var body = new VRouter.Router("body");
    var wrapper = new VRouter.Router("wrapper");
    var router = new VRouter.Router("router");

    /*      Game Objects        */
    this.stockMarket = new StockMarket();
    this.player = new Player();
    this.ebay = new Ebay();

    /*      Game Loop Settings and variables      */
    var timeLoop = null;
    var timeDelay = 50;
    var timeFunction = loop;

    function loop(){
        self.stockMarket.tick();
        router.update();
    }

    /*      Game init (setup) and start (starts loop)       */
    this.start = function(){
        timeFunction();
        timeLoop = setInterval(timeFunction, timeDelay);

    };

    this.init = function(){

        /*      VIEW        */
        var newComponentView = VRouter.newComponentView;
        VRouter.setup({
            Ebay:               newComponentView(self.ebay),
            Stockmarket:        newComponentView(self.stockMarket),
            Player:             newComponentView(self.player),
            PlayerStats:        newComponentView(self.player, "PlayerStats"),
            PlayerAccount:      newComponentView(self.player, "PlayerAccount"),
            PlayerInventory:    newComponentView(self.player, "PlayerInventory")
        });

        body.loadView(wrapper);
        wrapper.loadView(router);
        VRouter.route(self.stockMarket, self.stockMarket.view, router);

        /*       Routing           */
        VRouter.init();

    };
}

module.exports = Game;

