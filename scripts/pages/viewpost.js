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
    <p><span>${comment["createdBy"]}</span> - <span>${comment["createdAt"]}</span></p>
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
    <button onclick="writeComment('${docSnap.id}')">댓글 달기</button>
</div>
        `
        $("#comments").append(write_comment_HTML)
    }
}

window.writeComment = async function(postId) {
    const content = stripHTMLTags(document.getElementById("write-comment-content").value)

    var createdBy = "user"

    const user = authService.currentUser
    if (user != null) {
        createdBy = user.uid
    }

    const createdAt = Date.now()
    const comment = {
        createdBy: createdBy,
        createdAt: createdAt,
        content: content,
        deleted: false
    }

    const docSnap = await getDoc(doc(dbService, "posts", postId))
    console.log(docSnap)
    var comments = docSnap.data()["comments"]

    comments.push(comment)

    updateDoc(
        doc(dbService, "posts", postId),
        { comments: comments }
    )

    $("#viewpost-outer").empty()
    onViewPostLoad(postId)
}