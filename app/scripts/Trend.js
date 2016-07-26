function Trend(){
    var self = this;

    this.status = 0;
    this.limit = 20;

    this.history = new History(1000);

    this.decrease = function(){
        this.status -= 1;
    };

    this.increase = function(){
        this.status += 1;
    };

    this.getPercentage = function(){
        return (this.status/100);
    };

    this.addRatio = function(ratio){
        if(ratio < 1 && self.status >=(-1)*self.limit)
            self.decrease();
        else if(ratio > 1 && self.status <= self.limit)
            self.increase();

        self.history.add(ratio);
    };
}

function History(limit){
    var self = this;

    this.limit = limit/2;
    this.data = [];
    this.old = [];

    this.add = function(data){
        if(self.data.length <= self.limit)
            self.data.push(data);
        else{
            self.old = self.data;
            self.data = [];
        }
    };
}

module.exports = Trend;