import mongoose from "mongoose";
import StakeHolders from "../models/stakeholders.js";
import Designation from '../models/designation.js'

export const getStakeHolderss = async (req, res) => {
  try {
    const stakeholders = await StakeHolders.find({ deleteStatus: false });
    res.status(200).json(stakeholders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getStakeholdersWithOrganizationId = async (req, res) => {
  const organization_id=req.params.organization_id;
  try {
    const stakeholders = await StakeHolders.find({ organization: organization_id });
    res.status(200).json(stakeholders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRecycleStakeHolderss = async (req, res) => {
  try {
    const stakeholders = await StakeHolders.find({ deleteStatus: true });
    res.status(200).json(stakeholders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStakeHolders = async (req, res) => {
  const stakeholders = req.body;
  
  try {
    const existingStakeHolders = await StakeHolders.findOne({
      name: stakeholders?.name,
    });
    if (existingStakeHolders) {
        return res.status(500).send({error:true, message: "Name already exist" });
      
    }
    const newStakeHolders = new StakeHolders({ ...stakeholders });
    await newStakeHolders.save();
    res.status(200).json({error:false, message:"StakeHolders Added Successfully"});
  } catch (error) {
    res.status(404).json({error:true, message: error.message });
  }
};

export const updateStakeHolders = async (req, res) => {
  console.log("==============================")
  const id = req.params.id;
  const stakeholders = req.body;
  console.log(stakeholders)
  console.log("==============================")
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({error:true,message:"No stakeholders with that id"});
  try {
    const existingStakeHolders = await StakeHolders.findOne({
      name: stakeholders?.name,
      _id: { $ne: id },
    });
    if (existingStakeHolders) {
        return res.status(201).send({error:true, message: "Name already exist" });
    }
    const updateStakeHolders = await StakeHolders.findByIdAndUpdate(id, stakeholders, {
      new: true,
    });
    res.status(200).json({error:false, message:"StakeHolders Updated Successfully",stakeholders});
  } catch (error) {
    res.status(404).json({ error:true, message: error.message });
  }
};

export const deleteStakeHolders = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No stakeholders with that id");
  const deleteStakeHolders = await StakeHolders.findByIdAndUpdate(
    id,
    { deleteStatus: true },
    {
      new: true,
    }
  );
  res.status(200).json(deleteStakeHolders);
};

export const deleteStakeHolderss = async (req, res) => {
  try {
    await StakeHolders.updateMany(
      { deleteStatus: false },
      {
        $set: { deleteStatus: true },
      }
    );
    const stakeholders = await StakeHolders.find({ deleteStatus: false });
    res.status(200).json(stakeholders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const restoreStakeHolders = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No stakeholders with that id");
  await StakeHolders.findByIdAndUpdate(
    id,
    { deleteStatus: false },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "StakeHolders restored successfully" });
};

export const restoreStakeHolderss = async (req, res) => {
  try {
    await StakeHolders.updateMany(
      { deleteStatus: true },
      {
        $set: { deleteStatus: false },
      }
    );
    const stakeholders = await StakeHolders.find({ deleteStatus: true });
    res.status(200).json(stakeholders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const permanentDeleteStakeHolders = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No stakeholders with that id");
    const staffcount = await Designation.countDocuments({staff_type:id});
  if(staffcount){
    res.status(404).json({message:"Cannot delete staff because it is Assigned"});
  }else{
    await StakeHolders.findByIdAndRemove(id);
    res.status(200).json({error:false, message: "StakeHolders deleted successfully" });
  }
};

export const permanentDeleteStakeHolderss = async (req, res) => {
  try {
    await StakeHolders.deleteMany({
      deleteStatus: true,
    });
    const stakeholders = await StakeHolders.find({ deleteStatus: true });
    res.status(200).json(stakeholders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
