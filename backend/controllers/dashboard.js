import Department from "../models/department.js";
import Employee from "../models/employee.js";
import Organization from "../models/organization.js";
import Template from "../models/template.js";

async function getEmployeeCountByMonth() {
    const pipeline = [
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ];
  
    const results = await Employee.aggregate(pipeline);
  
    // Create an array for all months with initial counts set to 0
    const monthCounts = Array(12).fill(0);
  
    // Update the counts based on the aggregation results
    results.forEach((result) => {
      const monthIndex = result._id.month - 1; // MongoDB months are 1-based
      monthCounts[monthIndex] = result.count;
    });
  
    // Define month names
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
  
    // Prepare the final output object
    const output = {
      month: monthNames,
      values: monthCounts,
    };
  
    return output;
}
async function getOrganizationCountByMonth() {
    const pipeline = [
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ];
  
    const results = await Organization.aggregate(pipeline);
  
    // Create an array for all months with initial counts set to 0
    const monthCounts = Array(12).fill(0);
  
    // Update the counts based on the aggregation results
    results.forEach((result) => {
      const monthIndex = result._id.month - 1; // MongoDB months are 1-based
      monthCounts[monthIndex] = result.count;
    });
  
    // Define month names
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
  
    // Prepare the final output object
    const output = {
      month: monthNames,
      values: monthCounts,
    };
  
    return output;
}  
async function getDepartmentCountByMonth() {
  const pipeline = [
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 },
    },
  ];

  const results = await Department.aggregate(pipeline);

  // Create an array for all months with initial counts set to 0
  const monthCounts = Array(12).fill(0);

  // Update the counts based on the aggregation results
  results.forEach((result) => {
    const monthIndex = result._id.month - 1; // MongoDB months are 1-based
    monthCounts[monthIndex] = result.count;
  });

  // Define month names
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  // Prepare the final output object
  const output = {
    month: monthNames,
    values: monthCounts,
  };

  return output;
}  
async function getTemplateCountByMonth() {
    const pipeline = [
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ];
  
    const results = await Template.aggregate(pipeline);
  
    // Create an array for all months with initial counts set to 0
    const monthCounts = Array(12).fill(0);
  
    // Update the counts based on the aggregation results
    results.forEach((result) => {
      const monthIndex = result._id.month - 1; // MongoDB months are 1-based
      monthCounts[monthIndex] = result.count;
    });
  
    // Define month names
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
  
    // Prepare the final output object
    const output = {
      month: monthNames,
      values: monthCounts,
    };
  
    return output;
}  



export const getDashboardData= async (req,res)=>{
    
    try{
        const organization= await Organization.find().count();
        const department= await Department.find().count();
        const employee= await Employee.find().count();
        const template= await Template.find().count();

        const currentYear = new Date().getFullYear(); 

     

        const employeeByMonth= await getEmployeeCountByMonth();
        const organizationByMonth= await getOrganizationCountByMonth();
        const templatesByMonth= await getTemplateCountByMonth();
        const departmentsByMonth= await getDepartmentCountByMonth();
        
          
        

        return res.status(200).json({error:false,organization,department,employee,template,organizationByMonth,departmentsByMonth,employeeByMonth,templatesByMonth});

    }catch(error){
        return res.status(500).json({
            error:true,
            message:error.message
        })
    }
}