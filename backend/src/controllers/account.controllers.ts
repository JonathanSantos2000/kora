import { Request, Response } from "express";
import * as accountService from "../services/account.services";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Dados recebidos:", req.body);
    const account = await accountService.createAccount(req.body);
    res.status(201).json(account);
  } catch (error: any) {
    console.error("Erro ao criar conta:", error.message);
    res.status(400).json({ error: error.message });
  }
};
