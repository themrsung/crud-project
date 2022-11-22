import {  doc, updateDoc , getDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { dbService } from "../firebase.js"
import "../script.js"
import {onViewPostLoad} from "./viewpost.js"

window.editPost = function(postId) {
    
    loadEditPost(postId)
}

window.onEditPostCompleted = async function(postId) {

    const commentRef = doc(dbService, "posts", postId);
    const title = document.getElementById("edit-post-title").value;
    const content = document.getElementById("edit-post-content").value;

    try {
        
        await updateDoc(commentRef, { content: content , title : title }) // 게시글
        return onViewPostLoad(postId);
     
    } catch (error) {
        alert(error);
    }


}

window.scratchPost = async function(postId) {
    
    const commentRef = doc(dbService, "posts",postId)
    try {
       
        await updateDoc(commentRef, { deleted : true }) 
        return onViewPostLoad(postId);

    } catch (error) {
        alert(error);
    }

}


window.editComment = async function(postId_number) {

    const info = postId_number.split(".");
    document.getElementsByClassName("commentBefore"+info[1])[0].style.display="none";
    document.getElementsByClassName("commentBefore"+info[1])[1].style.display="none";
    document.getElementsByClassName("commentBefore"+info[1])[2].style.display="none";

    document.getElementsByClassName("commentAfter"+info[1])[0].style.display="block";
    document.getElementsByClassName("commentAfter"+info[1])[1].style.display="inline-block";
    document.getElementsByClassName("commentAfter"+info[1])[2].style.display="inline-block";
    

    

}

window.onEditCommentCompleted = async function(postId) {  //comment 매개로 넣기

    const info = postId.split(".");
    const content = document.getElementById("updatingComment"+info[1]).value;
    
    if(content==="")
    {
        alert("내용을 입력하세요");
        return;
    } 
    

    const docRef = doc(dbService, "posts", info[0])
    // 게시글 데이터 가져오기
    const docSnap = await getDoc(docRef)


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
        return onViewPostLoad(info[0]);
    
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
        return onViewPostLoad(info[0]);
    } catch (error) {
        alert(error);
    }


}

window.drop = async function(postId_number) {
    const info = postId_number.split(".");
    document.getElementsByClassName("commentAfter"+info[1])[0].style.display="none";
    document.getElementsByClassName("commentAfter"+info[1])[1].style.display="none";
    document.getElementsByClassName("commentAfter"+info[1])[2].style.display="none";

    document.getElementsByClassName("commentBefore"+info[1])[0].style.display="block";
    document.getElementsByClassName("commentBefore"+info[1])[1].style.display="inline-block";
    document.getElementsByClassName("commentBefore"+info[1])[2].style.display="inline-block";
}

