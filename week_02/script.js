/* 
    this is document contains
    basic JS commands 
*/

// variables can be declared as const or let
const num = 100; //integer
let num1 = "100"; //string
let num2 = 200;

// named function
function myFunc() {
    console.log(num); //equivalant to print in python
};

// to run a function you must call it
myFunc();

// this will display in the browser dev tools (i.e. console)
console.log(num2);

let anonFun = function() {
    console.log("hello");
};

// immediately invoked function
(function bar() { 
    console.log("Hello named function");
})();

// immediately invoked anonymous arrow function
(() => console.log(100))();

// arrow function
let foo = () => console.log(num);

// removing the keyword let will allow you to change a variable
foo = () => console.log(num2);
foo();

let bar = 100;
bar = 200;

// declare an array
let arr = ["foo", 123, ["zar", "car"]];

// Set item in array
arr[1] = "barbar";

// Add item to the end of the array
arr.push("par");

// Removing an item from the array (index, deleteCount)
arr.splice(1, 1);

console.log(arr);

let newArr = ["cow", "turtle", "goat"];

// looping through arrays
for (let item of newArr) {
    console.log(item);
}

for (let i in newArr) {
    console.log(i + " " + newArr[i]);
}

newArr.forEach((item, i) => console.log(i + " " + item));


//Objects

let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter"
};

// Access property
console.log(obj1.name);
console.log(obj1["name"]);

// Set value
obj1.job = "Barista";

// Loop through all properties
for (let key in obj1) {
    let value = obj1[key];
    console.log(`This pair is ${key}: ${value}`);
}

// this is to display string literal syntax. They are equivalent.
// let str = "Hello " + key + " more text here " + foo;
// let str = `Hello ${key} more text here ${foo}`;

// Regular for loop
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// conditionals
let val = 80;

if (val >= 80) {
    console.log("good")
} else if (val > 50) {
    console.log("okay")
} else {
    console.log("terrible")
}

// ternary is a shortened conditional
let y = (val >= 80) ? console.log("good") : console.log("not good");

// traversing the DOM
let newVar = document.getElementById("example");

newVar.innerHTML += `<h1>Hello world!</h1><p>new paragraph ${num}</p>`;