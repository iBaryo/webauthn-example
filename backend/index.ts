import {LoginResponse, RegisterResponse, User} from "../common/interfaces";
import * as usersDB from './usersDB';

const express= require('express');
const app = express();
app.use(require('body-parser').json());

app.get('/test', (req, res) => res.send('working!'));

app.post('/register', (req, res) => {
    const {id, password} = req.body as User;
    let ok = false;
    if (!usersDB.doesExist(id)) {
        usersDB.setUser({id, password});
        ok = true;
    }

    res.send({ok} as RegisterResponse);
});

app.post('/login', (req, res) => {
    const {id, password} = req.body as User;
    let ok = false;

    if (usersDB.doesExist(id) && usersDB.checkPassword(id, password)) {
        ok = true;
    }

    res.send({ok} as LoginResponse);
});

app.use('/', express.static('../frontend/dist'));

app.listen(3000, () => console.log('listening...'));