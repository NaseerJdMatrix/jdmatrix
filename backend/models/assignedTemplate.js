//Mongoose provides a straight-forward, schema-based solution to model your application data.
import mongoose from "mongoose";

//Everything in Mongoose starts with a Schema.
//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const AssignedTemplateSchema = mongoose.Schema({
  assignTo: { type: String , required:true },
  organization_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref:'Organization',
    required:true 
  },
  department_id: { 
    type: mongoose.Schema.Types.ObjectId ,
    ref:'Department', 
    default:null
  },
  employee_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:'Employee',
    default:null 
  },
  template:{type: Object,required:true},
  deleteStatus: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});
//pass AssignedTemplateSchema into mongoose.model(modelName, schema)
export default mongoose.model("AssignedTemplate", AssignedTemplateSchema);





