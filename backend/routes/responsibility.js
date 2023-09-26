import express from "express";
import {
  getResponsibilitys,
  createResponsibility,
  updateResponsibility,
  deleteResponsibility,
  permanentDeleteResponsibility,
  permanentDeleteResponsibilitys,
  deleteResponsibilitys,
  restoreResponsibility,
  restoreResponsibilitys,
  getRecycleResponsibilitys,
  getResponsibilitiesWithOrganizationId
} from "../controllers/responsibility.js";

const router = express.Router();

router.get("/", getResponsibilitys);
router.get("/organization_responsibilities/:organization_id", getResponsibilitiesWithOrganizationId);
router.get("/recycle", getRecycleResponsibilitys);
router.post("/", createResponsibility);
router.patch("/:id", updateResponsibility);
router.delete("/:id", permanentDeleteResponsibility);
router.get("/permanentDeleteAll", permanentDeleteResponsibilitys);
router.delete("/delete/:id", deleteResponsibility);
router.get("/deleteAll", deleteResponsibilitys);
router.delete("/restore/:id", restoreResponsibility);
router.get("/restoreAll", restoreResponsibilitys);
export default router;
