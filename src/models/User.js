import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    username: {
        type: String,
        require: [true, "Username is required."]
    },
    email: {
        type: String,
        unique: [true, "Email already exists."],
        require: [true, "Email is required."]
    },
    password: {
        type: String
    },
    image: {
        type: String
    }
})

export default models.User || new model("User", UserSchema)