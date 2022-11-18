import {authService} from "firebase.js"
import * as script from "script.js"

document.addEventListener("DOMContentLoaded", function() {
    authService.onAuthStateChanged((user) => {
        handleLocation()
        const hash = window.location.hash

        if (user) {
            loadNewsfeed()
        }
        else {
            loadLandingPage()
        }
    })
})