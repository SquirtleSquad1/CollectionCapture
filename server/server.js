const express = require("express")
const mtg = require('mtgsdk')
const app = express()
const port = 3000;

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/api/cards', (req, res) => {
    mtg.card.where(req.body)
      .then(results => {
        res.status(200).send(results)
      })
})

app.use((err, req, res, next) => {
  const error = {
    message: 'unknown error occured',
    err: err
  };
  res.status(500).send({error, ...err});
});


app.listen(port, () => {
    console.log(`Example app listening at PORT ${port}`)
})
