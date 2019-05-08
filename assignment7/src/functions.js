let quickAddFormDiv = document.getElementsByClassName('quickaddForm')[0];
let addBookDiv = document.getElementsByClassName('addbook')[0];

export let addToBook = () => {
    const reg= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isEmail = reg.test(email.value);
    let isNull = fullname.value != '' && phone.value != '' && address.value != '' && city.value != '' && email.value != '';
    if (isNull) {
        
        if(isEmail){
        let url = 'http://localhost:3000/people';
        let data = {
            name: fullname.value,
            phone: phone.value,
            address: address.value,
            city: city.value,
            email: email.value
        };
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));

        quickAddFormDiv.style.display = "none";
        clearForm();
        } else {
            alert("Please input right email!");
        }
    }
}

export let removeEntry = (e) => {
    // Remove an entry from the addressbook
    if (e.target.classList.contains('delbutton')) {
        let remID = e.target.getAttribute('data-id');
        addressBook.splice(remID, 1);
        localStorage['addbook'] = JSON.stringify(addressBook);
    }
    console.log("delete successfully");
}

export let  showDetail = (e) =>{
    if (e.target.classList.contains('detailbutton')) {
        let i = e.target.getAttribute('data-id');
        fetch('http://localhost:3000/people')
            .then((res) => res.text())
            .then(data => {
                let id = eval(data);
                let realId = id[i]._id;
                findPeople(realId, i);
            })
            .catch(err => console.log(err));
    }
}

export let findPeople = (Id, i) => {
    fetch('http://localhost:3000/people/' + Id)
        .then(res => res.json())
        .then(data => {
         
            let output = ' ';
            let output2 = ' ';
            addBookDiv.innerHTML = ' ';
            output += ` <div class="entry">
            <div class="name"><p>${data.name}</p></div>
            <div class="email"><p></p></div>
            <div class="phone"><p></p></div>
            <div class="address"><p></p></div>
            <div class="city"><p></p></div>
            <div class="del"><a href="#" class="delbutton" data-id="${i}">Delete</a></div>
            <div class="detail"><a href="#" class="detailbutton" data-id="${i}">Detail</a></div>
        </div>`;
            addBookDiv.innerHTML = output;
            document.getElementById('view').style.display = 'block'
            output2 += `
        <ul>
        <li>name: ${data.name}</li>
        <li>email: ${data.email}</li>
        <li>phone: ${data.phone}</li>
        <li>address: ${data.address}</li>
        <li>city: ${data.city}</li>
        </ul>
        `
            document.getElementById('view').innerHTML = output2;
        })
        .catch(err => console.log(err))
}


export let clearForm = () => {
    let formFields = document.getElementsByClassName('formFields')[0];
    for (let i in formFields) {
        formFields[i].value = ' ';
    }
}


export let showPartofAddressBook  = () => {
    fetch('http://localhost:3000/people')
        .then((res) => res.json())
        .then(data => {
            addBookDiv.innerHTML = ' ';
            let output =' ';
            let count = -1;
            data.forEach((contacts) => {
                output += ` <div class="entry">
            <div class="name"><p>${contacts.name}</p></div>
            <div class="email"><p></p></div>
            <div class="phone"><p></p></div>
            <div class="address"><p></p></div>
            <div class="city"><p></p></div>
            <div class="del"><a href="#" class="delbutton" data-id="${count++}">Delete</a></div>
            <div class="detail"><a href="#" class="detailbutton" data-id="${count}">Detail</a></div>
        </div>`;
            });
            addBookDiv.innerHTML = output;
        })
        .catch(err => console.log(err));
        document.getElementById('view').style.display = 'none'
        addBookDiv.style.display = 'block';
        quickAddFormDiv.style.display = "none";
}