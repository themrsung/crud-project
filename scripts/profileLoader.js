import { getDocs, collection, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService } from "./firebase.js"
import { renderPostToProfile } from "./pages/newsfeed.js"
import { getUserDisplayName, getUserEmail, getUserMotd, getUserPhotoURL } from "./userService.js"

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

    renderProfileInfo(
        user.displayName,
        user.email,
        user.photoURL,
        "motd"
    )
}

export async function onProfileLoadUID(uid) {
    Promise.all([
        getUserDisplayName(uid),
        getUserEmail(uid),
        getUserPhotoURL(uid),
        getUserMotd(uid)
    ]).then(function(response) {
        const [displayName, email, photoURL, motd] = response
        renderProfileInfo(
            displayName,
            email,
            photoURL,
            motd
        )
    })

    // }
    // renderProfileInfo(
    //     getUserDisplayName(uid),
    //     getUserEmail(uid),
    //     getUserPhotoURL(uid),
    //     getUserMotd(uid)
    // )
}

// function renderProfileInfo(user) {    
//     document.getElementById("user-name").innerHTML = user.displayName
//     document.getElementById("user-email").innerHTML = user.email
//     document.getElementById("user-profile-image").src = user.photoURL
//     document.getElementById("user-motd").innerHTML = user.motd
// }

function renderProfileInfo(displayName, email, photoURL, motd) {
    console.log("aaaa", displayName)
    document.getElementById("user-name").innerHTML = displayName
    document.getElementById("user-email").innerHTML = email
    document.getElementById("user-profile-image").src = photoURL
    document.getElementById("user-motd").innerHTML = motd
}

window.profileImageSetTest = function() {
    authService.currentUser.photoURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/PEO_M4_Carbine_RAS_M68_CCO.png/450px-PEO_M4_Carbine_RAS_M68_CCO.png"
}