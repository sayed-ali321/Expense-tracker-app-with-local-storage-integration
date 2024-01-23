itemList=document.getElementById('items');

function onsignup(event) {
    event.preventDefault();
    let expense=document.getElementById('expense').value;
    let desc=document.getElementById('desc').value;
    let categ=document.getElementById('categ').value;

    //Create new list 
    let li = document.createElement('li');
    li.className='list-group-item';
    let textNode = document.createTextNode(expense+' '+desc+' '+categ);

    // add textNode to li
    li.appendChild(textNode);

    //Create delete and edit buttons
    let delBtn = document.createElement('button');
    let editBtn = document.createElement('button');

    //Add classes to the buttons
    delBtn.className = 'btn btn-danger btn-sm float-right delete';
    editBtn.className = 'btn btn-primary btn-sm float-right edit';

    //Append text node
    delBtn.appendChild(document.createTextNode('Delete'));
    editBtn.appendChild(document.createTextNode('Edit'));

    //Append buttons to li
    li.appendChild(delBtn);
    li.appendChild(editBtn);

    //append li to ul
    itemList.appendChild(li);

    //Clear form fields 
    document.getElementById('expense').value='';
    document.getElementById('desc').value='';
    document.getElementById('categ').value='';

    let userData = {
        name: expense,
        mail: desc,
        phone: categ,
    }

    localStorage.setItem(userData.mail, JSON.stringify(userData));
};

//Remove item
itemList.addEventListener('click', removeItem);

function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
            let li=e.target.parentElement;
            li.remove();
            let email = li.textContent.trim().split(' ')[1];
            localStorage.removeItem(email);
        }
    }
}

itemList.addEventListener('click', editItem);

function editItem(e) {
    if (e.target.classList.contains('edit')) {
        let li = e.target.parentElement;
        let email = li.textContent.trim().split(' ')[1];
        let storedData = JSON.parse(localStorage.getItem(email));

        //fill iinputs with the user data that needs to be edit
        document.getElementById('expense').value = storedData.name;
        document.getElementById('desc').value = storedData.mail;
        document.getElementById('categ').value = storedData.phone;

        //remove data from browser and localStorage
        li.remove();
        localStorage.removeItem(email);
    }
}