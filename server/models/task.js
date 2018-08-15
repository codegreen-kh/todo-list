import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    done: {type: Boolean, required: true},
    order: {type: Number, required: true}
});

const Task = mongoose.model('Task', TaskSchema);