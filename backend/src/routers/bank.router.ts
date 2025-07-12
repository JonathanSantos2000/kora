import * as bankControler from "../controllers/bank.controllers";
import { Router } from "express";

const router: Router = Router();

router.post("/add-bank", bankControler.register);
router.get("/", bankControler.getAll);
export default router;
