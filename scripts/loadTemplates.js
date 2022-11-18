// var host = process.env.HOST || "0.0.0.0"
// var port = process.env.PORT || 8080

// var corsProxy = require("cors-anywhere")
// corsProxy.createServer({
//     originWhiteList: [],
//     requireHeader: ["origin", "x-requested-with"],
//     removeHeaders: ["cookie", "cookie2"]
// }).listen(port, host, function() {
//     console.log("Running CORS Anywhere on " + host + ":" + port)
// })

var title = document.title
var description = document.querySelector("meta[name='description'").content

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