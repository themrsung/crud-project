$(document).ready(function() {

    const title = document.title
    const description = document.querySelector("meta[name='description'").content

    var header = document.getElementById("title")
    header.innerHTML = `
    <h1>${title}</h1>
    <p>${description}</p>
    `

    var footer = document.getElementById("footer")
    footer.innerHTML = `
    <h3>Made by INFINITY</h3>
    <p>Copyright 2022 INFINITY, All Rights Reserved.</p>
    `

    const content = document.getElementById("content")

    content.innerHTML = `<p>test</p>`

    $("#content").load("../pages/templates/newsfeed.html")

})
    