import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
   databaseURL: "https://we-are-the-champions-9eca7-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")


const enterMessageEl = document.getElementById("enter-message")
const fromFieldEl = document.getElementById("from-input")
const toFieldEl = document.getElementById("to-input")
const endorsementListEl = document.getElementById("endorsement-list")


const publishButtonEl = document.getElementById("publish-button")


onValue(endorsementsInDB, function(snapshot) {
   let endorsementsArray = Object.values(snapshot.val())


   clearEndorsementListEl()
  
   for (let i = 0; i < endorsementsArray.length; i++) {
       let currentEndorsement = endorsementsArray[i]


       appendEndorsementMessage(currentEndorsement)
   }
})


publishButtonEl.addEventListener("click", function() {
let endorsementMessage = enterMessageEl.value
let toValue = toFieldEl.value
let fromValue = fromFieldEl.value


if (endorsementMessage && toValue && fromValue) {
   push(endorsementsInDB, {
       to: toValue,
       from: fromValue,
       message: endorsementMessage
   })

clearEndorsementEl()
toFieldEl.value = ""
fromFieldEl.value = ""
} else {
   alert("Please fill in all the fields.")
}
})


function clearEndorsementListEl() {
   endorsementListEl.innerHTML = ""
}


/* FUNCTION - clear endorsement */


function clearEndorsementEl() {


   enterMessageEl.value = ""


}


/* FUNCTION - append the input value */


function appendEndorsementMessage(endorsementValue) {
   let endorsementHTML = `
   <li>
       <h4><strong>To: ${endorsementValue.to}</strong></h4>
       <p>${endorsementValue.message}</p>
       <h4><strong>From: ${endorsementValue.from}</strong></h4>
   </li>
   `
   endorsementListEl.insertAdjacentHTML('afterbegin', endorsementHTML)
}
