var person = {
    type : "Human",
    getType : function(){
        return this.type;
    },
    getName : function(){
        return this.name;
    }
};

var joon = Object.create(person);
joon.name = "BS";

console.log(joon.getType());
console.log(joon.getName());