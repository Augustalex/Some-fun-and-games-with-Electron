function View(name, component){
    var template = require("./templates/"+name+".view.js");

    if(!template)
        return null;

    this.load = function(){
        return (template(component));
    };
}

module.exports = View;