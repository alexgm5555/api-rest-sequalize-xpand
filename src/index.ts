import express from 'express';
// import {connetBD} from './database';
import { config } from 'dotenv';
import Server from './server';
config()

const server = new Server();
