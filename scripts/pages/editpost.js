import {  doc, updateDoc , getDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { dbService } from "../firebase.js"
import "../script.js"
import { loadNewsfeed } from "../script.js"

window.editPost = function(postId) {
    loadEditPost(postId)
}

window.onEditPostCompleted = async function(postId) {

    const commentRef = doc(dbService, "posts", postId);
    const title = document.getElementById("edit-post-title").value;
    const content = document.getElementById("edit-post-content").value;

    try {
        
        await updateDoc(commentRef, { content: content , title : title }) // 게시글
        return loadViewPost();
     
    } catch (error) {
        alert(error);
    }


}

window.scratchPost = async function(postId) {
    
    const commentRef = doc(dbService, "posts",postId)
    try {
       
        await updateDoc(commentRef, { deleted : true }) 
        return loadViewPost();

    } catch (error) {
        alert(error);
    }

    loadNewsfeed()
}


window.editComment = async function(postId_number) {

    const comment = document.getElementById(postId_number);
    

    comment.children[1].innerHTML = `<input type="text" id="edit-comment" class="input">`;
    comment.children[1].focus();
    comment.children[2].innerHTML = `<button onclick="onEditCommentCompleted('${postId_number}')">완료</button>`
    comment.children[3].innerHTML = `<button onclick="drop()">취소</button>`

}

window.onEditCommentCompleted = async function(postId) {  //comment 매개로 넣기

    const content = document.getElementById("edit-comment").value;
    
    if(content==="")
    {
        alert("내용을 입력하세요");
        return;
    }
    const info = postId.split(".");

    const docRef = doc(dbService, "posts", info[0])
    // 게시글 데이터 가져오기
    const docSnap = await getDoc(docRef)

    // docSnap.data()["comments"].forEach((comment, i) => {
    //    if (i == info[1])
    //    {
    //     comment[content] = document.getElementById("edit-comment").value;
    //     }
    // })

    const commentsSiballl = docSnap.data()["comments"];
    for(let i in commentsSiballl)
    {
        if(i==info[1])
        {
            
            commentsSiballl[i].content = content;
        }
        
    }

    

    try {
        
        await updateDoc(docRef,{comments : commentsSiballl}) // 게시글
        return loadViewPost();
    
    } catch (error) {
        alert(error);
    }


}

window.scratchComment = async function(postId) {
    
    const info = postId.split(".");
    const docRef = doc(dbService, "posts", info[0])
    // 게시글 데이터 가져오기
    const docSnap = await getDoc(docRef)

    const commentsSiballl = docSnap.data()["comments"];
    for(let i in commentsSiballl)
    {
        if(i==info[1])
        {
            commentsSiballl[i].deleted = true;
        }
        
    }
    try {
        await updateDoc(docRef,{comments : commentsSiballl}) // 게시글
        return loadViewPost();
    } catch (error) {
        alert(error);
    }


}

