import express from "express";
import {
  getStakeHolderss,
  createStakeHolders,
  updateStakeHolders,
  deleteStakeHolders,
  permanentDeleteStakeHolders,
  permanentDeleteStakeHolderss,
  deleteStakeHolderss,
  restoreStakeHolders,
  restoreStakeHolderss,
  getRecycleStakeHolderss,
  getStakeholdersWithOrganizationId
} from "../controllers/stakeholders.js";

const router = express.Router();

router.get("/", getStakeHolderss);
router.get("/organization_responsibilities/:organization_id", getStakeholdersWithOrganizationId);
router.get("/recycle", getRecycleStakeHolderss);
router.post("/", createStakeHolders);
router.patch("/:id", updateStakeHolders);
router.delete("/:id", permanentDeleteStakeHolders);
router.get("/permanentDeleteAll", permanentDeleteStakeHolderss);
router.delete("/delete/:id", deleteStakeHolders);
router.get("/deleteAll", deleteStakeHolderss);
router.delete("/restore/:id", restoreStakeHolders);
router.get("/restoreAll", restoreStakeHolderss);
export default router;
