const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  childProcess = require("child_process"),
  basePathPrefix = `/webhooks`,
  githubUserName = `thefrugaldev`,
  port = parseInt(process.env.PORT, 10) || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => console.log(`Starting deploy server on port ${port}`))

app.post(`${basePathPrefix}/github/deploy`, (req, res) => {
  let sender = req.body.sender
  let repo = req.body.repository

  if (
    repo.default_branch.indexOf("master") > -1 &&
    sender.login == githubUserName
  )
    deploy(res)
})

function deploy(res) {
  childProcess.exec(`./deploy.sh`, function(err, stdout, stderr) {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    res.sendStatus(200)
  })
}
