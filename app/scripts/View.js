function View(name, component){
    var template = require("./templates/"+name+".view.js");
    this.subViews = {};

    if(!template)
        return null;

    this.addSubView = function(name){
        if(this.subViews[name])
            return console.log("Sub view already exists.");
        this.subViews[name] = new View(name, component);
    };

    this.getSubView = function(name){
        if(!this.subViews[name])
            return console.log("Sub view does not exist.");
        else
            return this.subViews[name];
    };

    this.load = function(){
        return (template(component));
    };
}

module.exports = View;

/*
    Lägg till ett vyobjekt som varje
    spelobjekt har som komponent.

    Genom denna kan varje spelobjekt sedan renderas
    och man vet för säkert att de har rätt gränsnitt.
 */