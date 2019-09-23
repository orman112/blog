const express = require("express")
const app = express()
app.get("/github", (req, res) => {
  res.send("Deploying blog application")
})

app.listen(8080, () => console.log("Starting deploy server"))
