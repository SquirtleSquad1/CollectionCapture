import express from "express";
import session from 'express-session';
import mtg from 'mtgsdk';
import dbController from "./controller/dbController.js";
import sessionController from './controller/sessionController.js';
const app = express();
const port = 3000;

// use `prisma` in your application to read and write data in your DB

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// trust first proxy
app.set('trust proxy', 1) 
// express sesssion dbController
app.use(session({
  // todo move secret to env when working
  secret: 'secret',
  cookie: {
    secure: true
  },
  resave: false,
  saveUninitialized: true
}));

// verify sessions
app.use(sessionController.verifySession)

app.get('/api/getSession', (req, res) => {
  // console.log('Session', req.session)
  return res.json(req.session);  
})
app.get('/api/getCards', async (req, res) => {
  console.log(`Endpoint /api/getCards query: ${JSON.stringify(req.query)}`);
  console.log(`Endpoint /api/getCards query: ${JSON.stringify(req.body)}`);
  console.log(`Endpoint /api/getCards query: ${JSON.stringify(req.params)}`);
  const { name } = req.query;
  try {
    const { name } = req.body;
    const cardNames = await mtg.card.where({ name });
    return res.json(cardNames);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

app.post('/api/signupUser', dbController.signupUser, (req, res) => {
  return res.status(200).json(res.locals.userId)
})
app.post('/api/loginUser', dbController.loginUser, sessionController.createSession, (req, res) => {
  if(res.locals.status === 200) {
    // save to session
    req.session.userId = res.locals.userId;
  }
  return res.status(200).json(res.locals.userId)
})

app.post('/api/getCards', dbController.postCard, (req, res) => {

  return res.status(200).json('card created/updated');
})

app.get('/api/test', (req, res) => {
  return res.json({
    message: 'test working'
  })
})

app.use((req, res) => {
  return res.status(404).json({message: 'page not found'})
});

app.use((err, req, res, next) => {
  const error = {
    message: 'unknown error occured',
    err: err
  };
  const errObj = Object.assign(error, err);
  res.status(500).json(errObj);
});

// listen
app.listen(port, () => {
  console.log(`Example app listening at PORT ${port}`);
});
