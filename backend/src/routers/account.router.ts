import * as accountControler from "../controllers/account.controllers";
import { Router } from "express";

const router: Router = Router();

router.post("/add-account", accountControler.register);

export default router;
