var globalPath = "./";

var dom = require(globalPath + "DomTools.js");
var StockMarket = require(globalPath + "StockMarket.js");
var Player = require(globalPath + "Player.js");
var Ebay = require(globalPath + "Ebay.js");

var ViewManager = require(globalPath + "ViewManager.js");

function Game(){
    var self = this;

    var body = new ViewManager("body");
    var wrapper = new ViewManager("wrapper");
    var router = new ViewManager("router");

    this.stockMarket = new StockMarket();
    this.player = new Player();
    this.ebay = new Ebay();

    var timeLoop = null;
    var timeDelay = 50;
    var timeFunction = loop;

    function loop(){
        self.stockMarket.tick();
        router.update();
    };

    this.start = function(){
        timeFunction();
        timeLoop = setInterval(timeFunction, timeDelay);

    };

    this.init = function(){

        /*      VIEW        */
        body.loadView(wrapper);
        wrapper.loadView(router);
        route(self.stockMarket, router);

        /*       Routing            */
        document.querySelector("body").addEventListener("click", routing);

        function route(obj, routerObj){
            obj.init();
            routerObj.loadView(obj.view);
        }

        function routing(e){
            var target = e.target.id;

            var viewScope = new ViewScope();
            var viewComponents = {
                Ebay: {
                    component: self.ebay
                },
                Stockmarket:{
                    component: self.stockMarket
                },
                Player:{
                    component: self.player
                },

            }
            var scope = null;
            if(target.substr(0, 5) === "route")
                scope = getScope(target);
            else
                return;

            if(scope.name === "route")
                scope = scope.getChild();
            else
                return;

            if(scope.name === "Ebay")
                route(self.ebay, router);
            else if(scope.name === "Stockmarket")
                route(self.stockMarket, router);
            else if(scope.name === "Player")
                if(scope = scope.getChild()) {
                    if (scope.name === "Stats")
                        route(self.player.subViews[scope.name], router);
                    else if(scope.name === "Account")
                        route(self.player.subViews[scope.name], router);
                    else if(scope.name === "Inventory")
                        route(self.player.subViews[scope.name], router);
                }
                else
                    route(self.player, router);
        }

        function ViewScope(){
            this.viewComponents = [];

            this.add = function(routeName, obj){
                this.viewComponents.push({
                    name: routeName,
                    component: obj
                });
            };

            this.getComponent = function(name){
                for(o in this.viewComponents)
                    if(o.name === name)
                        return o.component;
            };
        }

        function getScope(routeString){
            var scope = null;

            var startPos = 0;
            var nextPos = nextUpperCaseIndex(routeString);
            scope = new ScopeObject(routeString.substr(startPos, nextPos), null);

            while(nextPos < routeString.length){
                startPos = nextPos;
                nextPos = nextUpperCaseIndex(routeString.substr(startPos));

                if(nextPos === routeString.length)
                    break;
                else
                    scope.append(new ScopeObject(routeString.substr(startPos, nextPos-startPos), null));
            }

            function nextUpperCaseIndex(string){
                var i = 0;
                while(i < string.length && !isUpperCase(string.charAt(i)))
                    i++;

                if(i+1 === string.length)
                    return (i+1)
                else
                    return i;
            }

            return scope;
        }

        function ScopeObject(name, child){
            this.name = name;
            var child = child;

            this.getChild = function(){
                return child;
            };

            this.append = function(newChild){
                var depth = this;
                while(depth.getChild())
                    depth = depth.getChild();
            };
        }

        function isUpperCase(string){
            if(string == string.toUpperCase())
                return true;
            else
                return false;
        }
    };
}

module.exports = Game;