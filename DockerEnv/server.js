require("dotenv").config();

const express = require("express");
const cors = require("cors");
let { HOST, PORT, ENVIROMENT } = process.env;

const app = express();

const environment=process.env.APPLICATION ENV ==='local'?'local.env':'.env';
require('dotenv').config({path:enviroment});