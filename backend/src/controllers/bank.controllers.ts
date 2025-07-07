import { Request, Response } from "express";
import * as bankService from "../services/bank.services";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const bank = await bankService.createBank(req.body);
    res.status(201).json(bank);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
