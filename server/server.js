import express from "express";
import session from 'express-session';
import mtg from 'mtgsdk';

const app = express();
const port = 3000;

// parse json request body
app.use(express.json());
// trust first proxy
app.set('trust proxy', 1) 
//express sesssion middleware
app.use(session({
  // todo move secret to env when working
  secret: 'secret',
  cookie: {
    secure: true
  },
  resave: false,
  saveUninitialized: true
}));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/api/getSession', (req, res) => {
  return res.json(req.session);  
})

app.get('/api/getCards', async (req, res) => {
  try {
    const { name } = req.body;
    const cardNames = await mtg.card.where({ name });
    return res.json(cardNames);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

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
