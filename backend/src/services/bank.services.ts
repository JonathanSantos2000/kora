import Bank, { IBank } from "../models/bank.model";

interface IBankInput {
  BanNom: string;
  BanSta: number;
  BanIco: string;
}

export const createBank = async ({
  BanNom,
  BanSta,
  BanIco,
}: IBankInput): Promise<IBank> => {
  const existingBank = await Bank.findOne({ BanNom });
  if (existingBank) throw new Error("Banco já cadastrada");

  const banco = new Bank({
    BanNom,
    BanSta,
    BanIco,
  });
  
  return await banco.save();
};
