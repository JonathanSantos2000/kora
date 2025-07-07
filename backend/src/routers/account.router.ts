import * as accountControler from "../controllers/account.controllers";
import { Router } from "express";

const router: Router = Router();

router.post("/add-account", accountControler.register);
router.get("/", accountControler.getAll);

export default router;
