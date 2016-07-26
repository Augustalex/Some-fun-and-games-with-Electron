module.exports = function(component){
    function generateListTemplate(){
        var items = component.getInventory().getItems();
        var template = "";
        for(item in items)
            template += getItemTemplate(items[item]);
        return template;
    }

    function getItemTemplate(item){
        return(
            "<div class='ebay-item'>" +
                "<h1>Item: " +
                item.name +
                "</h1>" +
                "<h2>Price: "+
                item.price +
                "</h2>" +
            (item.cost ? ("<h2>Cost: "+item.cost+"</h2>") : "") +
                "<h2>In stock: " +
                item.inStock +
                "</h2>" +
            "</div>"
        );
    }

    return(
        "<div id='ebay'>" +
            generateListTemplate() +
        "</div>"
    );
};