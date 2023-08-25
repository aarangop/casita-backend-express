import mongoose, {Document, Schema} from "mongoose"
import {IUser} from "./user.model";


export interface IHousehold extends Document {
  name: string;
  members: IUser[];
  address: string;
  postalCode?: string;
  city: string;
  country: string;
  current: boolean;
}

const householdSchema = new Schema({
  name: String,
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  address: {type: String, required: true},
  postalCode: {type: String, required: false},
  city: {type: String, required: true},
  country: {type: String, required: true},
  current: {type: Boolean, default: true}
})

const HouseholdModel = mongoose.model<IHousehold>("HouseholdModel", householdSchema)
export default HouseholdModel