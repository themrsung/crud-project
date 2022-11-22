import { getDocs, collection, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { dbService } from "./firebase.js"
import { renderPostToProfile } from "./pages/newsfeed.js"

export async function onProfileLoad(uid) {
    const querySnapshot = await getDocs(
        query(
            collection(dbService, "posts"),
            where("deleted", "==", false),
            where("createdBy", "==", uid)
        )
    )

    querySnapshot.forEach((doc) => {
        renderPostToProfile(doc)
    })
}