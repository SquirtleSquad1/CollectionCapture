const express = require("express")
const mtg = require('mtgsdk')
const app = express()
const port = 3000;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

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

app.post('/api/cards', async (req, res) => {
  console.log(req.body)
  const { name, imageUrl } = req.body;



  // const newCard = await prisma.card.create({
  //   data: {
  //     name,
  //     imageUrl,
  //   }
  // })
  // try {
  //   const newUserCard = await prisma.
  // } catch (e) {
  //   console.log(e)
  // }
  // res.status(201).json(newCard);
})
app.listen(port, () => {
  console.log(`Example app listening at PORT ${port}`)
})
