import { getDoc, collection, doc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { dbService, getParam } from "../firebase.js"

// $(document).ready(function() { onViewPostLoad() })

export async function onViewPostLoad(postId) {
    const docRef = doc(dbService, "posts", postId)
    const docSnap = await getDoc(docRef)

    if (docSnap.data()["deleted"] == false) {
        const post_HTML = `
<div class="post" id="${docSnap.id}">
    <div class="post-content">
        <h1>${docSnap.data()["title"]}</h1>
        <p><pre>${docSnap.data()["content"]}</pre></p>
    </div>
    <div class="comments" id="comments"></div>
</div>
        `
        $("post-outer").append(post_HTML)
        
        if (docSnap.data()["comments"] != null) {
            doc.data()["comments"].forEach((comment, i) => {
                const comment_HTML = `
<div class="comment" id="${i}">
    <p><span>${comment["user"]}</span> - <span>${comment["createdAt"]}</span></p>
    <p>${comment["content"]}</p>
</div>
                `
                if (comment["deleted"] == false) {
                    $("#comments").append(comment_HTML)
                }
            })
        }
    }
}