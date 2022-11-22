import { getDoc, collection, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService, getParam } from "../firebase.js"
import { stripHTMLTags } from "../htmlSecurity.js"

// $(document).ready(function() { onViewPostLoad() })

// 페이지 로드 시 실행
export async function onViewPostLoad(postId) {
    const docRef = doc(dbService, "posts", postId)
    // 게시글 데이터 가져오기
    const docSnap = await getDoc(docRef)

    // 삭제되지 않았으면
    if (docSnap.data()["deleted"] == false) {
        // 게시글 영역
        const post_HTML = `
<div class="post" id="${docSnap.id}">
    <div class="post-content">
        <h1>${docSnap.data()["title"]}</h1>
        <p><pre>${docSnap.data()["content"]}</pre></p>
    </div>
    <div class="comments" id="comments"></div>
</div>
<div>
<button onclick="editPost('${postId}')">글 수정</button>
<button onclick="scratchPost('${postId}')">글 삭제</button>
</div>
        `
        // console.log(post_HTML)
        $("#viewpost-outer").append(post_HTML)
        
        // 코멘트가 있으면
        if (docSnap.data()["comments"].length > 1) {
            // 1 코멘트당 이 코드 실행 (forEach)
            docSnap.data()["comments"].forEach((comment, i) => {
                const isOwnComment = authService.currentUser.uid == comment["createdBy"]
                const createdBy = comment["createdBy"]
                var onClick = "loadUserProfile('" + createdBy + "')"
                if (isOwnComment) {
                    onClick = "loadMyProfile()"
                }
                // 댓글 1개 영역
                const comment_HTML = `
<div class="comment" id="${postId}.${i}">
    <p onclick="${onClick}")"><span>${comment["createdBy"]}</span> - <span>${comment["createdAt"]}</span></p>
    <p>${comment["content"]}</p>
    <button onclick="editComment('${postId}.${i}')">수정</button>
    <button onclick="scratchComment('${postId}.${i}')">삭제</button>
</div>
                `
                // 코멘트가 삭제되지 않았으면
                if (comment["deleted"] == false) {
                    $("#comments").append(comment_HTML)
                }
            })
        }
        
        // 댓글 쓰기 영역
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

    await updateDoc(
        doc(dbService, "posts", postId),
        { comments: comments }
    )

    $("#viewpost-outer").empty()
    onViewPostLoad(postId)
}

window.scratchPost = async function(postId) {

}