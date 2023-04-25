const express = require("express")
const mtg = require('mtgsdk')
const app = express()
const port = 3000;

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// app.get('/cards', )
app.listen(port, () => {
    console.log(`Example app listening at PORT ${port}`)
})
