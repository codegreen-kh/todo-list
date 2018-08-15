import express from 'express';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';
import {UserModel} from './bl/user-model.js';
import {TaskModel} from './bl/task-model.js';

import * as db from './utils/DBUtils.js';

db.setUpConnection();

const app = express();

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/users', (req, res) => {

    let userId = req.query.userId;

    if (userId) {
        db.listUsers(userId).then( data => res.send(data) );
    } else {
        res.status(400);
        res.send('Invalid user ID');
    };

});

app.get('/tasks', (req, res) => {

    let userId = req.query.userId;

    if (userId) {
        db.listTasks(userId).then( (data) => {
            let tasks = data.map((item, i)=>{
                return new TaskModel(item._id, item.userId, item.name, item.done, item.order);
            });

            res.send(tasks);
        });
    } else {
        res.status(400);
        res.send('Invalid user ID');
    };

});

app.post('/users', async (req, res) => {
    let body = req.body;
    let user = new UserModel('', body.firstName, body.lastName, body.email, body.password);
    let errors = await user.validate();
    let result;

    if (errors.length === 0){
        user.save();
        result = {
            isValid: true,
            messages: []
        };
    } else {
        result = {
            isValid: false,
            messages: errors
        };
    }
    res.send(result);
});

app.post('/users/login', async (req, res) => {
    let body = req.body;
    let user = await UserModel.findUser(body.email);

    let result = {
        isValid: user != null,
        isAllowed: user ? user.password === body.password : false,
        userId: user ? user.id : null,
        messages: []
    };

    res.send(result);

});

app.post('/tasks', async (req, res) => {
    let body = req.body;
    let task = new TaskModel(body.id, body.userId, body.name, body.done, body.order);
    let errors = await task.validate();
    let result;

    if (errors.length === 0) {
        await task.save();
        result = {
            isValid: true,
            messages: [],
            task: task
        };
    } else {
        result = {
            isValid: false,
            messages: errors,
            task: null
        };
    };
    res.send(result);
});

app.delete('/tasks', async (req, res) => {
    let body = req.body;
    let task = new TaskModel(body.id);
    let result;

    task.delete();

    result = {
        isValid: true,
        messages: [],
        taskId: task.id
    };

    res.send(result);

});

const server = app.listen(serverPort, () => {
    console.log('Server is up and running on port ' + serverPort);
});