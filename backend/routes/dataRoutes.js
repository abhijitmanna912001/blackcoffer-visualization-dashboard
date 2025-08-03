import express from "express";
import {
  getAllData,
  getUniqueFieldValues,
} from "../controllers/dataController.js";

const router = express.Router();

router.get("/", getAllData);
router.get("/fields/:field", getUniqueFieldValues);

export default router;
