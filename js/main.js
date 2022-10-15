const form = document.getElementById("newItem")
const list = document.getElementById("list")
const itens = []

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


function createElement(item) {
    const newItem = document.createElement('li')
    newItem.classList.add("item")

    const numberItem = document.createElement('strong')
    numberItem.innerHTML = item.quantity
    newItem.appendChild(numberItem)

    newItem.innerHTML += item.name

    list.appendChild(newItem)

    
}