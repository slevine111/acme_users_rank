const app = require('./api/index')
const dbInit = require('./DataAccess/index')

const PORT = process.env.PORT || 3000

dbInit()
  .then(() => app.listen(PORT, () => console.log(`listening on PORT ${PORT}`)))
  .catch(err => {
    console.log(
      'The following error has occured in connecting to or syncing with the database'
    )
    console.log(err)
  })
