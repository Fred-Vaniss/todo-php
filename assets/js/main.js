let todoItems = document.getElementsByClassName("todo-item")

console.log(todoItems)

for (const item of todoItems) {
    item.addEventListener('click', checkItem);
}

const submit = document.getElementById('submit');

submit.addEventListener('click', e => {
    e.preventDefault()

    const input = document.getElementById('newtask').value
    const data = {
        'task': input,
        'check': false,
        'archived': false
    }
    

    const req = new XMLHttpRequest();

    req.open('POST', 'form.php', true);

    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    req.send('data='+JSON.stringify(data));

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            document.getElementById('response').innerHTML = req.responseText;
        }
    }
})

function checkItem (e) {
    let classList = e
        e.target.classList.toggle('element-checked')
        e.target.classList.toggle('element-unchecked')

    console.log(e.target.classList.contains('element-checked'))
}