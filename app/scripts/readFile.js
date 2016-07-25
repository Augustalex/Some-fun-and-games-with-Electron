var fs = require("fs");

function logFile(filePath){
    fs.readFile(filePath, function(err, data){
        if(err)
            return console.log(err);

        console.log("Read file: " + data.toString());
    });
}

module.exports = logFile;
