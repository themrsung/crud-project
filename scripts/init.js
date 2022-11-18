$(document).ready(function() { onPageLoad() })

function onPageLoad() {
    $("#title").load("..pages/templates/title.html")
    $("#content").load("../pages/templates/newsfeed.html")
    $("#footer").load("../pages/templates/footer.html")
}
    