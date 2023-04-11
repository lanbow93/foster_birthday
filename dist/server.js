"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("dotenv").config();
const app = express();
// Routes
app.get('/', (request, response) => {
    response.send("Server is running");
});
const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});
