import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String},
    password: {type: String, required: true}
});

const User = mongoose.model('User', UserSchema);