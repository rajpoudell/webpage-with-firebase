const appSettings = {
    databaseURL :"https://first-website-using-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/"
    
}


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click",function () {
    let inputValue = inputFieldEl.value
    console.log(inputValue);
})