import { getDoc, collection, doc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { dbService, getParam } from "../firebase.js"

// $(document).ready(function() { onViewPostLoad() })

export async function onViewPostLoad(postId) {
    var title = "title"
    var content = "content"

    const docRef = doc(dbService, "posts", postId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        title = docSnap.data()["title"]
        content = docSnap.data()["content"]
    }

    document.getElementById("view-post-title").innerHTML = title
    document.getElementById("view-post-content").innerHTML = content
}