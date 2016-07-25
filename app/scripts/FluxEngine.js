var Company = require("./Company.js");

function FluxEngine(stockMarket){
    var self = this;
    this.market = stockMarket;

    //parameters
    var inflation = 1;
    var dept = 1;
    var socialInstability = 1;
    var politicalInstability = 1;

    this.scale = 1;

    this.tick = function(){
        var r_roof = 1.5;
        var r = Math.random()*r_roof;

        self.runEvents();

        var I = inflation * 0.4;
        var D = dept * 0.3;
        var S = socialInstability * 0.15;
        var P = politicalInstability * 0.15;
        var a = r * I * D * S * P * self.scale;

        for(company in self.market.companies) {
            if (company === typeof(Company))
                company.value *= a;
        }
    };

    this.runEvents = function(){
        var roof = 1.5;
        var floor = 0.5;
        inflation *= randomScale(floor, roof);
        dept *= randomScale(floor, roof);
        socialInstability *= randomScale(floor, roof);
        politicalInstability *= randomScale(floor, roof);
    };

    function randomScale(floor, roof){
        var rand = Math.random() * roof + floor;
        if(rand > roof)
            rand -= floor;

        return rand;
    }

    function getRandomBool(){
        var rand = Math.random();
        if(rand < 0.5)
            return 0;
        else
            return 1;
    }
}

module.exports = FluxEngine;