const form = document.getElementById("newItem")
const list = document.getElementById("list")
// Logic operator that returns saved data, or empty string, using localStorage.getItem, modifying the value of `string` with JSON.parse()
const itens = JSON.parse(localStorage.getItem("itens")) || []

// Use of forEach so that all items already written to the list are kept when you refresh the page 
itens.forEach( (element) => {
    createElement(element)
})

// Refactoring addEventListener to receive the extra functions of the createElement function
form.addEventListener("submit", (event) => {
    event.preventDefault()

    const name = event.target.elements['name']
    const quantity = event.target.elements['quantity']

    const exists = itens.find(element => element.name === name.value)

    const currentItem = {
        "name": name.value,
        "quantity": quantity.value
    }

    if(exists) {
        currentItem.id = exists.id
        
        updateElement(currentItem)
        itens[exists.id] = currentItem
    } else {
        currentItem.id = itens(itens.length - 1) ? (itens[itens.length - 1]).id + 1 : 0;

        createElement(currentItem)

        itens.push(currentItem)
    }

    localStorage.setItem("item", JSON.stringify(itens))

    name.value = ""
    quantity.value = ""

})

// Refactoring the `createElement` function so that it only has the function that makes sense to the name.
function createElement(item) {
    const newItem = document.createElement('li')
    newItem.classList.add("item")

    const numberItem = document.createElement('strong')
    numberItem.innerHTML = item.quantity
    numberItem.dataset.id = item.id
    newItem.appendChild(numberItem)

    newItem.innerHTML += item.name

    newItem.appendChild(deleteButton(item.id))

    list.appendChild(newItem)



}

function updateElement(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantity
}

// removing itens
function deleteButton (id) {
    const elementButton = document.createElement("button")
    elementButton.innerText = "X"

    elementButton.addEventListener("click", function () {
        deleteElement(this.parentNode, id)
    })

    return elementButton
}

function deleteElement(tag, id) {
    tag.remove()

    //removing item from the localStorage
    itens.splice(itens.findIndex(element => element.id === id), 1)

    localStorage.setItem("item", JSON.stringify(itens))
}
