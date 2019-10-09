const URL = 'http://localhost:2403/working/';

(function () {
    function toJSONString(form) {
        var elements = form.querySelectorAll("input, select, textarea");
        var obj;
        if (elements[0].value.charAt(0) == "F") {
            obj = new FactoryWorker();

        } else if (elements[0].value.charAt(0) == "E") {
            obj = new EnterpriseWorker();

        } else {
            throw new Error("ERROR!!");
        }

        for (var i = 1; i < elements.length; i++) {
            var element = elements[i];
            switch (element.name) {
                case 'cname':
                    obj.setName(element.value);
                    break;
                case 'cage':
                    obj.setAge(element.value);
                    break;
                case 'csex':
                    obj.setGender(element.value);
                    break;
                case 'cexperience':
                    obj.setExperience(element.value);
                    break;
                case 'cSalary':
                    if (elements[0].value.charAt(0) == "F")
                        obj.setSalary(element.value);
                    break;
                case 'cCompany':
                    if (elements[0].value.charAt(0) == "E")
                        obj.setCompany(element.value);
                    break;
            }
        }
        return JSON.stringify(obj.getObj() );
    }

    document.addEventListener("DOMContentLoaded", function () {
        var element = document.getElementById("lCompany");
        var lab = document.getElementById("cCompany");
        element.style.display = 'none';
        lab.style.display = 'none';

        var form = document.getElementById("createForm");
        var output = document.getElementById("output");
        var addButton = document.getElementById("add");
        var updButton = document.getElementById("upd");
        var delButton = document.getElementById("del");

        addButton.addEventListener('click', function (e) {
            e.preventDefault();
            var jsonData = toJSONString(form);
            console.log(jsonData);
            xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    alert(this.responseText);
                    form.dispatchEvent(new Event('submit'));
                    readData();
                }
            });

            xhr.open("POST", URL);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(jsonData);

        });

        updButton.addEventListener('click', function (e) {
            e.preventDefault();
            var jsonData = toJSONString(form);
            console.log(jsonData);
            xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                    readData();
                }
            });
            xhr.open("PUT", URL + document.getElementById("id").value);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(jsonData);
        });

        delButton.addEventListener('click', function (e) {
            e.preventDefault();
            xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                    readData();
                }
            });
            xhr.open("DELETE", URL + document.getElementById("id").value);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
        });

        readData();
    });

})();

function readData() {
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            result = JSON.parse(this.response);
            var resultTBody = document.createElement('tbody');
            result.map(function (nthCPU) {
                resultTBody.appendChild(parseCPUToTableRow(nthCPU));
            });

            var table = document.getElementById('rTBody').parentElement;
            table.replaceChild(resultTBody, document.getElementById('rTBody'));
            resultTBody.id = 'rTBody';
            console.log('success');
        }
    });

    xhr.open("GET", URL);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function myFunction() {
    var data = document.getElementById("ctype").value;
    hideElement(data);
}

function parseCPUToTableRow(CPUs) {
    var row = document.createElement('tr');
    var id = document.createElement('th');

    id.innerText = CPUs['id'];
    row.appendChild(id);

    var name = document.createElement('td');
    name.innerText = CPUs['name'];
    row.appendChild(name);

    var age = document.createElement('td');
    age.innerText = CPUs['age'];
    row.appendChild(age);

    var gender = document.createElement('td');
    gender.innerText = CPUs['gender'];
    row.appendChild(gender);

    var experience = document.createElement('td');
    experience.innerText = CPUs['experience'];
    row.appendChild(experience);

    var salary = document.createElement('td');
    var company = document.createElement('td');
    if (CPUs.hasOwnProperty("salary")) {
        salary.innerText = CPUs['salary'];
        row.appendChild(salary);
        company.innerHTML = '-';
        row.appendChild(company);
    } else {
        salary.innerHTML = '-';
        row.appendChild(salary);
        company.innerText = CPUs['company'];
        row.appendChild(company);
    }

    return row;
}

function hideElement(type) {
    var element = document.getElementById("lCompany");
    var lab = document.getElementById("cCompany");
    var element1 = document.getElementById("lSalary");
    var lab1 = document.getElementById("cSalary");
    if (type.charAt(0) === "E") {
        element.style.display = 'inline';
        lab.style.display = 'inline';
        element1.style.display = 'none';
        lab1.style.display = 'none';
    } else {
        element1.style.display = 'inline';
        lab1.style.display = 'inline';
        element.style.display = 'none';
        lab.style.display = 'none';
    }

}