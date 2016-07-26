var View = require("./View.js");

function ViewManager(id){
    if(id === "body")
        this.container = document.body;
    else{
        this.container = null;
        this.ownView = new View(id);
    }

    this.currentView = null;

    this.originalHTML = undefined;

    this.load = function(){
        if(this.ownView)
            return this.ownView.load();
    };

    this.loadView = function(view){
        this.currentView = view;
        if(!this.container)
            this.container = document.getElementById(id);

        if(!this.originalHTML === undefined)
            this.originalHTML = this.container.innerHTML;
        else
            this.originalHTML = "";

        this.container.innerHTML += this.currentView.load();
    };

    this.update = function(){
        if(this.container)
            this.container.innerHTML = this.originalHTML + this.currentView.load();
    };
}

module.exports = ViewManager;