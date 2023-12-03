import express, { Application } from 'express';
import cors from 'cors';

import userController from './users/users.controler';
import noteController from './notes/notes.controler';

import { User as UserModel } from './users/users.model';
import { Note as NoteModel } from './notes/notes.model';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/users', userController);
        this.app.use('/api/notes', noteController);
    }

    midlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await UserModel.sync();
            await NoteModel.sync();
            console.info('---------Ready to use---------');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;
