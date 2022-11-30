// import {stdin as input, stdout as output} from 'process'
import {createInterface} from 'readline/promises'

const app = createInterface({input : process.stdin, output : process.stdout})
// same without import from process, process is global const app = createInterface({input : process.stdin, output: process.stdout})

const lastName = await app.question('Quelle est votre nom ? ')
const firstName = await app.question('Quelle est votre prénom ? ')

console.log(`Bonjour ${lastName} ${firstName} !`) 
// 'bonjour ' + lastName + ' ' + firstName
app.close()