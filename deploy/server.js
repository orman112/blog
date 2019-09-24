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
  ) {
    deploy(res)
  }
})

function deploy(res) {
  // childProcess.exec("sh /var/www/blog/deploy/deploy.sh", function(
  //   err,
  //   stdout,
  //   stderr
  // ) {
  //   if (err) {
  //     return res.status(500).send(err)
  //   }
  //   res.sendStatus(200)
  // })
  const deploy = childProcess.spawn("./deploy.sh")

  deploy.stdout.on("data", data => {
    console.log(`stdout: ${data}`)
    return res.sendStatus(200)
  })

  deploy.stderr.on("data", data => {
    console.error(`stderr: ${data}`)
    return res.status(500).send(err)
  })

  deploy.on("close", code => {
    console.log(`child process exited with code ${code}`)
  })
}
