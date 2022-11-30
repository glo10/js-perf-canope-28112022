import { createServer } from 'node:http'
import { resolve } from 'node:path'
import { getFileContent, mkDirectory, createFileWithContent, createFile} from './handleFile.js'
import checkUserData from './user.js'

const headers = { 'Content-Type': 'application/json' }
const http = createServer()
const port = process.env.PORT || 7000
console.log(`app is running on http://localhost:${port}`)
http.listen(port)

http.on('request', (req, res) => {
  if (/signup$/.test(req.url) && /post/i.test(req.method)) {
    let formData = ''
    req.on('end', () => {
      http.emit('app_user_data', formData, res)
    })
    req.on('data', (chunk) => {
      formData += chunk
    })
    res.on('error', (err) => {
      console.log('error server', err)
    })
  } else {
    http.emit('app_404', res)
  }
})

http.on('app_404', (response) => {
  response.writeHead(404, headers)
  response.end('{"message": "404 not found"}')
})

http.on('app_user_data', (newUser, response) => {
  newUser = JSON.parse(newUser)
  const dir = resolve('9-node', 'data')
  const filename = resolve(dir, 'users.json')
  try {
    Promise.all(
      [
        mkDirectory(dir),
        createFile(filename, '[]'),
        checkUserData(newUser),
      ]
    )
      .then(res => {
        return getFileContent(filename)
      })
      .then((res) => {
        const users = JSON.parse(res)
        let isUserExist = users.find(user => newUser.email === user.email) ? true : false
        if (isUserExist) {
          response.writeHead(200, headers)
          response.end(JSON.stringify({ message: 'user already exists' }))
        } else {
          users.push(newUser)
          return createFileWithContent(filename, JSON.stringify(users))
        }
      })
      .then((created) => {
        if(created) {
          response.writeHead(201, headers)
          response.end('{"message": "user created"}')
        }
      })
      .catch((err) => {
        console.log('error last catch on promises', err)
        http.emit('app_404', response)
      })
  }
  catch(e){
    console.log('error on catch outside promises', e)
    http.emit('app_404', response)
  }
})
