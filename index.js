
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://easy-shopper-6cba7-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const shoppingListEl = document.getElementById("shopping-list")

inputBtn.addEventListener("click", function(){
    let inputValue = inputEl.value
    console.log(inputValue)
    push(shoppingListInDB, inputValue)
    // shoppingListEl.innerHTML = inputValue
    emptyInputEl()
    
})

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        shoppingListSpace()
        let itemsArray = Object.entries(snapshot.val())
        for( let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendShoppingListItem(currentItem)
        }
    }
    else {
        shoppingListEl.innerHTML = "<h4>Welcome to Gabby's Easy Shopper, You have not added anything to the Cart yet!!!<h4>"
    }

})

function appendShoppingListItem(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function(){
        let deleteIteminDB = ref(database, `shoppingList/${itemID}`)
        remove(deleteIteminDB)
    })
    shoppingListEl.append(newEl)
}

function emptyInputEl(){
    inputEl.value = ""
}
function shoppingListSpace(){
    shoppingListEl.innerHTML = ""
}























// // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// // import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

// // const appSettings = {
// //     databaseURL: "https://easy-shopper-6cba7-default-rtdb.europe-west1.firebasedatabase.app/"
// // }

// // const app = initializeApp(appSettings)
// // const  database= getDatabase(app)
// // const shoppingListInDB = ref(database, "shoppingList")
// const db = []

// let shoppingListEl = document.getElementById("shopping-list")
// let inputBtn = document.getElementById("input-btn")
// let inputEl = document.getElementById("input-el")
// // let items = ""
// console.log(shoppingListEl)
// inputBtn.addEventListener("click", function(){
//     let items = inputEl.value
//     // push(shoppingListInDB, inputEl.value)
//     console.log("button clicked")
//     // shoppingListEl.innerHTML += items
//     // console.log(shoppingListInDB)
//     db.push(items)
//     populate(db)
// })

// function populate(arr){
//     let listItems = ""
//     for(let i = 0; i < arr.length; i++){
//         listItems += `<li>${arr[i]}</li>`
//     }
//     shoppingListEl.innerHTML = listItems
// }

// // function addItem() {
// //     items = inputEl.value
// //     shoppingListEl.innerHTML += items

// //     console.log(items)
// // }
