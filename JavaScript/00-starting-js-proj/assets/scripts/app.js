// function greet(userName, messege) {
//     //console.log(userName + ", " + messege);
//     return "Hi, I am " + userName + ", " + messege;
// }

// const greeting = greet("Rabid", "Hello");
// console.log(greeting);
// console.log(greet("Ishrat", "KiRe"));
// console.log(greet("Ranu", "Hello"));
// console.log(greet("Raza", "Hello"));
// console.log(greet("Mouri", "Hello")); 

// (userName, messege) => {

// }

// number => number * number;

// const user = {
//     name: "Rabid",
//     age: 24,
//     greet() {
//         console.log("Hello, I am " + this.name);
//     }
// };

// console.log(user);

// class User {
//     construcctor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     greet() {
//         console.log("Hello, I am ");
//     }
// }
// const user1 = new User("Rabid", 24);
// console.log(user1);

const hobbies = ["Sports", "Cooking", "Reading", "Traveling"];
console.log(hobbies);
console.log(hobbies[2]);
hobbies.push("Coding");
console.log(hobbies);

const index = hobbies.findIndex((item) => {
    return item === "Reading";
});

console.log(index);

const editedhobbies = hobbies.map((item) => item + "!");
console.log(editedhobbies);