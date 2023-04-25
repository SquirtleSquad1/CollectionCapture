const express = require("express")
const mtg = require('mtgsdk')
const app = express()

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// app.get('/cards', )