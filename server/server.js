import express from "express";
import mtg from 'mtgsdk';

const app = express();
const port = 3000;

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/api/getCards', async (req, res, next) => {
  const { name } = req.query;
  try {
    const cardNames = await mtg.card.where({ name });
    // console.log(cardNames)
    return res.json(cardNames);
  } catch (error) {
    console.error(error);
    return next(error)
  }
});

app.post('/api/card', async (req, res, next) => {
  console.log('hit')
  console.log(req.body)
  res.send('test')
})

app.use((err, req, res, next) => {
  const error = {
    message: 'unknown error occured',
    err: err
  };
  res.status(500).send({error, ...err});
});

// listen
app.listen(port, () => {
  console.log(`Example app listening at PORT ${port}`);
});
