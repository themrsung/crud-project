import { authService } from "./firebase.js"
import "./script.js"

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

// window.onToggle = onToggle;
// window.handleAuth = handleAuth;
// window.goToProfile = goToProfile;
// window.socialLogin = socialLogin;
// window.logout = logout;
// window.onFileChange = onFileChange;
// window.changeProfile = changeProfile;
// window.save_comment = save_comment;
// window.update_comment = update_comment;
// window.onEditing = onEditing;
// window.delete_comment = delete_comment;