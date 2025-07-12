import Account, { IAccounts } from "../models/accounts.model";

interface IAccountInput {
  AccUsuId: string;
  AccNom: string;
  AccTip: string;
  AccBanId: string;
  AccSalIni: number;
  AccMoe: number;
}

export const createAccount = async ({
  AccUsuId,
  AccNom,
  AccTip,
  AccBanId,
  AccSalIni,
  AccMoe,
}: IAccountInput): Promise<IAccounts> => {
  const existingAccount = await Account.findOne({ AccNom, AccUsuId });
  if (existingAccount) throw new Error("Conta já cadastrada");

  const account = new Account({
    AccUsuId,
    AccNom,
    AccTip,
    AccBanId,
    AccSalIni,
    AccSalAtu: AccSalIni,
    AccMoe,
    AccDatCri: new Date(),
  });

  return await account.save();
};

export const getAllAccount = async (): Promise<IAccounts[]> => {
  return await Account.find().sort({ name: 1 });
};

export const deleteAccountById = async (id: string): Promise<boolean> => {
  const result = await Account.deleteOne({ _id: id });
  return result.deletedCount > 0;
};


