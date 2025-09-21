class Human {
    spacies = "Human";
}

class Person extends Human {
    name = "Rabid";
    printName = () => {
        console.log(this.name);
    }
}

const person = new Person();
person.printName();
console.log(person.spacies);
console.log(person);