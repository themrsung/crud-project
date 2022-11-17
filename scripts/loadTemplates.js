void async function() {
    // Get templates
    var templates = document.createElement("template")
    templates.innerHTML = await(await fetch("../pages/templates.html")).text()

    // Fetch templates
    var titleAreaTemplate = templates.content.getElementById("title-template")
    var footerTemplate = templates.content.getElementById("footer-template")


    
    console.log(titleAreaTemplate)
} ()