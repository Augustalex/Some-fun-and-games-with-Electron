var fs = require("fs");

var globalPath = "./electron-quick-start/app/";
function readText(){
    fs.readFile(globalPath+"text.txt", function(err, data){
        if(err)
            return console.log(err);

        console.log("Read file: " + data.toString());
    });
}

module.exports.readText = readText;
