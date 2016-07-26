var Company = require("./Company.js");
var Trend = require("./Trend.js");

function FluxEngine(stockMarket){
    var self = this;
    this.market = stockMarket;

    //parameters
    var inflation = 1;
    var dept = 1;
    var socialInstability = 1;
    var politicalInstability = 1;

    this.scale = 2;

    this.globalTrend = new Trend();

    this.tick = function(){

        var I = inflation * 0.4;
        var D = dept * 0.3;
        var S = socialInstability * 0.15;
        var P = politicalInstability * 0.15;

        function getMagicRatio(trendParam){
            var floor = 0.95;
            var roof = 1.05;
            var diff = roof-floor;

            if(trendParam)
                if(trendParam < 0)
                    floor += diff * ((-1)*trendParam);
                else if(trendParam > 0)
                    roof -= diff * trendParam;

            var r = randomScale(0.95, 1.05);
            var a = r * (I + D + S + P);
            a += (1 - a) * self.scale;

            return a;
        }

        for(name in self.market.getCompanies()) {
            var company = (self.market.getCompanies())[name];

            var ratio = getMagicRatio(company.stockTrend.getPercentage());
            company.value *= ratio;
            company.stockTrend.addRatio(ratio);

            self.globalTrend.addRatio(ratio);
        }

    };

    function randomScale(floor, roof){
        r = (Math.random() * (roof-floor))+floor;
        return r;
    }

    /* DEBUG FUNCTIONS          */
    this.printProperties = function(){
        console.log("\tPROPERTIES:");
        console.log(inflation);
        console.log(dept);
        console.log(socialInstability);
        console.log(politicalInstability);
        console.log("\n\n");
    };
}

module.exports = FluxEngine;