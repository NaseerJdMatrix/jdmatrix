import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role');
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getUser = async (req, res) => {
  const user_id=req.params.id;
  try {
    const users = await User.findOne({_id:user_id}).populate('role');
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRecycleUsers = async (req, res) => {
  try {
    const users = await User.find({ deleteStatus: true }).populate([
      { path: "role", match: { deleteStatus: false } },
      { path: "department", match: { deleteStatus: false } },
    ]);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  const { password } = req.body;
  console.log(user);
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...user, password: hashPassword });
    await newUser.save();
    await newUser.populate("role");
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({error:true,msg:"No user with  that id"});
  
  let existingUserEmail = await User.findOne({
    email: user?.email,
    _id: { $ne: id },
  });
  
  if (existingUserEmail) {
    return res.status(404).send({error:true,msg:"Email already exist"});
  }


  let existingUserPhone = await User.findOne({
    phone_number: user?.phone_number,
    _id: { $ne: id },
  });
  
  if (existingUserPhone) {
    return res.status(404).send({error:true,msg:"Phone Number already exist"});
  }


  const updateUser = await User.findByIdAndUpdate(
    id, 
    user, 
    {
      new: true,
    }
  );
  res.status(200).json(updateUser);
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");
  await User.findByIdAndUpdate(
    id,
    { deleteStatus: true },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "User deleted successfully" });
};

export const deleteUsers = async (req, res) => {
  try {
    await User.updateMany(
      { deleteStatus: false },
      {
        $set: { deleteStatus: true },
      }
    );
    const users = await User.find({ deleteStatus: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const restoreUser = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");
  await User.findByIdAndUpdate(
    id,
    { deleteStatus: false },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "User restored successfully" });
};

export const restoreUsers = async (req, res) => {
  try {
    await User.updateMany(
      { deleteStatus: true },
      {
        $set: { deleteStatus: false },
      }
    );
    const users = await User.find({ deleteStatus: true });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const permanentDeleteUser = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");
  await User.findByIdAndRemove(id);
  res.status(200).json({ message: "User deleted successfully" });
};

export const permanentDeleteUsers = async (req, res) => {
  try {
    await User.deleteMany({
      deleteStatus: true,
    });
    const users = await User.find({ deleteStatus: true });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const changePassword= async (req, res)=>{  
 const {id,old_password,new_password}=req.body;
 try{
  
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");

  const existingUser = await User.findOne({ _id:id });

  if(!existingUser)
    return res.status(404).json({error:true,message:"No User Found"});
  

  const existingPassword = await bcrypt.compare(
    old_password,
    existingUser.password
  );

  if(!existingPassword)
  return res.status(400).json({error:true,message:"Incorrect Old Password"});
  
  const hashPassword= await bcrypt.hash(new_password,10);

  const updateUserPassword=await User.findByIdAndUpdate(id,{password: hashPassword},{new:true});
  
  return  res.status(200).json({error:true,message:"Password Changed Successfully"});
  
 }catch(error){
    return  res.status(500).send({
      error:true,
      message:error.message
    })
 }

}