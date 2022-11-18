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

fetch("../pages/templates/header.html")
    .then(response =>{
        return response.text()
    })
    .then(data => {
        document.querySelector("header").innerHTML = data
    })

fetch("../pages/templates/footer.html")
    .then(response =>{
        return response.text()
    })
    .then(data => {
        document.querySelector("header").innerHTML = data
    })
