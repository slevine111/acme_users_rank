const dbInit = require('../server/DataAccess/index')
const User = require('../server/DataAccess/models/index')

const syncAndSeed = () => {
  return dbInit(true)
    .then(() => {
      const users = [
        { name: 'Joe', bio: 'A person', rank: 50 },
        { name: 'Mike', bio: ' A dog', rank: 50 },
        { name: 'Dumbo', bio: 'An elephant', rank: 50 }
      ]

      return Promise.all(users.map(user => User.create(user)))
    })
    .then(() => console.log('seeding of database succeeded'))
    .catch(err => {
      console.log('seeding of database failed for following reason:')
      console.error(err)
    })
}

module.exports = syncAndSeed
