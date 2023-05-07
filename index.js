import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref ,push ,remove, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
databaseURL :"https://real-time-database-14c50-default-rtdb.asia-southeast1.firebasedatabase.app/"

}
const app = initializeApp(appSettings)
const database = getDatabase(app);
const shoppingListInDB = ref(database , "shoppingList") //(location , what the ref called(name) )


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const parentEl = document.getElementById("shopping-list") //parent child

//putting data to the database when we clicking add to cart
addButtonEl.addEventListener("click",function () {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB,inputValue ) //ref first argu and value 2nd argu

    clearInputFieldEl();
    
    // appendItemto(inputValue) ;  from commenting this line we prevent double fetching and adding element bug in while add to parentEl

    console.log(` ${inputValue} added to database`);
})

// fetching from database 
onValue(shoppingListInDB , function(snapshot){
    // let  itemsArray = Object.values(snapshot.val())
    if(snapshot.exists()){ //this snapshot.exists check the parentEl if it has li item or not and represent the data

    let  itemsArray = Object.entries(snapshot.val()) //getting both unique id and value of data from database

    // console.log(itemsArray)

    clearShoppingListEl();
    for (let i = 0; i < itemsArray.length; i++) {

        let currentItem = itemsArray[i]; //storing data in currentItem converting into array
        let currentItemID = currentItem[0];
        let currentItemValue = currentItem[1];

        appendItemto(currentItem) //appending value into parent element
        
    }}
    else{
        parentEl.innerHTML = "No items here ...yet"
    }
    
})

function clearShoppingListEl(){
    parentEl.innerHTML="";
}

//function for clearing input 
function clearInputFieldEl(){
       inputFieldEl.value="";
}


//function for adding li to the parent element called ul/.shopping-list
function appendItemto(item) {
     
    // parentEl.innerHTML += `<li>${itemvalue}</li> //this line cannot be used
    // for big project so createElement is being used instead of this line

    let itemID = item[0]
    let itemValue = item[1] 
    
    let newEL = document.createElement("li")
    newEL.textContent = itemValue;
    parentEl.append(newEL);
    newEL.addEventListener("dblclick",function(){
        console.log(itemID)//consoling the item which is being clicked
        let extactLocationinDB =  ref(database , `shoppingList/${itemID}`)

        remove(extactLocationinDB);


    })



}
