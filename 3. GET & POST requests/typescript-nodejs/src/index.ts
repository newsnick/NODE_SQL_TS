import express from 'express'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.send({
    data: req.body,
  })
})

app.listen(3000, () => {
  console.log('The application is listening on port 3000!')
})
