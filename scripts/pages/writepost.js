import { addDoc, getDocs, collection, doc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService } from "../firebase.js"
import { stripHTMLTags } from "../htmlSecurity.js"
import { updateUserInfoToCache } from "../userService.js"

window.writePost = function() {

    updateUserInfoToCache()

    const title = stripHTMLTags(document.getElementById("write-post-title").value) || null
    const content = stripHTMLTags(document.getElementById("write-post-content").value) || null

    var createdBy = "user"

    const user = authService.currentUser
    if (user != null) {
        createdBy = user.uid
    }


    const createdAt = Date.now() || null
    const deleted = false
    const comments = [
        {
            createdBy: "user",
            createdAt: 0,
            content: "placeholder",
            deleted: true
        }
    ]

    addDoc(collection(dbService, "posts"), {
        title: title,
        content: content,
        createdBy: createdBy,
        createdAt: createdAt,
        comments: comments,
        deleted: deleted,
        img : localStorage.getItem("write-post-img")
    })
}

// document.querySelector("#write-post-button").addEventListener("click", writePost)
window.filePack=[];
window.fileNames=[];

window.fileControl = (event) => {

    document.getElementById("imgList").innerHTML = "";
    document.getElementById("fileNameList").innerHTML = "";
    
    let files = event.target.files;
    
    let file;
       for (let i=0; i<files.length ; i++){
            let reader = new FileReader();
            file = files[i];
            window.fileNames.push(files[i].name)
            reader.onload = (file) => {
               
                window.filePack[i] = reader.result;
                window.filePack.length === window.fileNames.length ? window.showFiles() : false
                //window.showFiles();
                
             }
            reader.readAsDataURL(file)
        }
        
}

window.showFiles = function()
{
    for (let j=0; j<window.filePack.length ; j++){
        const imgDataUrl = window.filePack[j];
        localStorage.setItem("posting-img"+j, imgDataUrl);
        //document.getElementById("posting-img").src = imgDataUrl;
        const imgList = 
        `
            <img src="${imgDataUrl}" id="posting-img${j}">
        `;
        const fileNameList = 
        ` 
            <div style="display=inline-block" id="fileInfo${j}">
                <p>${window.fileNames[j]}</p>
                <button onclick="removeFile(${j})">x</button>
            </div>
        `;
        document.getElementById("imgList").innerHTML += imgList;
        document.getElementById("fileNameList").innerHTML += fileNameList;
        };
}

window.removeFile = function(number)
{
    document.getElementById("fileInfo"+number).style.display="none";
    localStorage.removeItem("posting-img"+number);
}

