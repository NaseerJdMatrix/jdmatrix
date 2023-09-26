//Mongoose provides a straight-forward, schema-based solution to model your application data.
import mongoose from "mongoose";

//Everything in Mongoose starts with a Schema.
//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const StakeholderSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    shortname: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    },
   
  });

//To use our schema definition, we need to convert our staffTypeSchema into a Model we can work with.
//To do so, we pass it into mongoose.model(modelName, schema)
export default mongoose.model("StakeHolder", StakeholderSchema);
