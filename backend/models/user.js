//Mongoose provides a straight-forward, schema-based solution to model your application data.
import mongoose from "mongoose";

//Everything in Mongoose starts with a Schema.
//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone_number: { type: String, unique:true, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  street: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  zip: { type: String, default: '' },
  country: { type: String, default: '' },
  resetToken: { type: String },
  deleteStatus: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});

//To use our schema definition, we need to convert our userSchema into a Model we can work with.
//To do so, we pass it into mongoose.model(modelName, schema)

export default mongoose.model("User", userSchema);
