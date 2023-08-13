import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    avatar?: string;
}

const userSchema = new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: false, default: "user"},
    avatar: String
})

const User = mongoose.model<IUser>("User", userSchema)
export default User;