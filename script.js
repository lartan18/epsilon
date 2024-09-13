import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js'
import { getDatabase, ref, push, onValue, set, get, update } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js'

const appSettings = {
    databaseURL: "https://inconspicuous-2c4f9-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const countDB = ref(database, "counter")

console.log(app)

//

const counter = document.getElementById("counter")
const saveBtn = document.getElementById("save")
const saved = document.getElementById("saved")
const increment = document.getElementById("button")
const decrement = document.getElementById("button2")
const decrementWrapper = document.getElementById("b2wrapper")
let rect = decrementWrapper.getBoundingClientRect()
let right = rect.right
let left = rect.left
let center = (right + left) / 2
let moved = false

//

saveBtn.onclick = _ => {
    if (saved.classList.contains("show")) {
        saved.classList.remove("show")
    }
    saved.classList.add("show")

    set(countDB, counter.innerText)
}

// get current value from database
onValue(countDB, function(snapshot) {
    counter.innerText = snapshot.val()
})

// "saved!" popup
saved.onanimationend = _ => {
    saved.classList.remove("show")
}

increment.addEventListener("click", _ => {
    counter.innerText = Number(counter.innerText) + 1
    counter.classList.add("lift")
})

decrement.addEventListener("click", _ => {
    if (Number(counter.innerText > 0)) {
        counter.innerText = Number(counter.innerText) - 1
    }
    counter.classList.add("lower")
})

// counter animation
increment.addEventListener("mouseup", _ => {
    counter.classList.remove("lift")
    counter.classList.remove("lower")
})

decrement.addEventListener("mouseup", _ => {
    counter.classList.remove("lower")
    counter.classList.remove("lift")
})

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        counter.innerText = Number(counter.innerText) + 1
    }
    else if (e.key === "ArrowDown") {
        if (Number(counter.innerText > 0)) {
            counter.innerText = Number(counter.innerText) - 1
        }
    }
})