var Working = function (name, age, gender, experience){
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.experience = experience;

    this.getName = function (){
        return this.name;
    }

    this.getAge = function(){
        return this.age;
    }

    this.getGender = function(){
        return this.gender;
    }

    this.getExperience = function(){
        return this.experience;
    }

    this.setName = function(newName){
        if(newName.length > 2){
            this.name = newName;
        } else{
            alert("Sorry, name is incorrect!!!");
        }
    }


}

Working.prototype.setAge = function(newAge){
    if(newAge > 18 && newAge < 65){
        this.age = newAge;
    } else{
        alert("You can't work");
    }
}

Working.prototype.setGender = function(newGender){
    if(newGender.charAt(0).toUpperCase() == 'M' || newGender.charAt(0).toUpperCase() == 'F' ){
        this.gender = newGender;
    } else{
        alert("It's incorrect gender.");
    }
}

Working.prototype.setExperience = function(newExperience){
    if(newExperience > 0 ){
        this.experience = newExperience;
    } else{
        alert("Experience is incorrect!!!");
    }
}


var FactoryWorker = function(name, age, salary){
    Working.apply(this, arguments);
    this.salary = salary;

    this.getSalary = function(){
        return this.salary;
    }
    
    this.getObj = function() {
        return { 
                    name: this.getName(),
                    age: this.getAge(),
                    gender: this.getGender(),
                    experience: this.getExperience(),
                    salary: this.getSalary() 
               };
    }
    
    

    this.setSalary = function(newSalary){
        if(newSalary > 100){
            this.salary = newSalary;
        }
        else {
            alert("Give me money, mudak!!!")
        }
    }
}

FactoryWorker.prototype.setAge = function(newAge){
    if(newAge > 16 && newAge < 75){
        this.age = newAge;
    } else{
        alert("You can't work in our Factory");
    }
}

var EnterpriseWorker = function(name, age, company){
    Working.apply(this, arguments);
    this.company = company;

    this.getCompany = function(){
        return this.company;
    }

    this.getObj = function () {
        return { 
                    name: this.getName(),
                    age: this.getAge(),
                    gender: this.getGender(),
                    experience: this.getExperience(),
                    company: this.getCompany() 
               };
    }

    this.setCompany = function(newCompany){
        this.company = newCompany;
    }
}


FactoryWorker.prototype = Object.create(Working.prototype);
EnterpriseWorker.prototype = Object.create(Working.prototype);
FactoryWorker.prototype.constructor = FactoryWorker;
EnterpriseWorker.prototype.constructor = EnterpriseWorker;
