import * as db from '../utils/DBUtils';
let ObjectId = require('mongodb').ObjectID;

export class TaskModel {
    constructor (id, userId, name, done, order) {
        this.id = id ? ObjectId(id) : ObjectId();
        this.userId = userId;
        this.name = name ? name.trim() : null;
        this.done = done && done.toString() === 'true';
        this.order = order ? order : 0;
    };

    async validate() {
        let errors = [];

        if (!this.name || !this.name.trim()) {
            errors.push('Task title is empty.');
        };

        if (!this.userId || !this.userId.trim()) {
            errors.push('User ID is empty.');
        } else {
            try {
                let x = new ObjectId(this.userId);

                if (!db.findUserById(this.userId)) {
                    errors.push('User is not found.');
                };

            } catch (e) {
                errors.push('User ID is invalid.');
            };
        };

        async function isUserExists (userId) {
            let doc = await db.findUserById(userId);
            console.log(doc);
            return doc != null;
        };

        return errors;
    };

    async save() {
        let res = await db.updateTask(this);
        this.id = res._id;
    };

    delete() {
        db.deleteTask(this.id);
    };
};