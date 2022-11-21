import { getDoc, collection, doc, updateDoc , arrayUnion } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService, getParam } from "../firebase.js"
import { stripHTMLTags } from "../htmlSecurity.js"

// $(document).ready(function() { onViewPostLoad() })

// 페이지 로드 시 실행
let docSnap;

export async function onViewPostLoad(postId) {
    const docRef = doc(dbService, "posts", postId)
    // 게시글 데이터 가져오기
    docSnap = await getDoc(docRef)

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
<button onclick="updating()">글 수정</button>
<button onclick="scratching()">글 삭제</button>
</div>
        `
        // console.log(post_HTML)
        $("#viewpost-outer").append(post_HTML)
        
        // 코멘트가 있으면
        if (docSnap.data()["comments"] != null) {
            // 1 코멘트당 이 코드 실행 (forEach)
            docSnap.data()["comments"].forEach((comment, i) => {
                // 댓글 1개 영역
                const comment_HTML = `
<div class="comment" id="${i}">
    <p><span>${comment["createdBy"]}</span> - <span>${comment["createdAt"]}</span></p>
    <p>${comment["content"]}</p>
    <button onclick="updating('${i}')" >수정</button>
    <button onclick="scratching('${i}')">삭제</button>
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

    const docSnaps = await getDoc(doc(dbService, "posts", postId))
    console.log(docSnaps)
    var comments = docSnaps.data()["comments"]

    comments.push(comment)

    updateDoc(
        doc(dbService, "posts", postId),
        { comments: comments }
    )

    $("#viewpost-outer").empty()
    onViewPostLoad(postId)
}

window.updating = async function(number = undefined) {
    //const content = stripHTMLTags(document.getElementById("write-comment-content").value)
    
    //const postNumber = document.getElementById("yourPost").value;
    
    const commentRef = doc(dbService, "posts", docSnap.id);
    // const commentRef = collection(dbService,"posts");
    // const postDoc = doc(dbService, "posts", docSnap.id);
    
    
    
    // try {
    //     number ? 
    //     // await updateDoc(commentRef, JSON.parse(`{ "comments" : { [number] : {"content" : "?" }")`} 
           
    //     //     // {
    //     //     //     content : "바꿀 내용",
    //     //     //     createdAt : docSnap.data().comments[number].createdAt,
    //     //     //     createdBy : docSnap.data().comments[number].createdBy,
    //     //     //     deleted : docSnap.data().comments[number].deleted
    //     //     // }
    //     // }):
    //     await updateDoc(commentRef, { content: "" , title : "" }) // 게시글
    //     return loadViewPost();
    // } catch (error) {
    //     alert(error);
    // }

    
}

window.scratching = async function(number) {
    const commentRef = doc(dbService, "posts", docSnap.id)
    
    
    
    try {
        number ? 
        await updateDoc(commentRef, { "comments.1.content" :  
           
            {
                content : "바꿀 내용",
                createdAt : docSnap.data().comments[number].createdAt,
                createdBy : docSnap.data().comments[number].createdBy,},
                deleted : docSnap.data().comments[number].deleted
            }
            
        ):
        await updateDoc(commentRef, { content : "" , title : "" }) // 게시글
        return loadViewPost();
    } catch (error) {
        alert(error);
    }
}


