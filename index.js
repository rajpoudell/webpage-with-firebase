import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref ,push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
databaseURL :"https://real-time-database-14c50-default-rtdb.asia-southeast1.firebasedatabase.app/"

}
const app = initializeApp(appSettings)
const database = getDatabase(app);
const shoppingListInDB = ref(database , "shoppingList") //(location , what the ref called(name) )


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const parentEl = document.getElementById("shopping-list") //parent child

addButtonEl.addEventListener("click",function () {
    let inputValue = inputFieldEl.value

    
    push(shoppingListInDB,inputValue ) //ref first argu and value 2nd argu

    clearInputFieldEl();
    appendItemto(inputValue) ;

    console.log(`${inputValue} added to database`);
})

function clearInputFieldEl(){
       inputFieldEl.value="";
}
function appendItemto(itemvalue) {
    parentEl.innerHTML += `<li>${itemvalue}</li>`
}