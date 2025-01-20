const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('database.json')
const middlewares = jsonServer.defaults()
const port = 3000
server.use(middlewares)
server.use(router)
server.use(cors());
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})