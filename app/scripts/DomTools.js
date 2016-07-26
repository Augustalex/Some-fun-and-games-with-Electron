function id(id){
    return document.getElementById(id);
}

function className(className){
    return document.getElementsByClassName(className);
}

module.exports = {
    id: id,
    className: className
};