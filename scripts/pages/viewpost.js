import { getDoc, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService, getParam } from "../firebase.js"
import { stripHTMLTags } from "../htmlSecurity.js"

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
        console.log(post_HTML)
        $("#viewpost-outer").append(post_HTML)
        
        if (docSnap.data()["comments"] != null) {
            docSnap.data()["comments"].forEach((comment, i) => {
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

        const write_comment_HTML = `
<div class="write-comment-area">
    <input id="write-comment-content" placeholder="댓글을 입력해주세요...">
    <button onclick="writeComment(${docSnap.id})"></button>
</div>
        `
        $("#comments").append(write_comment_HTML)
    }
}

window.writeComment = function(postId) {
    const content = stripHTMLTags(document.getElementById("write-comment-content").innerHTML)
    const user = authService.currentUser.uid || "user"
    const createdAt = Date.now()
    const comment = {
        user: user,
        createdAt: createdAt,
        content: content,
        deleted: false
    }

    var comments = getDoc(
        doc(dbService, "posts", postId).data()["comments"]
    )

    comments.append(comment)

    updateDoc(
        doc(dbService, "posts", postId),
        { comments: comments }
    )

}