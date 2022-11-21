import { addDoc, getDocs, collection, doc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService } from "../firebase.js"
import { stripHTMLTags } from "../htmlSecurity.js"

window.writePost = function() {

    const title = stripHTMLTags(document.getElementById("write-post-title").value || null)
    const content = stripHTMLTags(document.getElementById("write-post-content").value || null)

    var createdBy = "user"

    const user = authService.currentUser
    if (user != null) {
        createdBy = user.uid
    }


    const createdAt = Date.now() || null
    const deleted = false

    addDoc(collection(dbService, "posts"), {
        title: title,
        content: content,
        createdBy: createdBy,
        createdAt: createdAt,
        deleted: deleted
    })
}

// document.querySelector("#write-post-button").addEventListener("click", writePost)