$(document).ready(function() { onPageLoad() })

function onPageLoad() {
    const content = document.getElementById("content")

    content.innerHTML = `<p>test</p>`

    $("#content").load("../pages/templates/newsfeed.html")
}
    