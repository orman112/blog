const express = require("express")
const app = express()
const childProcess = require("child_process")
const basePathPrefix = `/webhooks`
const githubUserName = `thefrugaldev`

app.post(`${basePathPrefix}/github/deploy`, (req, res) => {
  let sender = req.body.sender
  let branch = req.body.ref

  if (branch.indexOf("master") > -1 && sender.login == githubUserName)
    deploy(res)
})

function deploy(res) {
  childProcess.exec(`./deploy.sh`, function(err, stdout, stderr) {
    if (err) {
      console.error(err)
      return res.send(500)
    }
    res.send(200)
  })
}

app.listen(8080, () => console.log("Starting deploy server"))
