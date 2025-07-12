import { Request, Response } from "express";
import * as bankService from "../services/bank.services";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const bank = await bankService.createBank(req.body);
    res.status(201).json(bank);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const accounts = await bankService.getAllBanks();
    res.status(200).json(accounts);
  } catch (error: any) {
    console.error("Erro ao buscar contas:", error.message);
    res.status(500).json({ error: "Erro interno ao buscar contas." });
  }
};
