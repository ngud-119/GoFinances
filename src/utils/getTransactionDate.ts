import { TransactionDisplay } from "./types/transaction";

export function getLastTransactionDate(
  transactions: TransactionDisplay[],
  type: TransactionDisplay["type"]
) {
  const transactionFilteredByType = transactions.filter(
    (transaction) => transaction.type === type
  );

  if (!transactionFilteredByType.length) return undefined;

  return new Date(
    Math.max(
      ...transactionFilteredByType.map((transaction) => {
        const [day, month, year] = transaction.date.split("/");
        return new Date(`${month}/${day}/${year}`).getTime();
      })
    )
  ).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
}
