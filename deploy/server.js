const express = require("express")
const app = express()
app.get("/webhook/github", (req, res) => res.send("Deploying app..."))
app.listen(8080, () => console.log("Starting deploy server"))
