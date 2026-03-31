import http from "node:http"
import next from "next"

const port = Number.parseInt(process.env.PORT || "3000", 10)
const hostname = process.env.HOSTNAME || "localhost"

const app = next({
  dev: true,
  hostname,
  port,
  dir: process.cwd(),
})

const handle = app.getRequestHandler()

await app.prepare()

http
  .createServer(async (req, res) => {
    try {
      await handle(req, res)
    } catch (err) {
      res.statusCode = 500
      res.end("Internal Server Error")
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })
  .listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Dev server running on http://${hostname}:${port}`)
  })

