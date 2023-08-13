import mongoose from "mongoose"
import {IUser} from "./user.model";

const Schema = mongoose.Schema;

interface IHousehold {
    name: string;
    members: IUser[];
}

const HouseholdSchema = new Schema({
    name: String,
    members: [{type: Schema.Types.ObjectId, ref: 'User'}]
})