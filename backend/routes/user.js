import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  permanentDeleteUser,
  permanentDeleteUsers,
  deleteUsers,
  restoreUser,
  restoreUsers,
  getRecycleUsers,
  getUser,
  changePassword
} from "../controllers/user.js";
import { email } from "../middleware/email.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/recycle", getRecycleUsers);
router.post("/", email, createUser);
router.patch("/:id", updateUser);
router.post("/changePassword", changePassword);
router.delete("/:id", permanentDeleteUser);
router.get("/permanentDeleteAll", permanentDeleteUsers);
router.delete("/delete/:id", deleteUser);
router.get("/deleteAll", deleteUsers);
router.delete("/restore/:id", restoreUser);
router.get("/restoreAll", restoreUsers);

export default router;
