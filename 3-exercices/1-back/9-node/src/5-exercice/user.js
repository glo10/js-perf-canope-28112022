
const checkUserData = (user) => {
    const keys = ['firstName', 'lastName', 'email', 'age', 'country', 'city']
    return new Promise((resolve, reject) => {
        for(let i = 0; i < keys.length; i++) {
          if(! user.hasOwnProperty(keys[i])) {
            reject(`${keys[i]} must be present`)
          }
        }
        resolve('ok')
    })
}

export default checkUserData