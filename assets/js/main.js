let todoItems = document.getElementsByClassName("todo-item")

console.log(todoItems)

for (const item of todoItems) {
    item.addEventListener('click', checkItem);
}

const submit = document.getElementById('submit');

submit.addEventListener('click', addItem)

function addItem (e) {
    e.preventDefault()

    let input = document.getElementById('newtask')
    const data = {
        'id': 0,
        'task': input.value,
        'check': false,
        'archived': false
    }
    

    const req = new XMLHttpRequest();

    req.open('POST', 'form.php', true);

    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    req.send('data='+JSON.stringify(data));

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            let doList = document.getElementById('dolist').getElementsByTagName('ul')[0]

            let response = JSON.parse(req.responseText);
            let newItem = document.createElement('li')
            newItem.className = 'todo-item  element-unchecked'
            newItem.dataset.id = response.id
            newItem.innerHTML = response.task

            doList.appendChild(newItem)

            input.value = ''
        }
    }
}

function checkItem (e) {
    let classList = e
        e.target.classList.toggle('element-checked')
        e.target.classList.toggle('element-unchecked')

    console.log(e.target.classList.contains('element-checked'))
}