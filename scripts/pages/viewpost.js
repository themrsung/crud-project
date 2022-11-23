import { getDoc, collection, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService, getParam } from "../firebase.js"
import { stripHTMLTags } from "../htmlSecurity.js"
import { getUserDisplayName } from "../userService.js"

// $(document).ready(function() { onViewPostLoad() })

// 페이지 로드 시 실행
export async function onViewPostLoad(postId) { 
    const docRef = doc(dbService, "posts", postId)
    // 게시글 데이터 가져오기
    const docSnap = await getDoc(docRef)

    $("#viewpost-outer").empty(); // 글 초기화
    $("#comments").empty(); // 댓글 초기화
    
    // 삭제되지 않았으면
    if (docSnap.data()["deleted"] == false){
        const isOwnPost = authService.currentUser.uid == docSnap.data()["createdBy"]
        const postCreatedBy = docSnap.data()["createdBy"]
        // 게시글 영역
        const post_HTML = `
<div class="post" id="${docSnap.id}">
    <div class="post-content">
        <h1>${docSnap.data()["title"]}</h1>
        <p><pre class="post-content-pre">${docSnap.data()["content"]}</pre></p>
    </div>
    <div class="comments" id="comments"></div>
</div>`
    const post_Btn = `
    <div>
        <button onclick="editPost('${postId}')">글 수정</button>
        <button onclick="scratchPost('${postId}')">글 삭제</button>
    </div>
        `
        // console.log(post_HTML)
        $("#viewpost-outer").append(post_HTML)
        if (postCreatedBy===authService.currentUser.uid)
                {
                    $("#viewpost-outer").append(post_Btn)
                }
        
        // 코멘트가 있으면
        if (docSnap.data()["comments"].length > 1) {
            // 1 코멘트당 이 코드 실행 (forEach)
            docSnap.data()["comments"].forEach((comment, i) => {
                const isOwnComment = authService.currentUser.uid == comment["createdBy"]
                const commCreatedBy = comment["createdBy"]
                var onClick = "loadUserProfile('" + commCreatedBy + "')"
                if (isOwnComment) {
                    onClick = "loadMyProfile()"
                }

                Promise.all([
                    getUserDisplayName(authService.currentUser.uid)
                ]).then(function(response) {
                    const displayName = response[0]
                    // 댓글 1개 영역
                    const comment_HTML = `
<div class="comment" id="${postId}.${i}">
    <p onclick="${onClick}")"><span>${displayName}</span> - <span>${comment["createdAt"]}</span></p>
    <p style="display:block" class="commentBefore${i}" >${comment["content"]}</p>
    <input type="text" id="updatingComment${i}" class="commentAfter${i}" style="display:none">
                                `
                    const comment_BNT = `
    <button onclick="editComment('${postId}.${i}')" style="display:inline-block" class="commentBefore${i}" >수정</button>
    <button onclick="scratchComment('${postId}.${i}')" style="display:inline-block" class="commentBefore${i}" >삭제</button>
    <button onclick="onEditCommentCompleted('${postId}.${i}')" style="display:none" class="commentAfter${i}">완료</button>
    <button onclick="drop('${postId}.${i}')" style="display:none" class="commentAfter${i}">취소</button>
</div>
                                `
                    // 코멘트가 삭제되지 않았으면 
                    if (comment["deleted"] == false) {
                        $("#comments").append(comment_HTML)
                        if (commCreatedBy===authService.currentUser.uid)
                        {
                            $("#comments").append(comment_BNT)
                        }
                        else
                        {
                            $("#comments").append("</div>")
                        }
                    }
                })     
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
    // console.log(docSnap)
    var comments = docSnap.data()["comments"]

    comments.push(comment)

    await updateDoc(
        doc(dbService, "posts", postId),
        { comments: comments }
    )

    $("#viewpost-outer").empty()
    onViewPostLoad(postId)
}

