import assignTemplate from '../models/assignedTemplate.js'
import Employee from '../models/employee.js'
import Template from '../models/template.js'
import Responsibility from "../models/responsibility.js";


export const GetAssignedTemplates=async (req,res)=>{
   
  try{
    const assignedTemplates=await assignTemplate.find({}).populate(['employee_id','organization_id','department_id']).sort({ _id: -1 });
    res.status(200).json({error:false,data:assignedTemplates});
  }catch(err){
    res.status(500).json({
      error:true,
      msg:err.message
    });
  }
   
};

export const GetAssignedTemplateDetail = async (req, res) => {
  const id = req.params.id;

  try {
    const assignedTemplate = await assignTemplate.findOne({ _id: id })
      .populate([
        "employee_id",
        "organization_id",
        "department_id",
        {
          path: "template.functions.assignTo",
          model: "Employee",
          select: "_id employee_id name designation" // Change this to the actual model name for assignTo
        },
        {
          path: "template.functions.responsibility",
          model: "Responsibility" // Change this to the actual model name for responsibility
        }
      ]);

    res.status(200).json({ error: false, data: assignedTemplate });
  } catch (err) {
    res.status(500).json({
      error: true,
      msg: err.message
    });
  }
};


export const AssignTemplate = async (req, res) => {
  const TemplateToAssign = req.body;
  
  try {
    // console.log(TemplateToAssign.assignTo)
    
    const templateId = TemplateToAssign.template.template._id;
    const functions = TemplateToAssign.template.functions;
    
    // Find the template based on the templateId
    const template = await Template.findOne({ _id: templateId });
    if (!template) {
      return res.status(404).json({
        error: true,
        msg: "Template not found",
      });
    }
    console.log(TemplateToAssign)
    const addAssignTemplate=new assignTemplate(TemplateToAssign);
    await addAssignTemplate.save();

    if(TemplateToAssign.assignTo==='Employee'){
      // Find the employee based on empId
      const empId= TemplateToAssign.employee_id;
      const employee = await Employee.findOne({ _id: empId });
      if (employee) {
        const templateExists = employee.templates.find(
          (temp) => temp.template._id.toString() === templateId.toString()
        );
        
        if (!templateExists) {
          // If not assigned, add the function to the employee's templates
          employee.templates.push({
            template: template,
            functions: functions,
          });
        } else {
          // If assigned, add the function to the existing template
          const existingTemplate = employee.templates.find(
            (temp) => temp.template._id.toString() === templateId.toString()
          );
          existingTemplate.functions.push(functions);
          employee.markModified('templates');
          
        }
        
        // Save the employee's updated templates
        await employee.save();
      }else{
        res.status(400).json({
          error: true,
          message: "Employee Not found",
        });
      }
     

    }else{

      // Loop through the functions and assign them to employees
      for (const func of functions) {
        const empId = func.assignTo;
        
        // Find the employee based on empId
        const employee = await Employee.findOne({ _id: empId });
  
        if (employee) {
          // Check if the template is already assigned to the employee
          const templateExists = employee.templates.find(
            (temp) => temp.template._id.toString() === templateId.toString()
          );
          
          if (!templateExists) {
            // If not assigned, add the function to the employee's templates
            employee.templates.push({
              template: template,
              functions: [func],
            });
          } else {
            // If assigned, add the function to the existing template
            const existingTemplate = employee.templates.find(
              (temp) => temp.template._id.toString() === templateId.toString()
            );
            existingTemplate.functions.push(func);
            employee.markModified('templates');
            
          }
          
          // Save the employee's updated templates
          await employee.save();

        }
      }
    }

    res.send({ error: false,message:"Tempate Assigned Successfylly", data: req.body });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};


