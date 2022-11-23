import { getDocs, collection, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService } from "./firebase.js"
import { renderPostToProfile } from "./pages/newsfeed.js"

export async function onProfileLoad(user) {
    const querySnapshot = await getDocs(
        query(
            collection(dbService, "posts"),
            where("deleted", "==", false),
            where("createdBy", "==", user.uid),
            orderBy("createdAt")
        )
    )

    querySnapshot.forEach((doc) => {
        renderPostToProfile(doc)
    })

    renderProfileInfo(user)
}

function renderProfileInfo(user) {    
    document.getElementById("user-name").innerHTML = user.displayName
    document.getElementById("user-email").innerHTML = user.email
    document.getElementById("user-profile-image").src = user.photoURL
    document.getElementById("user-motd").innerHTML = user.motd
}

window.profileImageSetTest = function() {
    authService.currentUser.photoURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/PEO_M4_Carbine_RAS_M68_CCO.png/450px-PEO_M4_Carbine_RAS_M68_CCO.png"
}