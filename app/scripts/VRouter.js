var ViewManager = require("./ViewManager.js");
var View = require("./View.js");

var componentViews = {};

function init(){
    document.querySelector("body").addEventListener("click", routing);
}

function setup(newComponentViews){
    componentViews = newComponentViews;
}

function Router(id){
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

function route(component, view, router){
    if(!component.init)
        return console.log("Component does not comply with route(component, view, routerObj) interface.");

    component.init();
    router.loadView(view);

    console.log("\nLoaded:");
    console.log(component);
    console.log(view);
    console.log("\n\n");
}

function routing(event){
    var target = event.target.id;

    if(target.substr(0, 5) != "route")
        return;

    var path = target.substr(5);
    var currentObj = componentViews[path];

    if(!currentObj)
        return console.log("Does not exist: " + path);
    else
        route(currentObj.component, currentObj.view, router);

}

function newComponentView(component, view){
    if(!view)
        return{
            view:   component.view,
            component:  component
        };
    else if(typeof view === "string")
        return{
            view: component.view.getSubView(view),
            component: component
        }
    else if(component && view)
        return{
            view:   view,
            component: component
        };
    else
        return console.log("Error, incorrect arguments to ComponentView(component, view).");
}

module.exports.init = init;
module.exports.setup = setup;
module.exports.Router = Router;
module.exports.route = route;
module.exports.newComponentView = newComponentView;