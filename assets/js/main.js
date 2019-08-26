let todoItems = document.getElementsByClassName("todo-item")

console.log(todoItems)

for (const item of todoItems) {
    item.addEventListener('click', checkItem);
}

const submit = document.getElementById('submit');

submit.addEventListener('click', e => {
    e.preventDefault()

    const req = new XMLHttpRequest();

    req.open('get', 'assets/todo.json', true);

    req.send();

    req.onreadystatechange = () => {
        if(req.readyState === XMLHttpRequest.DONE){
            if(req.status == 200){
                let data = req.response;    // On stocke les données récupérés dans une variable
                data = JSON.parse(data);     // On convertis son texte brut en véritable données JSON
                console.log({data})
            }
        } else {
            console.error(`Erreur ${req.status}`)
        }
        
    }     
})

function checkItem (e) {
    let classList = e
        e.target.classList.toggle('element-checked')
        e.target.classList.toggle('element-unchecked')

    console.log(e.target.classList.contains('element-checked'))
}