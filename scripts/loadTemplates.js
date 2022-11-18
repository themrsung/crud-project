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


var header = document.getElementById("title")
header.innerHTML = `<p>header</p>`

var footer = document.getElementById("footer")
footer.innerHTML = `
<h3>Made by INFINITY</h3>
<p>Copyright 2022 INFINITY, All Rights Reserved.</p>
`