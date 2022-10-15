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

    const currentItem = {
        "name": name.value,
        "quantity": quantity.value
    }

    createElement(currentItem)

    itens.push(currentItem)

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
    newItem.appendChild(numberItem)

    newItem.innerHTML += item.name

    list.appendChild(newItem)

    
}
