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
    document.getElementById("user-tag").innerHTML = user.tag
    document.getElementById("user-motd").innerHTML = user.motd
}