import { Request, Response } from "express";
import * as accountService from "../services/account.services";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const account = await accountService.createAccount(req.body);
    res.status(201).json(account);
  } catch (error: any) {
    console.error("Erro ao criar conta:", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const accounts = await accountService.getAllAccount();
    res.status(200).json(accounts);
  } catch (error: any) {
    console.error("Erro ao buscar contas:", error.message);
    res.status(500).json({ error: "Erro interno ao buscar contas." });
  }
};
