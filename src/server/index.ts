import initializeServer from './initializeServer'

const app = initializeServer()
app.listen(5001, () => console.log(`Listening on port ${5001}`)) // eslint-disable-line
