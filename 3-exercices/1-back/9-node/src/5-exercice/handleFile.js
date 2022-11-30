import { mkdir, stat, readFile, writeFile} from 'node:fs/promises'

const mkDirectory = async (dir) => {
  return mkdir(dir, { recursive: true })
  .then(() => 'ok')
  .catch(() => {
    throw new Error('can\'t create directory')
  })
}

const createFile = async (filename, content) => {
    return stat(filename)
    .then(() => 'ok')
    .catch(() => { 
      return writeFile(filename, content)
    })
}

const createFileWithContent = async (filename, content) => {
  return writeFile(filename, content).then(() => 'ok')
}

const getFileContent = async (filename) => {
  return readFile(filename)
    .then(data => data.toString())
    .catch((er) => {
      console.log('error read content', er)
      throw new Error('can\'t read content')
    })
}

export { mkDirectory, createFileWithContent, createFile, getFileContent }
