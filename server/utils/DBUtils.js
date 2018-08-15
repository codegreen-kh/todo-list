import mongoose from 'mongoose';
import '../models/user';
import '../models/task';
let ObjectId = require('mongodb').ObjectID;

import { db } from '../../etc/config.json';

export function setUpConnection() {
    mongoose.connect('mongodb://' + db.host + '/' + db.name);
}

const User = mongoose.model('User');
const Task = mongoose.model('Task');

export function listUsers(userId){
    return User.find({_id: userId});
}

export function createUser (data) {
    let user = new User({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password
    });

    return user.save();
}

export function updateTask(data) {

    let task = new Task({
        _id: data.id,
        userId: data.userId,
        name: data.name,
        done: data.done,
        order: data.order
    });

    let res = Task.findOne ({_id: task._id})
        .then((doc)=>{
            if (doc) {
                doc.userId = data.userId;
                doc.name = data.name;
                doc.done = data.done;
                doc.order = data.order;
                return doc.save();
            } else {
                return task.save();
            }
        });

    return res;

};

export function deleteTask(id) {

    if(mongoose.Types.ObjectId.isValid(id)) {
        Task.findOneAndRemove({_id: id})
            .then((docs)=>{
                if(docs) {
                    console.log({"success": true, data: docs});
                } else {
                    console.log({"success": false, data: "no such task exist"});
                }
            }).catch((err)=>{
            console.log(err);
        })
    } else {
        console.log({"success": false, data: "please provide correct Id"});
    }

};

export async function findTaskById(taskId) {
    let query = Task.findOne({_id: ObjectId(taskId)});
    let res = await query.exec();
    return res;
}

export async function findUserByEmail(email) {
  let query = User.findOne({email: email});
  let res = await query.exec();
  return res;
}

export async function findUserById(userId) {
    let query = User.findOne({_id : ObjectId(userId)});
    let res = await query.exec();
    return res;
}

export function listTasks(userId) {
    return Task.find({userId: userId}).sort({order: 1});
}