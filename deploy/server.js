const express = require("express")
const app = express()
const basePathPrefix = `/webhooks`

app.get(`${basePathPrefix}/github`, (req, res) => {
  res.send("Deploying blog application")
})

app.listen(8080, () => console.log("Starting deploy server"))
