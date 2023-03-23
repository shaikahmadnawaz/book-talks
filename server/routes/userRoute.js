import express from "express";
const router = express.Router();

import { login } from "../controllers/userController";

router.post("/login", login);
