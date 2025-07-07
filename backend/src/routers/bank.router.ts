import * as bankControler from "../controllers/bank.controllers";
import { Router } from "express";

const router: Router = Router();

router.post("/add-bank", bankControler.register);

export default router;
