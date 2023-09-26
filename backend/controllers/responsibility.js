import mongoose from "mongoose";
import Responsibility from "../models/responsibility.js";
import Designation from '../models/designation.js'

export const getResponsibilitys = async (req, res) => {
  try {
    const responsibility = await Responsibility.find({ deleteStatus: false }).populate(['organization']);
    res.status(200).json(responsibility);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getResponsibilitiesWithOrganizationId = async (req, res) => {
  const organization_id=req.params.organization_id;
  try {
    const responsibility = await Responsibility.find({ organization: organization_id }).populate(['organization']);
    res.status(200).json(responsibility);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRecycleResponsibilitys = async (req, res) => {
  try {
    const responsibility = await Responsibility.find({ deleteStatus: true });
    res.status(200).json(responsibility);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createResponsibility = async (req, res) => {
  const responsibility = req.body;
  
  try {
    const existingResponsibility = await Responsibility.findOne({
      name: responsibility?.name,
    });
    if (existingResponsibility) {
      if (!existingResponsibility?.deleteStatus) {
        return res.status(201).send({error:true, message: "Name already exist" });
      } else {
        const updateResponsibility = await Responsibility.findByIdAndUpdate(
          existingResponsibility?._id,
          { deleteStatus: false },
          {
            new: true,
          }
        );
        return res.status(200).json({error:false, message:"Responsibility Updated Successfully"});
      }
    }
    const newResponsibility = new Responsibility({ ...responsibility });
    await newResponsibility.save();
    res.status(200).json({error:false, message:"Responsibility Added Successfully"});
  } catch (error) {
    res.status(404).json({error:true, message: error.message });
  }
};

export const updateResponsibility = async (req, res) => {
  const id = req.params.id;
  const responsibility = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({error:true,message:"No responsibility with that id"});
  try {
    const existingResponsibility = await Responsibility.findOne({
      name: responsibility?.name,
      _id: { $ne: id },
    });
    if (existingResponsibility) {
      if (!existingResponsibility?.deleteStatus) {
        return res.status(201).send({error:true, message: "Name already exist" });
      } else {
        await Responsibility.findByIdAndRemove(existingResponsibility?._id);
      }
    }
    const updateResponsibility = await Responsibility.findByIdAndUpdate(id, responsibility, {
      new: true,
    });
    res.status(200).json({error:false, message:"Responsibility Updated Successfully"});
  } catch (error) {
    res.status(404).json({ error:true, message: error.message });
  }
};

export const deleteResponsibility = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No responsibility with that id");
  const deleteResponsibility = await Responsibility.findByIdAndUpdate(
    id,
    { deleteStatus: true },
    {
      new: true,
    }
  );
  res.status(200).json(deleteResponsibility);
};

export const deleteResponsibilitys = async (req, res) => {
  try {
    await Responsibility.updateMany(
      { deleteStatus: false },
      {
        $set: { deleteStatus: true },
      }
    );
    const responsibility = await Responsibility.find({ deleteStatus: false });
    res.status(200).json(responsibility);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const restoreResponsibility = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No responsibility with that id");
  await Responsibility.findByIdAndUpdate(
    id,
    { deleteStatus: false },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "Responsibility restored successfully" });
};

export const restoreResponsibilitys = async (req, res) => {
  try {
    await Responsibility.updateMany(
      { deleteStatus: true },
      {
        $set: { deleteStatus: false },
      }
    );
    const responsibility = await Responsibility.find({ deleteStatus: true });
    res.status(200).json(responsibility);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const permanentDeleteResponsibility = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No responsibility with that id");
    const staffcount = await Designation.countDocuments({staff_type:id});
  if(staffcount){
    res.status(404).json({message:"Cannot delete staff because it is Assigned"});
  }else{
    await Responsibility.findByIdAndRemove(id);
    res.status(200).json({error:false, message: "Responsibility deleted successfully" });
  }
};

export const permanentDeleteResponsibilitys = async (req, res) => {
  try {
    await Responsibility.deleteMany({
      deleteStatus: true,
    });
    const responsibility = await Responsibility.find({ deleteStatus: true });
    res.status(200).json(responsibility);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
