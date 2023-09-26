import express from "express";
import {
    AssignTemplate,
    GetAssignedTemplateDetail,
    GetAssignedTemplates
 
} from "../controllers/assignTemplate.js";

const router = express.Router();


router.post("/", AssignTemplate);
router.get("/", GetAssignedTemplates);
router.get("/:id", GetAssignedTemplateDetail);


export default router;
