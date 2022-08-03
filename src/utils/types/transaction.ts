import { ICategory } from "../categories";

export interface Transaction {
  id: string;
  name: string;
  amount: string;
  type: "positive" | "negative";
  category: Omit<ICategory, "color">;
  date: Date;
}

export type TransactionDisplay = Omit<Transaction, "date"> & {
  date: string;
};
