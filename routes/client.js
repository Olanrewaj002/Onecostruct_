import express from "express";
import { getAllClients, registerClient } from "../controllers/clientController.js";

const router = express.Router();

router.post("/register", registerClient);
router.get("/clients", getAllClients);

export default router;
