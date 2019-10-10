class User {

    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;

    }

    getName () {
        return this.name;
    }

    getAge () {
        return this.age;
    }

    getGender () {
        return this.gender;
    }

    setName (newName) {
        if (newName.length > 2) {
            this.name = newName;
        } else {
            alert("Sorry, name is incorrect!!!");
        }
    }

    getObj () {
        return {
            name: this.getName(),
            age: this.getAge(),
            gender: this.getGender()
        };
    }

    setAge(age) {
        this.age = age;
    }

    setGender (newGender) {
        if (newGender.charAt(0).toUpperCase() == 'M' || newGender.charAt(0).toUpperCase() == 'F') {
            this.gender = newGender;
        } else {
            alert("It's incorrect gender.");
        }
    }

    displayInfo() {
       console.log("I'm user");
    }

}

class Working extends User {

    constructor(name, age, gender, experience, salary) {
        super(name, age, gender)
        this.experience = experience;
        this.salary = salary;
    }

    getSalary () {
        return this.salary;
    }


    getExperience () {
        return this.experience;
    }

    getObj () {
        return {
            name: this.getName(),
            age: this.getAge(),
            gender: this.getGender(),
            experience: this.getExperience(),
            salary: this.getSalary()
        };
    }

    setSalary (newSalary) {
        if (newSalary > 100) {
            this.salary = newSalary;
        }
        else {
            alert("Give me money, mudak!!!")
        }
    }

    setAge(newAge) {
        if (newAge > 18 && newAge < 65) {
            this.age = newAge;
        } else {
            alert("You can't work");
        }
    }

    setExperience (newExperience) {
        if (newExperience > 0) {
            this.experience = newExperience;
        } else {
            alert("Experience is incorrect!!!");
        }      
    }

    displayInfo() {
        console.log("I'm Worker");
    }
}
module.exports = Working;
