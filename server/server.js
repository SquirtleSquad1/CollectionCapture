import express from "express";
import session from 'express-session';
import mtg from 'mtgsdk';
import middleware from "./controller/dbController.js";
import sessionController from './controller/sessionController.js';
const app = express();
const port = 3000;

// use `prisma` in your application to read and write data in your DB

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
app.use(sessionController.verifySession)
app.get('/api/getSession', (req, res) => {
  // console.log('Session', req.session)
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
app.post('/api/signupUser', middleware.signupUser, (req, res) => {
  return res.status(200).json(res.locals.userId)
})
app.post('/api/loginUser', middleware.loginUser, sessionController.createSession, (req, res) => {
  if(res.locals.status === 200) {
    // save to session
    req.session.userId = res.locals.userId;
  }
  return res.status(200).json(res.locals.userId)
})

app.post('/api/getCards', middleware.postCard, (req, res) => {

  return res.status(200).json('card created/updated');
})

app.use((req, res) => {
  return res.status(404).json({message: 'page not found'})
});

app.use((err, req, res) => {
  const error = {
    message: 'unknown error occured',
    err: err
  };
  res.status(500).json({ error, ...err });
});

// listen
app.listen(port, () => {
  console.log(`Example app listening at PORT ${port}`);
});
