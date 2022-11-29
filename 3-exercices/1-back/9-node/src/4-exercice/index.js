
import { createServer } from 'node:http'
import { readFile } from 'node:fs'
import { resolve } from 'path'
console.info('App on http://localhost:5000')
 
createServer((req, res) => {
  const headers = { 'Content-Type': 'text/html; charset=utf-8' }
  const baseDir = resolve('./', 'templates/html')
  const page  = (/\/$/.test(req.url)) ?  'index.html': '404.html'
  const status = /index/.test(page) ? 200 : 404
  readFile(`${baseDir}/${page}`, {encoding: 'utf-8'}, (err, data) => {
    if(!err) {
      res.writeHead(status, headers)
      res.write(data)
      res.end()
    }
  })
}).listen(5000)
